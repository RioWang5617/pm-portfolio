import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.lib.minimax import embed_texts


@pytest.mark.asyncio
async def test_embed_texts_returns_vectors():
    """embed_texts 应该返回每个 text 对应的 embedding vector"""
    fake_response = {
        "data": [
            {"index": 0, "embedding": [0.1, 0.2, 0.3]},
            {"index": 1, "embedding": [0.4, 0.5, 0.6]},
        ]
    }

    with patch("backend.lib.minimax.httpx.AsyncClient") as MockClient:
        mock_instance = AsyncMock()
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json = MagicMock(return_value=fake_response)
        mock_response.raise_for_status = MagicMock()
        mock_instance.post = AsyncMock(return_value=mock_response)
        mock_instance.__aenter__ = AsyncMock(return_value=mock_instance)
        mock_instance.__aexit__ = AsyncMock(return_value=None)
        MockClient.return_value = mock_instance

        result = await embed_texts(["hello", "world"])

    assert len(result) == 2
    assert result[0] == [0.1, 0.2, 0.3]
    assert result[1] == [0.4, 0.5, 0.6]
