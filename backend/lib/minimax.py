import json
import httpx
import logging
from typing import Optional, AsyncIterator
from backend.config import settings

logger = logging.getLogger(__name__)


async def _post(path: str, json: dict, timeout: float = 30.0) -> dict:
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}{path}"
    async with httpx.AsyncClient(timeout=timeout) as client:
        resp = await client.post(url, json=json, headers=headers)
        resp.raise_for_status()
        return resp.json()


async def embed_texts(
    texts: list[str],
    model: Optional[str] = None,
    input_type: str = "query",
) -> list[list[float]]:
    """MiniMax embedding API

    API: POST {minimax_api_base}/embeddings
    请求: { model: str, texts: str[], type: "query" | "db" }
    返回: { vectors: [[float]] }
    维度: 1536 (embo-01)

    ⚠️ 重要: type=query 和 type=db 是不通的 embedding 空间
    - 存文档用 type=db
    - 用户 query 用 type=query
    """
    model = model or settings.minimax_embed_model
    data = await _post(
        "/embeddings",
        {"model": model, "texts": texts, "type": input_type},
    )
    return data["vectors"]


async def _stream_chat(
    api_base: str,
    api_key: str,
    model: str,
    messages: list[dict],
    timeout: float = 60.0,
) -> AsyncIterator[dict]:
    """通用的流式聊天请求"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    url = f"{api_base}/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=timeout) as client:
        async with client.stream("POST", url, json=payload, headers=headers) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                payload_str = line[6:]
                if payload_str == "[DONE]":
                    yield {"type": "done"}
                    return
                try:
                    chunk = json.loads(payload_str)
                except json.JSONDecodeError:
                    continue
                delta = chunk["choices"][0].get("delta", {})
                content = delta.get("content")
                if content:
                    yield {"type": "token", "content": content}


async def chat_stream(messages: list[dict], model: Optional[str] = None) -> AsyncIterator[dict]:
    """MiniMax chat stream（OpenAI 兼容格式）

    API: POST {minimax_api_base}/chat/completions
    请求: { model, messages, stream: true }
    返回: SSE events (OpenAI 兼容格式)

    当 MiniMax 不可用时自动切换到 fallback 模型
    """
    model = model or settings.minimax_chat_model

    # 尝试 MiniMax
    try:
        logger.info(f"尝试 MiniMax 模型: {model}")
        async for event in _stream_chat(
            api_base=settings.minimax_api_base,
            api_key=settings.minimax_api_key,
            model=model,
            messages=messages,
        ):
            yield event
        return  # 成功完成
    except Exception as e:
        logger.warning(f"MiniMax 模型失败: {e}")

    # MiniMax 失败，尝试 fallback 模型
    if settings.fallback_api_key:
        try:
            logger.info(f"切换到 fallback 模型: {settings.fallback_chat_model}")
            yield {"type": "token", "content": "\n\n> _模型切换中..._\n\n"}
            async for event in _stream_chat(
                api_base=settings.fallback_api_base,
                api_key=settings.fallback_api_key,
                model=settings.fallback_chat_model,
                messages=messages,
            ):
                yield event
            return
        except Exception as e:
            logger.error(f"Fallback 模型也失败: {e}")

    # 所有模型都失败
    yield {"type": "token", "content": "抱歉，AI 服务暂时不可用，请稍后再试。"}
    yield {"type": "done"}
