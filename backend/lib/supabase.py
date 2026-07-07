"""Supabase REST API 客户端（macOS 老 SSL 兼容）

完全绕开 supabase-py，直接用 httpx 调 REST API。
支持 .rpc() 和 .table() 调用。
"""
import os
from functools import lru_cache
from typing import Any, Optional
import certifi
import httpx

from backend.config import settings


def _build_client() -> httpx.Client:
    """用 certifi 构建 httpx client（macOS 自带 Python 3.9 + LibreSSL 不兼容 Supabase 的 Cloudflare SSL）"""
    return httpx.Client(
        verify=certifi.where(),
        timeout=httpx.Timeout(30.0, connect=10.0),
        http2=False,
        headers={
            "apikey": settings.supabase_key,
            "Authorization": f"Bearer {settings.supabase_key}",
        },
    )


class _RpcBuilder:
    """client.rpc('func_name', params).execute()"""
    def __init__(self, parent: "SupabaseClient", func: str, params: dict):
        self._parent = parent
        self._func = func
        self._params = params

    def execute(self):
        url = f"{self._parent._rest_base}/rpc/{self._func}"
        r = self._parent._http.post(url, json=self._params)
        r.raise_for_status()
        data = r.json() if r.text else []
        return _Result(data)


class _TableQueryBuilder:
    """client.table('name').select(...).eq(...).execute() / .insert(...).execute() / .delete().execute()"""
    def __init__(self, parent: "SupabaseClient", table: str):
        self._parent = parent
        self._table = table
        self._method = "GET"
        self._params: dict = {}
        self._filters: list[str] = []
        self._body: Any = None
        self._prefer: str = "return=representation"

    def select(self, columns: str = "*"):
        self._method = "GET"
        self._params["select"] = columns
        return self

    def insert(self, rows: list[dict]):
        self._method = "POST"
        self._body = rows
        return self

    def delete(self):
        self._method = "DELETE"
        return self

    def eq(self, column: str, value: Any):
        self._filters.append(f"{column}=eq.{value}")
        return self

    def neq(self, column: str, value: Any):
        self._filters.append(f"{column}=neq.{value}")
        return self

    def limit(self, n: int):
        self._filters.append(f"limit={n}")
        return self

    def _build_url(self) -> str:
        url = f"{self._parent._rest_base}/{self._table}"
        qs_parts = []
        if self._params:
            qs_parts.append("&".join(f"{k}={v}" for k, v in self._params.items()))
        if self._filters:
            qs_parts.append("&".join(self._filters))
        if qs_parts:
            url += "?" + "&".join(qs_parts)
        return url

    def execute(self):
        url = self._build_url()
        headers = {"Prefer": self._prefer}
        if self._method == "GET":
            r = self._parent._http.get(url, headers=headers)
        elif self._method == "POST":
            r = self._parent._http.post(url, json=self._body, headers=headers)
        elif self._method == "DELETE":
            r = self._parent._http.delete(url, headers=headers)
        else:
            raise ValueError(f"Unknown method {self._method}")
        r.raise_for_status()
        try:
            data = r.json() if r.text else []
        except Exception:
            data = []
        return _Result(data, content_range=r.headers.get("content-range"))


class _Result:
    def __init__(self, data, content_range: Optional[str] = None):
        self.data = data
        # 从 content-range '0-N/M' 解析 count
        if content_range and "/" in content_range:
            try:
                self.count = int(content_range.split("/")[1])
            except (ValueError, IndexError):
                self.count = None
        else:
            self.count = len(data) if isinstance(data, list) else None


class SupabaseClient:
    """轻量 Supabase REST client（替代 supabase-py）"""
    def __init__(self, url: str, key: str):
        self._url = url.rstrip("/")
        self._rest_base = f"{self._url}/rest/v1"
        self._http = _build_client()

    def table(self, name: str) -> _TableQueryBuilder:
        return _TableQueryBuilder(self, name)

    def rpc(self, func: str, params: dict) -> _RpcBuilder:
        return _RpcBuilder(self, func, params)


@lru_cache(maxsize=1)
def get_client() -> SupabaseClient:
    """返回单例 Supabase 客户端（macOS 老 SSL 兼容）"""
    return SupabaseClient(settings.supabase_url, settings.supabase_key)
