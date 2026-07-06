from fastapi.testclient import TestClient
from unittest.mock import patch
from backend.main import app


def test_health_returns_ok():
    client = TestClient(app)
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"


def test_health_includes_model_info():
    with patch("backend.main.settings") as mock_settings:
        mock_settings.minimax_chat_model = "MiniMax-M3"
        mock_settings.minimax_embed_model = "emb-01"
        client = TestClient(app)
        resp = client.get("/api/health")
    data = resp.json()
    assert data["chat_model"] == "MiniMax-M3"
    assert data["embed_model"] == "emb-01"
