import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.rag.retriever import search_relevant_chunks


@pytest.mark.asyncio
async def test_search_returns_top_k_chunks():
    fake_embedding = [0.1] * 1024
    fake_response = [
        {"content": "匹配内容1", "metadata": {"source": "works/test", "title": "测试"}, "similarity": 0.9},
        {"content": "匹配内容2", "metadata": {"source": "demo/test", "title": "Demo"}, "similarity": 0.8},
    ]

    with patch("backend.rag.retriever.embed_texts", new=AsyncMock(return_value=[fake_embedding])):
        with patch("backend.rag.retriever.get_client") as MockGetClient:
            mock_rpc = MagicMock()
            mock_rpc.execute.return_value.data = fake_response
            mock_client = MagicMock()
            mock_client.rpc.return_value = mock_rpc
            MockGetClient.return_value = mock_client

            results = await search_relevant_chunks("测试问题", top_k=5, threshold=0.65)

    assert len(results) == 2
    assert results[0]["content"] == "匹配内容1"


@pytest.mark.asyncio
async def test_search_returns_empty_when_no_data():
    with patch("backend.rag.retriever.embed_texts", new=AsyncMock(return_value=[[0.1] * 1024])):
        with patch("backend.rag.retriever.get_client") as MockGetClient:
            mock_rpc = MagicMock()
            mock_rpc.execute.return_value.data = []
            mock_client = MagicMock()
            mock_client.rpc.return_value = mock_rpc
            MockGetClient.return_value = mock_client

            results = await search_relevant_chunks("q", top_k=5, threshold=0.65)
    assert results == []


@pytest.mark.asyncio
async def test_search_passes_params_to_rpc():
    with patch("backend.rag.retriever.embed_texts", new=AsyncMock(return_value=[[0.1, 0.2, 0.3]])):
        with patch("backend.rag.retriever.get_client") as MockGetClient:
            mock_rpc = MagicMock()
            mock_rpc.execute.return_value.data = []
            mock_client = MagicMock()
            mock_client.rpc.return_value = mock_rpc
            MockGetClient.return_value = mock_client

            await search_relevant_chunks("q", top_k=3, threshold=0.5)

    mock_client.rpc.assert_called_once()
    # rpc() 是 positional 调用: client.rpc(name, params)
    name = mock_client.rpc.call_args.args[0]
    params = mock_client.rpc.call_args.args[1]
    assert name == "match_documents"
    assert params["query_embedding"] == [0.1, 0.2, 0.3]
    assert params["match_threshold"] == 0.5
    assert params["match_count"] == 3
