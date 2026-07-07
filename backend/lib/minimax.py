import json
import httpx
from typing import Optional, AsyncIterator
from backend.config import settings


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


async def embed_texts(texts: list[str], model: Optional[str] = None) -> list[list[float]]:
    """MiniMax embedding API

    API: POST {minimax_api_base}/embeddings
    请求: { model: str, texts: str[], type: "query" }
    返回: { vectors: [[float]] }
    维度: 1536 (embo-01)
    """
    model = model or settings.minimax_embed_model
    data = await _post(
        "/embeddings",
        {"model": model, "texts": texts, "type": "query"},
    )
    return data["vectors"]


async def chat_stream(messages: list[dict], model: Optional[str] = None) -> AsyncIterator[dict]:
    """MiniMax chat stream（OpenAI 兼容格式）

    API: POST {minimax_api_base}/chat/completions
    请求: { model, messages, stream: true }
    返回: SSE events (OpenAI 兼容格式)
    """
    model = model or settings.minimax_chat_model
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}/chat/completions"
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
