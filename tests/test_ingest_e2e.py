import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.rag.ingest import ingest_documents


@pytest.mark.asyncio
async def test_ingest_documents_writes_to_supabase():
    docs = [
        {"content": "测试内容1", "metadata": {"source": "x"}},
        {"content": "测试内容2", "metadata": {"source": "y"}},
    ]
    fake_embeddings = [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]

    with patch("backend.rag.ingest.embed_texts", new=AsyncMock(return_value=fake_embeddings)):
        with patch("backend.rag.ingest.get_client") as MockGetClient:
            mock_table = MagicMock()
            mock_table.delete.return_value.neq.return_value.execute.return_value = None
            mock_table.insert.return_value.execute.return_value = None
            mock_client = MagicMock()
            mock_client.table.return_value = mock_table
            MockGetClient.return_value = mock_client

            count = await ingest_documents(docs)

    assert count == 2
    mock_table.insert.assert_called_once()
    inserted = mock_table.insert.call_args[0][0]
    assert len(inserted) == 2
    assert inserted[0]["embedding"] == [0.1, 0.2, 0.3]
    assert inserted[0]["content"] == "测试内容1"
    assert inserted[0]["metadata"] == {"source": "x"}


@pytest.mark.asyncio
async def test_ingest_empty_docs_returns_zero():
    with patch("backend.rag.ingest.embed_texts", new=AsyncMock()):
        with patch("backend.rag.ingest.get_client"):
            count = await ingest_documents([])
    assert count == 0


@pytest.mark.asyncio
async def test_ingest_chunks_long_documents():
    """长文档应该被切块后写入"""
    long_text = "段落1内容。\n\n段落2内容。\n\n段落3内容。" * 30
    docs = [{"content": long_text, "metadata": {"source": "long"}}]

    with patch("backend.rag.ingest.embed_texts", new=AsyncMock(return_value=[[0.1] * 3, [0.2] * 3, [0.3] * 3])) as mock_embed:
        with patch("backend.rag.ingest.get_client") as MockGetClient:
            mock_table = MagicMock()
            mock_table.delete.return_value.neq.return_value.execute.return_value = None
            mock_table.insert.return_value.execute.return_value = None
            mock_client = MagicMock()
            mock_client.table.return_value = mock_table
            MockGetClient.return_value = mock_client

            count = await ingest_documents(docs)

    assert count >= 2  # 至少被切了多块
    mock_embed.assert_called_once()  # embed 应该被调一次
    # 传入的文本数应该等于 chunks 数
    call_args = mock_embed.call_args[0][0]
    assert len(call_args) == count
    # 写入的行数应该等于 chunks 数
    inserted = mock_table.insert.call_args[0][0]
    assert len(inserted) == count
