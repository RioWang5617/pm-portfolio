"""测试轻量 SupabaseClient 包装类"""
from backend.lib.supabase import get_client, SupabaseClient


def test_get_client_returns_supabase_instance():
    """get_client 应该返回 SupabaseClient 实例"""
    client = get_client()
    assert isinstance(client, SupabaseClient)


def test_get_client_is_cached():
    """get_client 应该被缓存（同一实例）"""
    c1 = get_client()
    c2 = get_client()
    assert c1 is c2


def test_supabase_client_has_table_and_rpc():
    """SupabaseClient 应有 table() 和 rpc() 方法"""
    c = get_client()
    assert hasattr(c, "table")
    assert hasattr(c, "rpc")
