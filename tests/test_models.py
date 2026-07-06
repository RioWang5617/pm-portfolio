from backend.models import ChatRequest, ChatMessage, SourceChunk


def test_chat_message_user():
    msg = ChatMessage(role="user", content="hi")
    assert msg.role == "user"
    assert msg.content == "hi"


def test_chat_message_validates_role():
    from pydantic import ValidationError
    import pytest

    with pytest.raises(ValidationError):
        ChatMessage(role="invalid", content="x")


def test_chat_request_default():
    req = ChatRequest(message="hello")
    assert req.message == "hello"
    assert req.history == []


def test_chat_request_with_history():
    req = ChatRequest(
        message="再来一个",
        history=[
            ChatMessage(role="user", content="第一个问题"),
            ChatMessage(role="assistant", content="第一个回答"),
        ],
    )
    assert len(req.history) == 2
    assert req.history[1].role == "assistant"


def test_source_chunk():
    s = SourceChunk(
        content="x", source="works/test", title="测试", similarity=0.9
    )
    assert s.similarity == 0.9
