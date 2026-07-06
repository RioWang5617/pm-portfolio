from unittest.mock import patch, MagicMock
from supabase import Client


def test_get_client_returns_supabase_instance():
    """get_client 应该返回 Supabase 客户端实例"""
    fake_client = MagicMock(spec=Client)
    with patch("backend.lib.supabase.create_client", return_value=fake_client) as mock_create:
        # Mock settings at the call site
        with patch("backend.lib.supabase.settings") as mock_settings:
            mock_settings.supabase_url = "https://test.supabase.co"
            mock_settings.supabase_key = "fake-jwt.token.sig"
            from backend.lib import supabase as supabase_mod
            supabase_mod.get_client.cache_clear()
            try:
                client = supabase_mod.get_client()
                assert isinstance(client, Client)
                args, _ = mock_create.call_args
                assert args[0] == "https://test.supabase.co"
            finally:
                supabase_mod.get_client.cache_clear()


def test_get_client_is_cached():
    """get_client 应该被缓存（同一实例）"""
    fake_client = MagicMock(spec=Client)
    with patch("backend.lib.supabase.create_client", return_value=fake_client):
        with patch("backend.lib.supabase.settings") as mock_settings:
            mock_settings.supabase_url = "https://test.supabase.co"
            mock_settings.supabase_key = "fake-jwt.token.sig"
            from backend.lib import supabase as supabase_mod
            supabase_mod.get_client.cache_clear()
            try:
                c1 = supabase_mod.get_client()
                c2 = supabase_mod.get_client()
                assert c1 is c2
            finally:
                supabase_mod.get_client.cache_clear()
