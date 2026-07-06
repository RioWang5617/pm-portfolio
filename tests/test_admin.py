import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
from backend.main import app


@pytest.mark.asyncio
async def test_reindex_requires_token():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.post("/api/admin/reindex")
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_reindex_with_wrong_token():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.post(
            "/api/admin/reindex",
            headers={"X-Admin-Token": "wrong"},
        )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_reindex_with_valid_token():
    with patch("backend.api.admin.run_reindex", new=AsyncMock(return_value=42)):
        with patch("backend.api.admin.settings") as mock_settings:
            mock_settings.admin_token = "secret123"
            async with AsyncClient(app=app, base_url="http://test") as ac:
                resp = await ac.post(
                    "/api/admin/reindex",
                    headers={"X-Admin-Token": "secret123"},
                )
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"
    assert body["chunks_written"] == 42
