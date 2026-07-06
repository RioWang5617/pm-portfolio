def test_app_exists():
    from backend.main import app
    assert app is not None


def test_app_is_fastapi():
    from backend.main import app
    from fastapi import FastAPI
    assert isinstance(app, FastAPI)


def test_health_endpoint():
    """用 TestClient 调 /api/health"""
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
