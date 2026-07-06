import json
import httpx
from typing import Optional, AsyncIterator
from backend.config import settings


async def _post(path: str, json: dict, timeout: float = 30.0) -> dict:
    """统一的 MiniMax HTTP POST 调用（OpenAI 兼容）"""
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}{path}"
    async with httpx.AsyncClient(timeout=timeout) as client:
        resp = await client.post(url, json=json, headers=headers)
        resp.raise_for_status()
        return resp.json()


async def embed_texts(texts: list[str], model: Optional[str] = None) -> list[list[float]]:
    """批量 embedding，返回与输入对应的 vector 列表

    注：实际 MiniMax API 路径与请求体字段需查官方文档核对。
    这里假设是 OpenAI 兼容的 /v1/embeddings 端点。
    """
    model = model or settings.minimax_embed_model
    data = await _post(
        "/v1/embeddings",
        {"model": model, "input": texts},
    )
    # OpenAI 兼容格式：data 数组按 index 对应输入
    sorted_items = sorted(data["data"], key=lambda x: x["index"])
    return [item["embedding"] for item in sorted_items]


async def chat_stream(messages: list[dict], model: Optional[str] = None) -> AsyncIterator[dict]:
    """流式 chat，返回 SSE event 字典的 async generator

    yield 格式：{"type": "token", "content": "..."} 或 {"type": "done"}
    """
    model = model or settings.minimax_chat_model
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}/v1/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
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
