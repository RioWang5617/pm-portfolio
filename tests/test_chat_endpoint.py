import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
from backend.main import app


@pytest.mark.asyncio
async def test_chat_endpoint_streams_response():
    """POST /api/chat 应该返回 SSE 流式响应"""
    fake_chunks = [
        {"content": "相关1", "title": "T1", "source": "s1", "similarity": 0.9},
    ]

    async def fake_stream(messages):
        yield {"type": "sources", "sources": fake_chunks}
        yield {"type": "token", "content": "你好"}
        yield {"type": "token", "content": "，我是 AI 替身"}
        yield {"type": "done"}

    with patch("backend.api.chat.search_relevant_chunks", new=AsyncMock(return_value=fake_chunks)):
        with patch("backend.api.chat.chat_stream", fake_stream):
            async with AsyncClient(app=app, base_url="http://test") as ac:
                resp = await ac.post(
                    "/api/chat",
                    json={"message": "你好", "history": []},
                )

    assert resp.status_code == 200
    assert "text/event-stream" in resp.headers["content-type"]
    text = resp.text
    assert "data:" in text
    assert "sources" in text
    assert "你好" in text
    assert "我是 AI 替身" in text


@pytest.mark.asyncio
async def test_chat_endpoint_includes_history():
    """历史消息应该被传给 chat_stream"""
    fake_chunks = []

    async def fake_stream(messages):
        # 验证 messages 包含历史 + 当前
        assert any(m["role"] == "user" and m["content"] == "之前问题" for m in messages)
        assert any(m["role"] == "assistant" and m["content"] == "之前回答" for m in messages)
        assert any(m["role"] == "user" and m["content"] == "新问题" for m in messages)
        yield {"type": "done"}

    with patch("backend.api.chat.search_relevant_chunks", new=AsyncMock(return_value=fake_chunks)):
        with patch("backend.api.chat.chat_stream", fake_stream):
            async with AsyncClient(app=app, base_url="http://test") as ac:
                resp = await ac.post(
                    "/api/chat",
                    json={
                        "message": "新问题",
                        "history": [
                            {"role": "user", "content": "之前问题"},
                            {"role": "assistant", "content": "之前回答"},
                        ],
                    },
                )

    assert resp.status_code == 200


@pytest.mark.asyncio
async def test_chat_endpoint_limits_history_to_12():
    """历史应被截断到最近 12 条 (6 轮)"""
    fake_chunks = []

    captured = {}

    async def fake_stream(messages):
        # 数 user 消息
        captured["user_count"] = sum(1 for m in messages if m["role"] == "user")
        captured["assistant_count"] = sum(1 for m in messages if m["role"] == "assistant")
        yield {"type": "done"}

    with patch("backend.api.chat.search_relevant_chunks", new=AsyncMock(return_value=fake_chunks)):
        with patch("backend.api.chat.chat_stream", fake_stream):
            async with AsyncClient(app=app, base_url="http://test") as ac:
                # 20 条历史 + 当前 1 条
                history = []
                for i in range(20):
                    history.append({"role": "user", "content": f"q{i}"})
                    history.append({"role": "assistant", "content": f"a{i}"})
                await ac.post(
                    "/api/chat",
                    json={"message": "current", "history": history},
                )

    # 历史应该被截到 12 条 = 6 轮
    assert captured["user_count"] <= 7  # 6 轮历史 + 1 当前
    assert captured["assistant_count"] <= 6
