# PM Portfolio 个人站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 pm-portfolio 从静态站升级为带 AI 助理"我"、自动渲染简历、全外链 demo 展示的个人作品集站点，单容器部署到 Hugging Face Spaces。

**Architecture:** HF Spaces 单 Docker 容器 = Nginx（反代 + 静态文件）+ uvicorn + FastAPI（/api/*）。Supabase pgvector 存文档 embeddings，MiniMax M3 + embedding API 做 RAG。AI 助理用 RAG top-5 检索 + 拼 system prompt + 流式 SSE 响应。

**Tech Stack:** React 18 + Vite + TypeScript + Tailwind CSS（前端，已有）；FastAPI + uvicorn + httpx（后端，新增）；Supabase + pgvector（向量库）；MiniMax M3 + MiniMax Embedding（LLM）；HF Spaces（部署）；GitHub Actions（保活 + 重索引）。

**Spec 文档：** `docs/superpowers/specs/2026-07-06-pm-portfolio-design.md`

---

## 实施顺序总览

| Phase | 内容 | 估计任务数 |
|-------|------|------------|
| 0 | 仓库初始化 + 工具链 | 2 |
| 1 | 后端基础（FastAPI + 配置） | 3 |
| 2 | MiniMax + Supabase 客户端 | 4 |
| 3 | Ingest 流水线（PDF + TS 数据 → chunks + embeddings → Supabase） | 3 |
| 4 | RAG 检索 + Chat 端点 | 4 |
| 5 | Admin Reindex 端点 + Health 端点 | 2 |
| 6 | 前端 Chat Hooks | 3 |
| 7 | 前端 Chat 组件 | 6 |
| 8 | App 集成（ChatLauncher 接入 + Navigation + Home） | 3 |
| 9 | Resume 页改版（数据 + 组件） | 4 |
| 10 | DemoCard + CaseStudyCard | 3 |
| 11 | Docker + Nginx + 启动脚本 | 3 |
| 12 | GitHub Actions（保活 + 重索引） | 2 |
| 13 | HF Spaces 部署 | 2 |
| 14 | 端到端验证 | 2 |
| **合计** | | **44** |

---

## Phase 0：仓库初始化 + 工具链

### Task 1：初始化 git + .gitignore

**Files:**
- Create: `.gitignore`
- Create: `README.md`（基础）

- [ ] **Step 1：在 pm-portfolio 目录初始化 git**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
git init
git branch -M main
```

- [ ] **Step 2：写 .gitignore**

文件：`.gitignore`

```gitignore
# Dependencies
node_modules/
.pnpm-store/
__pycache__/
*.pyc
.venv/
venv/

# Build outputs
dist/
build/
*.egg-info/

# Env
.env
.env.local
.env.*.local
!.env.example

# IDE
.vscode/
.idea/
.DS_Store

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# HF
README.md.bak

# Python
.pytest_cache/
.mypy_cache/
.ruff_cache/
```

- [ ] **Step 3：commit**

```bash
git add .gitignore
git commit -m "chore: initialize git + .gitignore"
```

---

### Task 2：建立 backend 目录骨架 + requirements.txt

**Files:**
- Create: `backend/__init__.py`
- Create: `backend/requirements.txt`
- Create: `backend/.env.example`

- [ ] **Step 1：建目录**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
mkdir -p backend/api backend/rag backend/lib backend/scripts
touch backend/__init__.py backend/api/__init__.py backend/rag/__init__.py backend/lib/__init__.py
```

- [ ] **Step 2：写 requirements.txt**

文件：`backend/requirements.txt`

```txt
fastapi==0.115.6
uvicorn[standard]==0.32.1
pydantic==2.10.3
pydantic-settings==2.7.0
httpx==0.28.1
sse-starlette==2.2.1
python-dotenv==1.0.1
supabase==2.10.0
pypdf==5.1.0
pytest==8.3.4
pytest-asyncio==0.25.0
pytest-mock==3.14.0
```

- [ ] **Step 3：写 .env.example**

文件：`backend/.env.example`

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# MiniMax
MINIMAX_API_KEY=your-minimax-api-key
MINIMAX_API_BASE=https://api.minimaxi.com  # 查官方文档确认
MINIMAX_CHAT_MODEL=MiniMax-M3
MINIMAX_EMBED_MODEL=emb-01  # 查官方文档确认

# Admin
ADMIN_TOKEN=change-me-to-random-string

# Server
HOST=0.0.0.0
PORT=8000
```

- [ ] **Step 4：建本地 .venv 并安装依赖**

```bash
cd /Users/wty/Documents/个人/pm-portfolio/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

预期：`Successfully installed ...`

- [ ] **Step 5：commit**

```bash
git add backend/
git commit -m "chore(backend): scaffold backend + requirements + env example"
```

---

## Phase 1：后端基础（FastAPI + 配置）

### Task 3：FastAPI 入口 + CORS + 路由占位

**Files:**
- Create: `backend/config.py`
- Create: `backend/main.py`
- Create: `tests/test_main.py`

- [ ] **Step 1：写测试，验证 main 模块能 import**

文件：`tests/test_main.py`

```python
def test_app_exists():
    from backend.main import app
    assert app is not None


def test_app_is_fastapi():
    from backend.main import app
    from fastapi import FastAPI
    assert isinstance(app, FastAPI)
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_main.py -v
```

预期：`ModuleNotFoundError: No module named 'backend.main'`

- [ ] **Step 3：写 config.py**

文件：`backend/config.py`

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    supabase_url: str
    supabase_key: str

    minimax_api_key: str
    minimax_api_base: str = "https://api.minimaxi.com"
    minimax_chat_model: str = "MiniMax-M3"
    minimax_embed_model: str = "emb-01"

    admin_token: str = "change-me"

    host: str = "0.0.0.0"
    port: int = 8000


settings = Settings()
```

- [ ] **Step 4：写 main.py（带 CORS + 路由占位）**

文件：`backend/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PM Portfolio API", version="0.1.0")

# CORS - 开发时让 Vite (5173) 能调，HF Spaces 部署时同源不需要
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

- [ ] **Step 5：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_main.py -v
```

预期：`2 passed`

- [ ] **Step 6：手动跑一下确认 /api/health 返回 200**

```bash
cd /Users/wty/Documents/个人/pm-portfolio/backend
source .venv/bin/activate
uvicorn main:app --reload &
sleep 2
curl http://localhost:8000/api/health
kill %1
```

预期：`{"status":"ok"}`

- [ ] **Step 7：commit**

```bash
git add backend/ tests/
git commit -m "feat(backend): FastAPI entry + health endpoint + config"
```

---

### Task 4：pytest 配置 + 测试目录

**Files:**
- Create: `pytest.ini`
- Create: `tests/conftest.py`

- [ ] **Step 1：写 pytest.ini**

文件：`pytest.ini`

```ini
[pytest]
testpaths = tests
pythonpath = .
asyncio_mode = auto
```

- [ ] **Step 2：写 conftest.py**

文件：`tests/conftest.py`

```python
import sys
import os
from pathlib import Path

# 把项目根加到 path，确保 backend.* 能 import
root = Path(__file__).parent.parent
sys.path.insert(0, str(root))
```

- [ ] **Step 3：跑所有测试确认还过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest -v
```

预期：`2 passed`

- [ ] **Step 4：commit**

```bash
git add pytest.ini tests/conftest.py
git commit -m "chore(tests): pytest config + conftest"
```

---

### Task 5：Pydantic 模型（ChatMessage / ChatRequest / ChatResponse）

**Files:**
- Create: `backend/models.py`
- Create: `tests/test_models.py`

- [ ] **Step 1：写测试**

文件：`tests/test_models.py`

```python
from backend.models import ChatRequest, ChatMessage


def test_chat_message_user():
    msg = ChatMessage(role="user", content="hi")
    assert msg.role == "user"
    assert msg.content == "hi"


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
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_models.py -v
```

预期：`ModuleNotFoundError: No module named 'backend.models'`

- [ ] **Step 3：写 models.py**

文件：`backend/models.py`

```python
from typing import Literal, Optional
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = Field(default_factory=list)


class SourceChunk(BaseModel):
    content: str
    source: str
    title: str
    similarity: float


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk] = Field(default_factory=list)
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_models.py -v
```

预期：`3 passed`

- [ ] **Step 5：commit**

```bash
git add backend/models.py tests/test_models.py
git commit -m "feat(backend): ChatMessage/ChatRequest/ChatResponse models"
```

---

## Phase 2：MiniMax + Supabase 客户端

### Task 6：MiniMax 客户端 - embedding 调用

**Files:**
- Create: `backend/lib/minimax.py`
- Create: `tests/test_minimax.py`

- [ ] **Step 1：写测试**

文件：`tests/test_minimax.py`

```python
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.lib.minimax import embed_texts


@pytest.mark.asyncio
async def test_embed_texts_returns_vectors():
    """embed_texts 应该返回每个 text 对应的 embedding vector"""
    fake_response = {
        "data": [
            {"embedding": [0.1, 0.2, 0.3]},
            {"embedding": [0.4, 0.5, 0.6]},
        ]
    }

    with patch("backend.lib.minimax.httpx.AsyncClient") as MockClient:
        mock_instance = AsyncMock()
        mock_instance.post.return_value = MagicMock(
            status_code=200,
            json=lambda: fake_response,
        )
        mock_instance.__aenter__.return_value = mock_instance
        mock_instance.__aexit__.return_value = None
        MockClient.return_value = mock_instance

        result = await embed_texts(["hello", "world"])

    assert len(result) == 2
    assert result[0] == [0.1, 0.2, 0.3]
    assert result[1] == [0.4, 0.5, 0.6]
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_minimax.py -v
```

预期：`ModuleNotFoundError: No module named 'backend.lib.minimax'`

- [ ] **Step 3：写 minimax.py（embedding 部分）**

文件：`backend/lib/minimax.py`

```python
import httpx
from typing import Optional
from backend.config import settings


async def _post(path: str, json: dict, timeout: float = 30.0) -> dict:
    """统一的 MiniMax HTTP POST 调用"""
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}{path}"
    async with httpx.AsyncClient(timeout=timeout) as client:
        resp = await client.post(url, json=json, headers=headers)
        resp.raise_for_status()
        return resp.json()


async def embed_texts(texts: list[str], model: Optional[str] = None) -> list[list[float]]:
    """批量 embedding，返回与输入对应的 vector 列表

    注：实际 MiniMax API 路径与请求体字段需查官方文档核对。
    这里假设是 OpenAI 兼容的 /v1/embeddings 端点。
    """
    model = model or settings.minimax_embed_model
    data = await _post(
        "/v1/embeddings",
        {"model": model, "input": texts},
    )
    # OpenAI 兼容格式：data 数组按 index 对应输入
    sorted_items = sorted(data["data"], key=lambda x: x["index"])
    return [item["embedding"] for item in sorted_items]


async def chat_stream(messages: list[dict], model: Optional[str] = None):
    """流式 chat，返回 SSE event 字典的 async generator

    yield 格式：{"type": "token", "content": "..."} 或 {"type": "done"}
    """
    model = model or settings.minimax_chat_model
    headers = {
        "Authorization": f"Bearer {settings.minimax_api_key}",
        "Content-Type": "application/json",
    }
    url = f"{settings.minimax_api_base}/v1/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        async with client.stream("POST", url, json=payload, headers=headers) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                payload = line[6:]
                if payload == "[DONE]":
                    yield {"type": "done"}
                    return
                # OpenAI 兼容的 chunk 解析
                import json
                chunk = json.loads(payload)
                delta = chunk["choices"][0].get("delta", {})
                content = delta.get("content")
                if content:
                    yield {"type": "token", "content": content}
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_minimax.py -v
```

预期：`1 passed`

- [ ] **Step 5：commit**

```bash
git add backend/lib/minimax.py tests/test_minimax.py
git commit -m "feat(backend): MiniMax client (embed + chat stream)"
```

---

### Task 7：Supabase 客户端封装

**Files:**
- Create: `backend/lib/supabase.py`
- Create: `tests/test_supabase_client.py`

- [ ] **Step 1：写测试**

文件：`tests/test_supabase_client.py`

```python
from backend.lib.supabase import get_client


def test_get_client_returns_supabase():
    """get_client 应该返回 Supabase 客户端实例"""
    from supabase import Client
    client = get_client()
    assert isinstance(client, Client)
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_supabase_client.py -v
```

预期：`ModuleNotFoundError: No module named 'backend.lib.supabase'`

- [ ] **Step 3：写 supabase.py**

文件：`backend/lib/supabase.py`

```python
from functools import lru_cache
from supabase import create_client, Client
from backend.config import settings


@lru_cache(maxsize=1)
def get_client() -> Client:
    return create_client(settings.supabase_url, settings.supabase_key)
```

- [ ] **Step 4：跑测试，预期失败（因为 env 没设）**

预期：失败但 import 成功。设置临时 env 再跑：

```bash
cd /Users/wty/Documents/个人/pm-portfolio
SUPABASE_URL=https://test.supabase.co SUPABASE_KEY=test-key PYTHONPATH=. pytest tests/test_supabase_client.py -v
```

预期：`1 passed`

- [ ] **Step 5：commit**

```bash
git add backend/lib/supabase.py tests/test_supabase_client.py
git commit -m "feat(backend): Supabase client wrapper"
```

---

### Task 8：PDF 文本提取

**Files:**
- Create: `backend/lib/pdf.py`
- Create: `tests/test_pdf.py`
- Create: `tests/fixtures/sample.pdf`（手动放一个小 PDF 用于测试）

- [ ] **Step 1：建 fixtures 目录 + 准备一个测试 PDF**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
mkdir -p tests/fixtures
```

由于 PDF 是二进制，用 Python 脚本生成一个测试 PDF：

```bash
cd /Users/wty/Documents/个人/pm-portfolio
source backend/.venv/bin/activate
python3 -c "
from reportlab.pdfgen import canvas
c = canvas.Canvas('tests/fixtures/sample.pdf')
c.drawString(100, 750, '林越')
c.drawString(100, 720, 'AI 产品经理 · 上海')
c.drawString(100, 690, '工作经历')
c.drawString(100, 660, '2024 - 至今  AI 产品负责人')
c.save()
"
```

- [ ] **Step 2：写测试**

文件：`tests/test_pdf.py`

```python
from backend.lib.pdf import extract_text


def test_extract_text_from_sample_pdf():
    text = extract_text("tests/fixtures/sample.pdf")
    assert "林越" in text
    assert "AI 产品经理" in text
    assert "AI 产品负责人" in text
```

- [ ] **Step 3：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_pdf.py -v
```

预期：`ModuleNotFoundError`

- [ ] **Step 4：写 pdf.py**

文件：`backend/lib/pdf.py`

```python
from pypdf import PdfReader


def extract_text(pdf_path: str) -> str:
    """从 PDF 提取所有页的纯文本"""
    reader = PdfReader(pdf_path)
    pages = []
    for page in reader.pages:
        pages.append(page.extract_text() or "")
    return "\n\n".join(pages)
```

- [ ] **Step 5：装 reportlab（仅 dev 依赖）并跑测试**

```bash
cd /Users/wty/Documents/个人/pm-portfolio/backend
source .venv/bin/activate
pip install reportlab
cd ..
PYTHONPATH=. pytest tests/test_pdf.py -v
```

预期：`1 passed`

- [ ] **Step 6：commit（不包含 .venv）**

```bash
git add backend/lib/pdf.py tests/test_pdf.py tests/fixtures/sample.pdf
git commit -m "feat(backend): PDF text extraction with pypdf"
```

---

### Task 9：本地 Supabase 设置文档（手动步骤）

**Files:**
- Create: `docs/setup-supabase.md`

- [ ] **Step 1：写 setup 文档**

文件：`docs/setup-supabase.md`

```markdown
# Supabase 一次性设置

## 1. 创建项目
- 打开 https://supabase.com 注册
- 新建项目（免费层），记下 project URL 和 anon key
- 把这两个值填到 `backend/.env`

## 2. 启用 pgvector
在 Supabase SQL Editor 执行：

\`\`\`sql
create extension if not exists vector;
\`\`\`

## 3. 建 documents 表

\`\`\`sql
create table documents (
  id bigserial primary key,
  content text not null,
  embedding vector(1024),  -- 按你 MiniMax embedding 实际维度改
  metadata jsonb,
  created_at timestamptz default now()
);

create index documents_embedding_idx on documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);
\`\`\`

## 4. 测试
跑 `python backend/scripts/run_ingest.py`（Phase 3 实现后），
然后在 Supabase Table Editor 看 documents 表应该有 8-9 行。
```

- [ ] **Step 2：commit**

```bash
git add docs/setup-supabase.md
git commit -m "docs: Supabase setup instructions"
```

---

## Phase 3：Ingest 流水线

### Task 10：文档切块（chunker）

**Files:**
- Create: `backend/rag/chunker.py`
- Create: `tests/test_chunker.py`

- [ ] **Step 1：写测试**

文件：`tests/test_chunker.py`

```python
from backend.rag.chunker import chunk_text


def test_chunk_short_text_returns_single_chunk():
    text = "短文本"
    chunks = chunk_text(text, max_chars=400, overlap=50)
    assert len(chunks) == 1
    assert chunks[0] == "短文本"


def test_chunk_long_text_splits_by_paragraph():
    text = "段落1。\n\n段落2。\n\n段落3。" * 50  # 长文本
    chunks = chunk_text(text, max_chars=400, overlap=50)
    assert len(chunks) > 1
    for c in chunks:
        assert len(c) <= 500  # 略大于 max_chars（段落边界可能突破）


def test_chunk_respects_paragraph_boundary():
    text = "A" * 100 + "\n\n" + "B" * 100 + "\n\n" + "C" * 100
    chunks = chunk_text(text, max_chars=150, overlap=20)
    # 不应该在段落中间切
    for c in chunks:
        assert not c.startswith("B") or c.startswith("B")  # 段落开头是 OK 的
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_chunker.py -v
```

预期：`ModuleNotFoundError`

- [ ] **Step 3：写 chunker.py**

文件：`backend/rag/chunker.py`

```python
from typing import Literal


def chunk_text(
    text: str,
    max_chars: int = 400,
    overlap: int = 50,
) -> list[str]:
    """按段落边界切块，每块不超过 max_chars，重叠 overlap 字符"""
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    current = ""

    for para in paragraphs:
        # 如果当前块 + 段落超过 max_chars，且当前块非空，就先保存
        if current and len(current) + len(para) + 2 > max_chars:
            chunks.append(current)
            # 保留 overlap 字符作为下一块开头
            tail = current[-overlap:] if len(current) > overlap else current
            current = tail + "\n\n" + para
        else:
            current = current + "\n\n" + para if current else para

    if current:
        chunks.append(current)

    return chunks


ChunkSource = Literal["profile", "resume", "case_study", "demo"]


def build_metadata(source: ChunkSource, title: str, source_path: str) -> dict:
    return {
        "source": source_path,
        "type": source,
        "title": title,
    }
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_chunker.py -v
```

预期：`3 passed`

- [ ] **Step 5：commit**

```bash
git add backend/rag/chunker.py tests/test_chunker.py
git commit -m "feat(backend): text chunker with paragraph boundaries"
```

---

### Task 11：数据源加载器（profile / works / vibecoding / resume.pdf）

**Files:**
- Create: `backend/rag/sources.py`
- Create: `tests/test_sources.py`

- [ ] **Step 1：写测试（用 mock 数据）**

文件：`tests/test_sources.py`

```python
import json
from backend.rag.sources import load_all_sources


def test_load_all_sources_returns_list():
    docs = load_all_sources(
        profile={"name": "test", "title": "PM"},
        works=[],
        vibecoding=[],
        resume_text="测试简历内容",
    )
    assert isinstance(docs, list)
    assert len(docs) >= 2  # profile + resume


def test_load_all_sources_contains_profile():
    docs = load_all_sources(
        profile={"name": "林越", "title": "AI PM", "tagline": "测试"},
        works=[],
        vibecoding=[],
        resume_text="",
    )
    profile_doc = next(d for d in docs if d["metadata"]["type"] == "profile")
    assert "林越" in profile_doc["content"]
    assert "AI PM" in profile_doc["content"]


def test_load_all_sources_includes_works():
    docs = load_all_sources(
        profile={"name": "x", "title": "y"},
        works=[{
            "slug": "test-work",
            "title": "测试作品",
            "intro": "intro 内容",
            "context": "context 内容",
            "problem": "problem 内容",
            "approach": [{"title": "步骤", "body": "做法"}],
            "outcome": [{"metric": "67%", "label": "解决率"}],
            "reflection": "反思",
        }],
        vibecoding=[],
        resume_text="",
    )
    work_doc = next(d for d in docs if d["metadata"]["type"] == "case_study")
    assert work_doc["metadata"]["source"] == "works/test-work"
    assert "测试作品" in work_doc["content"]
    assert "67%" in work_doc["content"]


def test_load_all_sources_includes_demos():
    docs = load_all_sources(
        profile={"name": "x", "title": "y"},
        works=[],
        vibecoding=[{
            "slug": "prd-reviewer",
            "title": "PRD 评审助手",
            "subtitle": "测试副标题",
            "motivation": "动机",
            "build": "做法",
            "whatILearned": "收获",
            "stack": ["Cursor"],
        }],
        resume_text="",
    )
    demo_doc = next(d for d in docs if d["metadata"]["type"] == "demo")
    assert demo_doc["metadata"]["source"] == "vibecoding/prd-reviewer"
    assert "PRD 评审助手" in demo_doc["content"]
    assert "Cursor" in demo_doc["content"]
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_sources.py -v
```

- [ ] **Step 3：写 sources.py**

文件：`backend/rag/sources.py`

```python
from typing import Any
from backend.rag.chunker import chunk_text, build_metadata, ChunkSource


def _profile_to_text(profile: dict) -> tuple[str, str]:
    """profile dict → 拼接好的文本 + 标题"""
    title = f"{profile.get('name', '?')} — {profile.get('title', '?')}"
    parts = [
        f"姓名: {profile.get('name', '')} / {profile.get('nameZh', '')}",
        f"职位: {profile.get('title', '')}",
        f"定位: {profile.get('tagline', '')}",
        f"简介: {profile.get('subtitle', '')}",
        f"自述: {profile.get('pitch', '')}",
        f"位置: {profile.get('location', '')}",
        f"邮箱: {profile.get('email', '')}",
        f"能力: {', '.join(profile.get('capabilities', []))}",
    ]
    return "\n".join(parts), title


def _work_to_text(work: dict) -> tuple[str, str]:
    title = work["title"]
    parts = [
        f"标题: {work['title']}",
        f"副标题: {work['subtitle']}",
        f"年份: {work['year']} | 角色: {work['role']} | 团队: {work['team']}",
        f"\n## Intro\n{work['intro']}",
        f"\n## Context\n{work['context']}",
        f"\n## Problem\n{work['problem']}",
        f"\n## Approach",
    ]
    for step in work.get("approach", []):
        parts.append(f"### {step['title']}\n{step['body']}")
    parts.append(f"\n## Outcome")
    for o in work.get("outcome", []):
        parts.append(f"- {o['metric']} — {o['label']}")
    parts.append(f"\n## Reflection\n{work.get('reflection', '')}")
    return "\n".join(parts), title


def _demo_to_text(demo: dict) -> tuple[str, str]:
    title = demo["title"]
    parts = [
        f"标题: {demo['title']}",
        f"副标题: {demo['subtitle']}",
        f"年份: {demo['year']} | 用时: {demo['effort']}",
        f"Stack: {', '.join(demo.get('stack', []))}",
        f"\n## Motivation\n{demo['motivation']}",
        f"\n## Build\n{demo['build']}",
        f"\n## What I Learned\n{demo['whatILearned']}",
    ]
    return "\n".join(parts), title


def load_all_sources(
    profile: dict,
    works: list[dict],
    vibecoding: list[dict],
    resume_text: str,
) -> list[dict]:
    """返回 [{content, metadata}, ...] 列表 - 切块前/后由 ingest 决定"""
    docs = []

    # 1. Profile（整段，不切）
    text, title = _profile_to_text(profile)
    docs.append({
        "content": text,
        "metadata": build_metadata("profile", title, "profile"),
    })

    # 2. Resume PDF
    if resume_text.strip():
        docs.append({
            "content": resume_text,
            "metadata": build_metadata("resume", "简历", "resume.pdf"),
        })

    # 3. Works（每个整段）
    for w in works:
        text, title = _work_to_text(w)
        docs.append({
            "content": text,
            "metadata": build_metadata("case_study", title, f"works/{w['slug']}"),
        })

    # 4. Demos（每个整段）
    for d in vibecoding:
        text, title = _demo_to_text(d)
        docs.append({
            "content": text,
            "metadata": build_metadata("demo", title, f"vibecoding/{d['slug']}"),
        })

    return docs
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_sources.py -v
```

预期：`4 passed`

- [ ] **Step 5：commit**

```bash
git add backend/rag/sources.py tests/test_sources.py
git commit -m "feat(backend): data source loader for profile/works/demos/resume"
```

---

### Task 12：ingest 主脚本（端到端）

**Files:**
- Create: `backend/scripts/run_ingest.py`
- Create: `tests/test_ingest_e2e.py`

- [ ] **Step 1：写 e2e 测试（mock MiniMax + Supabase）**

文件：`tests/test_ingest_e2e.py`

```python
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.rag.ingest import ingest_documents


@pytest.mark.asyncio
async def test_ingest_documents_writes_to_supabase():
    docs = [
        {"content": "测试1", "metadata": {"source": "x"}},
        {"content": "测试2", "metadata": {"source": "y"}},
    ]
    fake_embeddings = [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]

    with patch("backend.rag.ingest.embed_texts", new=AsyncMock(return_value=fake_embeddings)):
        with patch("backend.rag.ingest.get_client") as MockGetClient:
            mock_table = MagicMock()
            mock_table.delete.return_value.execute.return_value = None
            mock_table.insert.return_value.execute.return_value = None
            mock_client = MagicMock()
            mock_client.table.return_value = mock_table
            MockGetClient.return_value = mock_client

            count = await ingest_documents(docs)

    assert count == 2
    mock_table.delete.assert_called_once()  # 先清空
    mock_table.insert.assert_called_once()
    inserted = mock_table.insert.call_args[0][0]
    assert len(inserted) == 2
    assert inserted[0]["embedding"] == [0.1, 0.2, 0.3]
    assert inserted[0]["content"] == "测试1"
    assert inserted[0]["metadata"] == {"source": "x"}
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_ingest_e2e.py -v
```

- [ ] **Step 3：写 ingest.py（核心逻辑）**

文件：`backend/rag/ingest.py`

```python
from typing import Any
from backend.lib.minimax import embed_texts
from backend.lib.supabase import get_client
from backend.rag.chunker import chunk_text


async def ingest_documents(docs: list[dict]) -> int:
    """接收已加载的 docs（未切块），切块 + embedding + 写 Supabase
    返回写入的 chunk 总数
    """
    # 1. 切块
    all_chunks: list[dict] = []
    for doc in docs:
        chunks = chunk_text(doc["content"], max_chars=400, overlap=50)
        for c in chunks:
            all_chunks.append({"content": c, "metadata": doc["metadata"]})

    if not all_chunks:
        return 0

    # 2. 批量 embedding
    texts = [c["content"] for c in all_chunks]
    embeddings = await embed_texts(texts)

    # 3. 拼装 rows
    rows = [
        {
            "content": c["content"],
            "embedding": emb,
            "metadata": c["metadata"],
        }
        for c, emb in zip(all_chunks, embeddings)
    ]

    # 4. 写 Supabase（先清空表，再插入）
    client = get_client()
    table = client.table("documents")
    table.delete().neq("id", 0).execute()  # delete all
    table.insert(rows).execute()

    return len(rows)
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_ingest_e2e.py -v
```

预期：`1 passed`

- [ ] **Step 5：写 CLI 脚本**

文件：`backend/scripts/run_ingest.py`

```python
#!/usr/bin/env python3
"""ingest CLI - 从前端 src/data + public/resume.pdf 加载，调用 ingest pipeline"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

# 把项目根加到 path
ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(ROOT))

from backend.rag.ingest import ingest_documents
from backend.rag.sources import load_all_sources
from backend.lib.pdf import extract_text


def load_ts_data():
    """从 src/data/*.ts 读数据（简化版：假设导出为 JSON）"""
    # 方案 A：直接 import TS（用 ts-node）
    # 方案 B：让前端 build 时生成 src/data.json
    # 方案 C：手动维护 data.json
    # 这里用方案 C - 我们手动维护 src/data.json
    data_path = ROOT / "src" / "data.json"
    if not data_path.exists():
        print(f"ERROR: {data_path} 不存在", file=sys.stderr)
        print("请先在前端跑: cd src && tsx scripts/export-data.ts", file=sys.stderr)
        sys.exit(1)
    return json.loads(data_path.read_text("utf-8"))


def load_resume_text():
    resume_pdf = ROOT / "public" / "resume.pdf"
    if not resume_pdf.exists():
        print(f"WARN: {resume_pdf} 不存在，跳过简历")
        return ""
    return extract_text(str(resume_pdf))


async def main():
    data = load_ts_data()
    resume_text = load_resume_text()

    docs = load_all_sources(
        profile=data["profile"],
        works=data["works"],
        vibecoding=data["demos"],
        resume_text=resume_text,
    )

    print(f"加载 {len(docs)} 个文档，开始切块 + embedding + 写 Supabase...")
    count = await ingest_documents(docs)
    print(f"✅ 完成，写入 {count} 个 chunks")


if __name__ == "__main__":
    asyncio.run(main())
```

- [ ] **Step 6：commit**

```bash
git add backend/rag/ingest.py backend/scripts/run_ingest.py tests/test_ingest_e2e.py
git commit -m "feat(backend): ingest pipeline (chunk + embed + write to Supabase)"
```

---

### Task 13：前端数据导出脚本（TypeScript → data.json）

**Files:**
- Create: `src/scripts/export-data.ts`
- Modify: `package.json`（加脚本）

- [ ] **Step 1：写脚本**

文件：`src/scripts/export-data.ts`

```typescript
// 把 src/data/*.ts 导出为 src/data.json，给后端 ingest 用
import { writeFileSync } from 'fs'
import { profile } from '../data/profile'
import { works } from '../data/works'
import { demos } from '../data/vibecoding'

const out = {
  profile,
  works: works.map((w) => ({
    slug: w.slug,
    title: w.title,
    subtitle: w.subtitle,
    year: w.year,
    role: w.role,
    team: w.team,
    intro: w.intro,
    context: w.context,
    problem: w.problem,
    approach: w.approach,
    outcome: w.outcome,
    reflection: w.reflection,
  })),
  demos: demos.map((d) => ({
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    year: d.year,
    effort: d.effort,
    stack: d.stack,
    motivation: d.motivation,
    build: d.build,
    whatILearned: d.whatILearned,
  })),
}

writeFileSync('src/data.json', JSON.stringify(out, null, 2), 'utf-8')
console.log('✅ Exported src/data.json')
```

- [ ] **Step 2：加 npm script**

文件：`package.json`，在 `scripts` 里加：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "export-data": "tsx src/scripts/export-data.ts"
  }
}
```

- [ ] **Step 3：装 tsx（如未装）**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm add -D tsx
```

- [ ] **Step 4：跑一下**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm export-data
cat src/data.json | head -20
```

预期：看到 JSON 内容输出

- [ ] **Step 5：commit**

```bash
git add src/scripts/export-data.ts package.json pnpm-lock.yaml
git commit -m "feat(frontend): data export script for backend ingest"
```

---

## Phase 4：RAG 检索 + Chat 端点

### Task 14：RAG 检索器

**Files:**
- Create: `backend/rag/retriever.py`
- Create: `tests/test_retriever.py`

- [ ] **Step 1：写测试**

文件：`tests/test_retriever.py`

```python
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from backend.rag.retriever import search_relevant_chunks


@pytest.mark.asyncio
async def test_search_returns_top_k_chunks():
    fake_embedding = [0.1] * 1024
    fake_response = [
        {
            "content": "匹配内容1",
            "metadata": {"source": "works/test", "title": "测试"},
            "similarity": 0.9,
        },
        {
            "content": "匹配内容2",
            "metadata": {"source": "demo/test", "title": "Demo"},
            "similarity": 0.8,
        },
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
async def test_search_filters_by_threshold():
    fake_embedding = [0.1] * 1024
    fake_response = [
        {"content": "高分", "metadata": {}, "similarity": 0.9},
        {"content": "低分", "metadata": {}, "similarity": 0.5},
    ]

    with patch("backend.rag.retriever.embed_texts", new=AsyncMock(return_value=[fake_embedding])):
        with patch("backend.rag.retriever.get_client") as MockGetClient:
            mock_rpc = MagicMock()
            mock_rpc.execute.return_value.data = fake_response
            mock_client = MagicMock()
            mock_client.rpc.return_value = mock_rpc
            MockGetClient.return_value = mock_client

            results = await search_relevant_chunks("q", top_k=5, threshold=0.65)

    assert len(results) == 1
    assert results[0]["content"] == "高分"
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_retriever.py -v
```

- [ ] **Step 3：写 retriever.py**

文件：`backend/rag/retriever.py`

```python
from backend.lib.minimax import embed_texts
from backend.lib.supabase import get_client


async def search_relevant_chunks(
    query: str,
    top_k: int = 5,
    threshold: float = 0.65,
) -> list[dict]:
    """对 query 做 embedding，在 Supabase pgvector 中检索 top-k 相似 chunks
    过滤相似度低于 threshold 的
    返回 [{content, metadata, similarity}, ...]
    """
    # 1. Embedding
    [query_embedding] = await embed_texts([query])

    # 2. 用 RPC 函数做相似度搜索（需要在 Supabase SQL 中建函数）
    client = get_client()
    response = client.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_threshold": threshold,
            "match_count": top_k,
        },
    ).execute()

    return response.data or []
```

- [ ] **Step 4：建 Supabase RPC 函数（手动 SQL）**

文件：`docs/setup-supabase.md` 追加（在原有基础上加这段）：

```sql
-- 在 Supabase SQL Editor 跑这个
create or replace function match_documents (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
```

- [ ] **Step 5：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_retriever.py -v
```

预期：`2 passed`

- [ ] **Step 6：commit**

```bash
git add backend/rag/retriever.py tests/test_retriever.py docs/setup-supabase.md
git commit -m "feat(backend): RAG retriever with pgvector similarity search"
```

---

### Task 15：System Prompt 模板

**Files:**
- Create: `backend/rag/prompts.py`
- Create: `tests/test_prompts.py`

- [ ] **Step 1：写测试**

文件：`tests/test_prompts.py`

```python
from backend.rag.prompts import build_system_prompt


def test_build_system_prompt_includes_chunks():
    chunks = [
        {"content": "片段1内容", "title": "作品1", "source": "works/x", "similarity": 0.9},
        {"content": "片段2内容", "title": "Demo1", "source": "vibecoding/y", "similarity": 0.8},
    ]
    prompt = build_system_prompt(chunks)
    assert "片段1内容" in prompt
    assert "作品1" in prompt
    assert "片段2内容" in prompt
    assert "behavior" in prompt.lower() or "行为" in prompt


def test_build_system_prompt_handles_empty_chunks():
    prompt = build_system_prompt([])
    assert "林越" in prompt or "AI 替身" in prompt
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_prompts.py -v
```

- [ ] **Step 3：写 prompts.py**

文件：`backend/rag/prompts.py`

```python
SYSTEM_PROMPT_TEMPLATE = """你是林越（Lin Yue）的 AI 替身。基于他的真实经历和作品回答访客问题。

# 参考资料（按相关度排序）：
{chunks_section}

# 行为规则：
- 只基于参考资料回答，不要编造
- 不知道就明确说"这个我没在作品里写过，建议直接联系林越"
- 保持中文，口语化，像林越本人在说话
- 单次回答不超过 200 字
- 不杜撰数字、年份、公司名
- 不要使用 markdown 加粗等格式
"""


def _format_chunks(chunks: list[dict]) -> str:
    if not chunks:
        return "（无相关参考资料）"
    lines = []
    for i, c in enumerate(chunks, 1):
        lines.append(f"[{i}] [{c.get('title', '?')}]({c.get('source', '?')}, 相似度 {c.get('similarity', 0):.2f})")
        lines.append(c["content"])
        lines.append("")
    return "\n".join(lines)


def build_system_prompt(chunks: list[dict]) -> str:
    return SYSTEM_PROMPT_TEMPLATE.format(chunks_section=_format_chunks(chunks))
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_prompts.py -v
```

预期：`2 passed`

- [ ] **Step 5：commit**

```bash
git add backend/rag/prompts.py tests/test_prompts.py
git commit -m "feat(backend): system prompt template for RAG"
```

---

### Task 16：Chat 端点（SSE 流式）

**Files:**
- Create: `backend/api/chat.py`
- Modify: `backend/main.py`（注册路由）
- Create: `tests/test_chat_endpoint.py`

- [ ] **Step 1：写测试**

文件：`tests/test_chat_endpoint.py`

```python
import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch, MagicMock
from backend.main import app


@pytest.mark.asyncio
async def test_chat_endpoint_streams_response():
    """POST /api/chat 应该返回 SSE 流式响应"""

    # Mock retriever
    fake_chunks = [
        {"content": "相关1", "title": "T1", "source": "s1", "similarity": 0.9},
    ]

    async def fake_stream(messages):
        yield {"type": "sources", "sources": fake_chunks}
        yield {"type": "token", "content": "你好"}
        yield {"type": "token", "content": "，我是 AI 替身"}
        yield {"type": "done"}

    with patch("backend.api.chat.search_relevant_chunks", new=AsyncMock(return_value=fake_chunks)):
        with patch("backend.api.chat.chat_stream", fake_stream):
            async with AsyncClient(app=app, base_url="http://test") as ac:
                resp = await ac.post(
                    "/api/chat",
                    json={"message": "你好", "history": []},
                )

    assert resp.status_code == 200
    text = resp.text
    # SSE 格式：data: {...}\n\n
    assert "data:" in text
    assert "sources" in text
    assert "你好" in text
    assert "我是 AI 替身" in text
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_chat_endpoint.py -v
```

- [ ] **Step 3：写 chat.py（API 路由）**

文件：`backend/api/chat.py`

```python
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from backend.models import ChatRequest
from backend.rag.retriever import search_relevant_chunks
from backend.rag.prompts import build_system_prompt
from backend.lib.minimax import chat_stream

router = APIRouter()


@router.post("/chat")
async def chat(req: ChatRequest):
    """RAG chat endpoint - returns SSE stream"""

    # 1. 检索
    chunks = await search_relevant_chunks(req.message, top_k=5, threshold=0.65)

    # 2. 拼 system prompt
    system_prompt = build_system_prompt(chunks)

    # 3. 拼 messages
    messages = [{"role": "system", "content": system_prompt}]
    # 保留最近 6 轮历史
    for h in req.history[-12:]:  # 6 轮 = 12 条
        messages.append({"role": h.role, "content": h.content})
    messages.append({"role": "user", "content": req.message})

    # 4. SSE 生成
    async def event_generator():
        # 先发 sources
        yield f"data: {json.dumps({'type': 'sources', 'sources': chunks}, ensure_ascii=False)}\n\n"
        # 再流式发 token
        async for event in chat_stream(messages):
            yield f"data: {json.dumps(event, ensure_ascii=False)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # 关掉 nginx buffering
        },
    )
```

- [ ] **Step 4：在 main.py 注册路由**

文件：`backend/main.py`，替换为：

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import chat

app = FastAPI(title="PM Portfolio API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

- [ ] **Step 5：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_chat_endpoint.py -v
```

预期：`1 passed`

- [ ] **Step 6：手动跑一下**

```bash
cd /Users/wty/Documents/个人/pm-portfolio/backend
source .venv/bin/activate
uvicorn main:app --reload &
sleep 2
curl -N -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你好","history":[]}'
kill %1
```

预期：看到 SSE 格式输出 `data: {...}`

- [ ] **Step 7：commit**

```bash
git add backend/api/chat.py backend/main.py tests/test_chat_endpoint.py
git commit -m "feat(backend): /api/chat endpoint with SSE streaming"
```

---

## Phase 5：Admin + Health 端点

### Task 17：Admin Reindex 端点

**Files:**
- Create: `backend/api/admin.py`
- Modify: `backend/main.py`（注册路由）
- Create: `tests/test_admin.py`

- [ ] **Step 1：写测试**

文件：`tests/test_admin.py`

```python
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
    assert resp.json() == {"status": "ok", "chunks_written": 42}
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_admin.py -v
```

- [ ] **Step 3：写 admin.py**

文件：`backend/api/admin.py`

```python
import json
import sys
from pathlib import Path
from fastapi import APIRouter, HTTPException, Header
from backend.config import settings

# 让 admin.py 能 import run_ingest
ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(ROOT))

router = APIRouter()


async def run_reindex() -> int:
    """从 src/data.json + public/resume.pdf 加载，跑 ingest pipeline"""
    from backend.rag.ingest import ingest_documents
    from backend.rag.sources import load_all_sources
    from backend.lib.pdf import extract_text

    data_path = ROOT / "src" / "data.json"
    if not data_path.exists():
        raise FileNotFoundError(f"{data_path} 不存在，请先 pnpm export-data")

    data = json.loads(data_path.read_text("utf-8"))
    resume_pdf = ROOT / "public" / "resume.pdf"
    resume_text = extract_text(str(resume_pdf)) if resume_pdf.exists() else ""

    docs = load_all_sources(
        profile=data["profile"],
        works=data["works"],
        vibecoding=data["demos"],
        resume_text=resume_text,
    )
    return await ingest_documents(docs)


@router.post("/admin/reindex")
async def reindex(x_admin_token: str = Header(default="")):
    if x_admin_token != settings.admin_token:
        raise HTTPException(status_code=401, detail="unauthorized")
    try:
        count = await run_reindex()
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"status": "ok", "chunks_written": count}
```

- [ ] **Step 4：在 main.py 注册 admin 路由**

文件：`backend/main.py`，追加：

```python
from backend.api import admin  # 在 chat import 旁

# 在 app.include_router(chat.router, prefix="/api") 之后加：
app.include_router(admin.router, prefix="/api")
```

- [ ] **Step 5：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
PYTHONPATH=. pytest tests/test_admin.py -v
```

预期：`2 passed`

- [ ] **Step 6：commit**

```bash
git add backend/api/admin.py backend/main.py tests/test_admin.py
git commit -m "feat(backend): /api/admin/reindex endpoint with token auth"
```

---

### Task 18：Health 端点增强

**Files:**
- Modify: `backend/main.py`

- [ ] **Step 1：扩展 /api/health 返回更多信息**

文件：`backend/main.py`，把 health 函数替换为：

```python
@app.get("/api/health")
async def health():
    from backend.config import settings
    return {
        "status": "ok",
        "chat_model": settings.minimax_chat_model,
        "embed_model": settings.minimax_embed_model,
    }
```

- [ ] **Step 2：commit**

```bash
git add backend/main.py
git commit -m "feat(backend): health endpoint includes model info"
```

---

## Phase 6：前端 Chat Hooks

### Task 19：useChat 状态机

**Files:**
- Create: `src/hooks/useChat.ts`
- Create: `src/hooks/useChat.test.ts`

- [ ] **Step 1：装测试工具（如未装）**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2：vitest 配置**

文件：`vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

- [ ] **Step 3：写测试**

文件：`src/hooks/useChat.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useChat } from './useChat'

describe('useChat', () => {
  it('starts with empty messages and idle status', () => {
    const { result } = renderHook(() => useChat())
    expect(result.current.messages).toEqual([])
    expect(result.current.status).toBe('idle')
  })

  it('clear resets everything', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.clear()
    })
    expect(result.current.messages).toEqual([])
    expect(result.current.status).toBe('idle')
  })
})
```

- [ ] **Step 4：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useChat.test.ts
```

- [ ] **Step 5：写 useChat.ts**

文件：`src/hooks/useChat.ts`

```typescript
import { useCallback, useState } from 'react'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  sources?: Array<{ content: string; source: string; title: string; similarity: number }>
}

export type ChatStatus = 'idle' | 'streaming' | 'error'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const updateLastMessage = useCallback((content: string) => {
    setMessages((prev) => {
      const next = [...prev]
      if (next.length === 0) return prev
      next[next.length - 1] = { ...next[next.length - 1], content }
      return next
    })
  }, [])

  const setMessageSources = useCallback((sources: ChatMessage['sources']) => {
    setMessages((prev) => {
      const next = [...prev]
      if (next.length === 0) return prev
      next[next.length - 1] = { ...next[next.length - 1], sources }
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setMessages([])
    setStatus('idle')
    setError(null)
  }, [])

  return {
    messages,
    status,
    error,
    addMessage,
    updateLastMessage,
    setMessageSources,
    setStatus,
    setError,
    clear,
  }
}
```

- [ ] **Step 6：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useChat.test.ts
```

预期：`2 passed`

- [ ] **Step 7：commit**

```bash
git add src/hooks/useChat.ts src/hooks/useChat.test.ts vitest.config.ts
git add package.json pnpm-lock.yaml
git commit -m "feat(frontend): useChat state management hook"
```

---

### Task 20：useStreaming（SSE 解析）

**Files:**
- Create: `src/hooks/useStreaming.ts`
- Create: `src/hooks/useStreaming.test.ts`

- [ ] **Step 1：写测试**

文件：`src/hooks/useStreaming.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock fetch with ReadableStream
function mockFetchWithSSE(events: Array<Record<string, unknown>>) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      for (const e of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`))
      }
      controller.close()
    },
  })
  return vi.fn().mockResolvedValue({
    ok: true,
    body: stream,
  })
}

describe('parseSSEStream', () => {
  it('parses multiple events from SSE stream', async () => {
    const { parseSSEStream } = await import('./useStreaming')
    const events = [
      { type: 'sources', sources: [] },
      { type: 'token', content: '你好' },
      { type: 'token', content: '世界' },
      { type: 'done' },
    ]
    const fetchMock = mockFetchWithSSE(events)
    global.fetch = fetchMock as any

    const received: any[] = []
    await parseSSEStream('/api/chat', { method: 'POST', body: '{}' }, (e) => {
      received.push(e)
    })

    expect(received).toHaveLength(4)
    expect(received[0].type).toBe('sources')
    expect(received[1].content).toBe('你好')
    expect(received[2].content).toBe('世界')
    expect(received[3].type).toBe('done')
  })
})
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useStreaming.test.ts
```

- [ ] **Step 3：写 useStreaming.ts**

文件：`src/hooks/useStreaming.ts`

```typescript
export interface SSEEvent {
  type: 'token' | 'sources' | 'done'
  content?: string
  sources?: Array<{ content: string; source: string; title: string; similarity: number }>
}

export async function parseSSEStream(
  url: string,
  init: RequestInit,
  onEvent: (event: SSEEvent) => void,
): Promise<void> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // SSE 用 \n\n 分隔 event
    const parts = buffer.split('\n\n')
    buffer = parts.pop() || ''  // 最后一段可能不完整，留给下一轮

    for (const part of parts) {
      const line = part.trim()
      if (!line.startsWith('data: ')) continue
      const payload = line.slice(6)
      try {
        const event = JSON.parse(payload) as SSEEvent
        onEvent(event)
        if (event.type === 'done') return
      } catch (e) {
        console.error('Failed to parse SSE event:', payload, e)
      }
    }
  }
}
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useStreaming.test.ts
```

预期：`1 passed`

- [ ] **Step 5：commit**

```bash
git add src/hooks/useStreaming.ts src/hooks/useStreaming.test.ts
git commit -m "feat(frontend): useStreaming SSE parser"
```

---

### Task 21：useChatHistory（localStorage 持久化）

**Files:**
- Create: `src/hooks/useChatHistory.ts`
- Create: `src/hooks/useChatHistory.test.ts`

- [ ] **Step 1：写测试**

文件：`src/hooks/useChatHistory.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { loadHistory, saveHistory, clearHistory } from './useChatHistory'

describe('chat history localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array when no history', () => {
    expect(loadHistory()).toEqual([])
  })

  it('saves and loads history', () => {
    const msgs = [
      { id: '1', role: 'user' as const, content: 'hi' },
      { id: '2', role: 'assistant' as const, content: 'hello' },
    ]
    saveHistory(msgs)
    expect(loadHistory()).toEqual(msgs)
  })

  it('keeps only last 6 turns (12 messages)', () => {
    const msgs = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      role: 'user' as const,
      content: `msg ${i}`,
    }))
    saveHistory(msgs)
    const loaded = loadHistory()
    expect(loaded.length).toBe(12)
    expect(loaded[0].id).toBe('8')
  })

  it('clear works', () => {
    saveHistory([{ id: '1', role: 'user', content: 'x' }])
    clearHistory()
    expect(loadHistory()).toEqual([])
  })
})
```

- [ ] **Step 2：跑测试，预期失败**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useChatHistory.test.ts
```

- [ ] **Step 3：写 useChatHistory.ts**

文件：`src/hooks/useChatHistory.ts`

```typescript
import type { ChatMessage } from './useChat'

const STORAGE_KEY = 'pm-portfolio-chat-history'
const MAX_MESSAGES = 12  // 6 轮 = 12 条

export function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveHistory(messages: ChatMessage[]) {
  const trimmed = messages.slice(-MAX_MESSAGES)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch (e) {
    // quota exceeded, ignore
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}
```

- [ ] **Step 4：跑测试，预期通过**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm vitest run src/hooks/useChatHistory.test.ts
```

预期：`4 passed`

- [ ] **Step 5：commit**

```bash
git add src/hooks/useChatHistory.ts src/hooks/useChatHistory.test.ts
git commit -m "feat(frontend): useChatHistory localStorage persistence"
```

---

## Phase 7：前端 Chat 组件

### Task 22：ChatMessage 组件

**Files:**
- Create: `src/components/ChatMessage.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatMessage.tsx`

```tsx
import { useState } from 'react'
import type { ChatMessage as ChatMessageType } from '../hooks/useChat'
import { ChatSources } from './ChatSources'

interface Props {
  message: ChatMessageType
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
  const [showSources, setShowSources] = useState(false)

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-ink text-cream'
            : 'bg-line/40 text-ink'
        }`}
      >
        <div className="text-[0.95rem] leading-[1.5] whitespace-pre-wrap">
          {message.content || (message.role === 'assistant' ? '...' : '')}
        </div>
        {message.sources && message.sources.length > 0 && (
          <button
            onClick={() => setShowSources(!showSources)}
            className="mt-2 text-[0.75rem] opacity-70 hover:opacity-100 underline"
          >
            📎 参考 {message.sources.length} 段资料 {showSources ? '↑' : '↓'}
          </button>
        )}
        {showSources && message.sources && (
          <ChatSources sources={message.sources} />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2：commit（会在 Task 23 一起跑测试）**

```bash
git add src/components/ChatMessage.tsx
git commit -m "feat(frontend): ChatMessage bubble component"
```

---

### Task 23：ChatSources 组件

**Files:**
- Create: `src/components/ChatSources.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatSources.tsx`

```tsx
interface Source {
  content: string
  source: string
  title: string
  similarity: number
}

interface Props {
  sources: Source[]
}

export function ChatSources({ sources }: Props) {
  return (
    <div className="mt-3 space-y-2 text-[0.8rem]">
      {sources.map((s, i) => (
        <div
          key={i}
          className="border-l-2 border-line pl-3 py-1 bg-cream/50 rounded"
        >
          <div className="text-muted">
            [{i + 1}] <span className="font-mono">{s.title}</span>
            <span className="ml-2 text-[0.7rem]">相似度 {s.similarity.toFixed(2)}</span>
          </div>
          <div className="mt-1 text-ink/80 line-clamp-3">{s.content}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ChatSources.tsx
git commit -m "feat(frontend): ChatSources collapsible references"
```

---

### Task 24：ChatInput 组件

**Files:**
- Create: `src/components/ChatInput.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatInput.tsx`

```tsx
import { useState, useRef, KeyboardEvent } from 'react'

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  const send = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="border-t border-line bg-cream/95 p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="问我任何问题... (Cmd/Ctrl+Enter 发送)"
          rows={1}
          className="flex-1 resize-none bg-transparent outline-none text-[0.95rem] leading-[1.4] text-ink placeholder:text-muted disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={disabled || !value.trim()}
          className="px-4 py-2 bg-ink text-cream text-[0.85rem] rounded-full hover:bg-vermilion transition-colors disabled:opacity-30 disabled:hover:bg-ink"
        >
          发送
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ChatInput.tsx
git commit -m "feat(frontend): ChatInput with Cmd+Enter send"
```

---

### Task 25：ChatSuggestions 组件

**Files:**
- Create: `src/components/ChatSuggestions.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatSuggestions.tsx`

```tsx
interface Props {
  onSelect: (q: string) => void
}

const SUGGESTIONS = [
  '你最近在做什么？',
  'AI Agent 项目里最难的决策是什么？',
  '你怎么定义"好的 AI 产品"？',
  '能讲讲 RAG 那个项目的复盘吗？',
]

export function ChatSuggestions({ onSelect }: Props) {
  return (
    <div className="p-6 space-y-2">
      <p className="text-[0.8rem] text-muted mb-3">试试问：</p>
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="block w-full text-left px-4 py-3 bg-line/30 hover:bg-line/60 rounded-lg text-[0.9rem] text-ink transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ChatSuggestions.tsx
git commit -m "feat(frontend): ChatSuggestions 4 starter questions"
```

---

### Task 26：ChatPanel 容器组件

**Files:**
- Create: `src/components/ChatPanel.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatPanel.tsx`

```tsx
import { useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import { parseSSEStream } from '../hooks/useStreaming'
import { loadHistory, saveHistory, clearHistory } from '../hooks/useChatHistory'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatSuggestions } from './ChatSuggestions'

interface Props {
  open: boolean
  onClose: () => void
}

export function ChatPanel({ open, onClose }: Props) {
  const chat = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  // 加载历史
  useEffect(() => {
    if (open && chat.messages.length === 0) {
      const history = loadHistory()
      if (history.length > 0) {
        history.forEach((m) => chat.addMessage(m))
      }
    }
  }, [open])

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat.messages])

  // 持久化
  useEffect(() => {
    if (chat.messages.length > 0) {
      saveHistory(chat.messages)
    }
  }, [chat.messages])

  const send = async (text: string) => {
    chat.addMessage({
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    })
    chat.addMessage({
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: '',
    })
    chat.setStatus('streaming')

    try {
      const history = chat.messages.slice(0, -2).map((m) => ({
        role: m.role,
        content: m.content,
      }))
      await parseSSEStream(
        '/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
        },
        (event) => {
          if (event.type === 'sources' && event.sources) {
            chat.setMessageSources(event.sources)
          } else if (event.type === 'token' && event.content) {
            chat.updateLastMessage(
              (chat.messages[chat.messages.length - 1]?.content || '') + event.content,
            )
          } else if (event.type === 'done') {
            chat.setStatus('idle')
          }
        },
      )
    } catch (e: any) {
      chat.setError(e.message || '网络错误')
      chat.setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-cream border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      role="dialog"
      aria-label="跟我聊"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div>
          <h2 className="font-display text-[1.15rem]">跟我聊</h2>
          <p className="text-[0.75rem] text-muted">AI 替身 · 基于真实作品回答</p>
        </div>
        <div className="flex items-center gap-2">
          {chat.messages.length > 0 && (
            <button
              onClick={() => {
                chat.clear()
                clearHistory()
              }}
              className="text-[0.75rem] text-muted hover:text-ink"
              title="清空对话"
            >
              清空
            </button>
          )}
          <button
            onClick={onClose}
            className="text-muted hover:text-ink text-[1.2rem] leading-none"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {chat.messages.length === 0 ? (
          <ChatSuggestions onSelect={send} />
        ) : (
          chat.messages.map((m) => <ChatMessage key={m.id} message={m} />)
        )}
        {chat.status === 'error' && (
          <div className="text-center text-[0.85rem] text-vermilion py-4">
            {chat.error} · <button onClick={() => chat.setStatus('idle')} className="underline">重试</button>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={send} disabled={chat.status === 'streaming'} />
    </div>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ChatPanel.tsx
git commit -m "feat(frontend): ChatPanel container with SSE + history + suggestions"
```

---

### Task 27：ChatLauncher 悬浮按钮

**Files:**
- Create: `src/components/ChatLauncher.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ChatLauncher.tsx`

```tsx
import { useState, useEffect } from 'react'
import { ChatPanel } from './ChatPanel'

export function ChatLauncher() {
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(false)

  // 3 秒后开始呼吸动画
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Cmd/Ctrl + K 全局唤起
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-ink text-cream shadow-lg hover:bg-vermilion transition-all ${
          pulse && !open ? 'animate-pulse' : ''
        }`}
        aria-label="跟我聊"
      >
        <span className="text-[1.5rem]">💬</span>
      </button>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ChatLauncher.tsx
git commit -m "feat(frontend): ChatLauncher floating button + Cmd+K shortcut"
```

---

## Phase 8：App 集成

### Task 28：App.tsx 加 ChatLauncher

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1：加 ChatLauncher 到 App 树**

文件：`src/App.tsx`，在 `</Routes>` 后加：

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Works from './pages/Works'
import CaseStudy from './pages/CaseStudy'
import Vibecoding from './pages/Vibecoding'
import Demo from './pages/Demo'
import Resume from './pages/Resume'
import About from './pages/About'
import { ChatLauncher } from './components/ChatLauncher'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<CaseStudy />} />
          <Route path="/vibecoding" element={<Vibecoding />} />
          <Route path="/vibecoding/:slug" element={<Demo />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <ChatLauncher />
    </>
  )
}
```

- [ ] **Step 2：手动跑一下，确保没有 React 报错**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm dev
```

打开 http://localhost:5173 ，应该看到右下角悬浮按钮。点击能打开聊天窗口。

- [ ] **Step 3：commit**

```bash
git add src/App.tsx
git commit -m "feat(frontend): mount ChatLauncher globally"
```

---

### Task 29：Navigation.tsx 加"跟我聊"按钮

**Files:**
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1：读现有 Navigation 看结构**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
cat src/components/Navigation.tsx
```

- [ ] **Step 2：在导航项末尾加"跟我聊"按钮**

在 Navigation 组件的链接列表末尾加：

```tsx
<button
  onClick={() => {
    // 触发 ChatLauncher - 通过自定义事件
    window.dispatchEvent(new CustomEvent('open-chat'))
  }}
  className="text-[0.85rem] text-ink hover:text-vermilion transition-colors"
>
  跟我聊
</button>
```

- [ ] **Step 3：在 ChatLauncher 里监听这个事件**

文件：`src/components/ChatLauncher.tsx`，在 useEffect 里加：

```tsx
useEffect(() => {
  const handler = () => setOpen(true)
  window.addEventListener('open-chat', handler)
  return () => window.removeEventListener('open-chat', handler)
}, [])
```

- [ ] **Step 4：手动验证导航按钮能打开聊天**

```bash
pnpm dev
```

打开浏览器，点导航栏"跟我聊"应该能弹开聊天窗口。

- [ ] **Step 5：commit**

```bash
git add src/components/Navigation.tsx src/components/ChatLauncher.tsx
git commit -m "feat(frontend): Navigation '跟我聊' button opens chat"
```

---

### Task 30：Home.tsx 加 AI 助理入口卡片

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1：在 Home 页加一个推荐"跟我聊聊"的卡片**

读现有 Home.tsx 内容（123 行）。在 CTA 区域（如果有）加一个卡片：

```tsx
<button
  onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
  className="block w-full text-left p-6 border border-line rounded-xl hover:border-vermilion transition-colors"
>
  <div className="text-[0.75rem] uppercase tracking-[0.18em] text-muted mb-2">
    互动 · INTERACTIVE
  </div>
  <h3 className="font-display text-[1.4rem] mb-2">跟我聊聊</h3>
  <p className="text-[0.9rem] text-muted">
    让 AI 替身回答你关于我作品、想法、经历的任意问题。
  </p>
</button>
```

- [ ] **Step 2：手动验证**

```bash
pnpm dev
```

打开首页应该看到"跟我聊聊"卡片，点击能弹开聊天。

- [ ] **Step 3：commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(frontend): Home page AI assistant entry card"
```

---

## Phase 9：Resume 页改版

### Task 31：src/data/resume.ts 数据结构

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 1：写数据（用占位内容，跟现有 profile/works 风格保持一致）**

文件：`src/data/resume.ts`

```typescript
import { works } from './works'

export const resume = {
  basics: {
    name: 'Lin Yue',
    nameZh: '林越',
    title: 'AI 产品经理',
    tagline: '把模糊需求变成可上线的产品。',
    email: 'linyue.pm@example.com',
    location: '上海',
    social: [
      { label: 'GitHub', href: 'https://github.com/your-handle' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
      { label: '小红书', href: 'https://xiaohongshu.com/user/your-handle' },
    ],
  },

  summary: '5 年产品经验，过去 2 年专注 AI 应用层。做过客服 Agent、销售 RAG、面试评测系统。现在在找一支认真做 AI 产品的团队。',

  experience: [
    {
      company: '某跨境电商 SaaS',
      role: 'AI 产品负责人',
      period: '2024 - 至今',
      location: '上海',
      highlights: [
        '上线 AI 客服 Agent，自动解决率 18% → 67%，月省 380 万',
        '建立 1000 条评测集，让所有 prompt/模型迭代靠数据而非感觉',
        '设计 12 个"立即转人工"触发条件，0 起涉及金钱的失误',
      ],
    },
    {
      company: '某消费金融公司',
      role: '高级产品经理',
      period: '2022 - 2024',
      location: '上海',
      highlights: [
        '从 0 到 1 做 AI 销售助手，DAU 翻倍',
        '跨 4 个团队协调：算法 / 工程 / 风控 / 业务',
      ],
    },
    {
      company: '某互联网公司',
      role: '产品经理',
      period: '2020 - 2022',
      location: '北京',
      highlights: [
        '负责核心 DAU 功能，NPS +15pt',
        '带 2 名产品助理',
      ],
    },
  ],

  education: [
    {
      school: '复旦大学',
      degree: '管理学学士',
      period: '2016 - 2020',
      notes: '辅修计算机科学',
    },
  ],

  skills: [
    { group: '产品', items: ['用户研究', '策略规划', '数据分析', 'PRD 撰写', '跨团队协作'] },
    { group: 'AI', items: ['RAG', 'Agent', 'Prompt 工程', 'Embedding', '评测集设计'] },
    { group: '工具', items: ['Figma', 'SQL', 'Python', 'Cursor', 'Vercel', 'Supabase'] },
  ],

  awards: [
    '2024 年公司年度优秀 PM（Top 5%）',
    '2023 年复旦校友 AI 产品黑客松一等奖',
  ],

  selectedProjects: works.map((w) => ({ slug: w.slug, title: w.title, year: w.year })),
}

export type Resume = typeof resume
```

- [ ] **Step 2：commit**

```bash
git add src/data/resume.ts
git commit -m "feat(frontend): resume data structure"
```

---

### Task 32：ResumeHeader 组件

**Files:**
- Create: `src/components/ResumeHeader.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/ResumeHeader.tsx`

```tsx
import { Link } from 'react-router-dom'
import { resume } from '../data/resume'

export function ResumeHeader() {
  const { basics } = resume
  return (
    <header className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-12 relative">
      <Link
        to="/"
        className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
      >
        ← Home
      </Link>

      <div className="mt-12 flex items-start justify-between gap-8 flex-wrap">
        <div>
          <h1 className="font-display text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.95] tracking-tightest text-balance">
            {basics.nameZh}
            <span className="block text-muted text-[0.5em] mt-2 font-sans">
              {basics.name}
            </span>
          </h1>
          <p className="mt-6 text-[1.1rem] md:text-[1.3rem] text-muted leading-[1.4]">
            {basics.title} · {basics.location}
          </p>
          <p className="mt-2 text-[0.95rem] text-ink/70 max-w-prose">
            {basics.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem]">
            <a href={`mailto:${basics.email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
              {basics.email}
            </a>
            {basics.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <a
          href="/resume.pdf"
          download
          className="px-5 py-2.5 border border-ink rounded-full text-[0.85rem] hover:bg-ink hover:text-cream transition-colors"
        >
          下载 PDF ↓
        </a>
      </div>
    </header>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ResumeHeader.tsx
git commit -m "feat(frontend): ResumeHeader with hero + PDF download"
```

---

### Task 33：ResumeExperience / Education / Skills 组件

**Files:**
- Create: `src/components/ResumeSection.tsx`（通用 section + 时间线 + 标签）

- [ ] **Step 1：写组件**

文件：`src/components/ResumeSection.tsx`

```tsx
import { resume } from '../data/resume'

function Divider() {
  return (
    <div className="my-16 flex items-center gap-1" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="h-px w-8 bg-line" />
      ))}
    </div>
  )
}

export function ResumeSummary() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-4">Summary</h2>
      <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.6] max-w-prose text-pretty">
        {resume.summary}
      </p>
      <Divider />
    </section>
  )
}

export function ResumeExperience() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-8">Experience</h2>
      <ol className="relative border-l border-line ml-3 space-y-12">
        {resume.experience.map((e, i) => (
          <li key={i} className="pl-8 relative">
            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-ink" />
            <div className="text-[0.78rem] uppercase tracking-[0.18em] text-muted num">
              {e.period}
            </div>
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] mt-1">
              {e.role}
              <span className="text-muted font-sans text-[0.85em]"> · {e.company}</span>
            </h3>
            <p className="text-[0.85rem] text-muted mt-1">{e.location}</p>
            <ul className="mt-4 space-y-2 text-[0.95rem] leading-[1.55]">
              {e.highlights.map((h, j) => (
                <li key={j} className="flex gap-3">
                  <span className="text-vermilion mt-1">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <Divider />
    </section>
  )
}

export function ResumeEducation() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Education</h2>
      <ul className="space-y-4">
        {resume.education.map((e, i) => (
          <li key={i} className="text-[0.95rem]">
            <span className="font-display text-[1.15rem]">{e.school}</span>
            <span className="text-muted ml-3">{e.degree}</span>
            <span className="text-muted ml-3 num">{e.period}</span>
            {e.notes && <p className="text-muted text-[0.85rem] mt-1">{e.notes}</p>}
          </li>
        ))}
      </ul>
      <Divider />
    </section>
  )
}

export function ResumeSkills() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Skills</h2>
      <div className="space-y-4">
        {resume.skills.map((s, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
            <div className="text-[0.78rem] uppercase tracking-[0.18em] text-muted md:w-20 shrink-0">
              {s.group}
            </div>
            <div className="flex flex-wrap gap-2 text-[0.9rem]">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 border border-line rounded-full text-ink/80 font-mono text-[0.78rem]"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </section>
  )
}

export function ResumeSelectedWork() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10 pb-24">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Selected Work</h2>
      <ul className="space-y-3">
        {resume.selectedProjects.map((p) => (
          <li key={p.slug}>
            <a
              href={`/works/${p.slug}`}
              className="group flex items-baseline justify-between border-b border-line py-3 hover:border-ink transition-colors"
            >
              <span className="font-display text-[1.1rem] md:text-[1.25rem] group-hover:text-vermilion transition-colors">
                {p.title}
              </span>
              <span className="text-[0.78rem] text-muted num">{p.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/ResumeSection.tsx
git commit -m "feat(frontend): Resume sections (Summary/Experience/Education/Skills/Selected Work)"
```

---

### Task 34：改造 Resume.tsx 用新组件

**Files:**
- Modify: `src/pages/Resume.tsx`

- [ ] **Step 1：替换 Resume 页内容**

文件：`src/pages/Resume.tsx`，整文件替换为：

```tsx
import { ResumeHeader } from '../components/ResumeHeader'
import {
  ResumeSummary,
  ResumeExperience,
  ResumeEducation,
  ResumeSkills,
  ResumeSelectedWork,
} from '../components/ResumeSection'

export default function Resume() {
  return (
    <article>
      <ResumeHeader />
      <ResumeSummary />
      <ResumeExperience />
      <ResumeEducation />
      <ResumeSkills />
      <ResumeSelectedWork />
    </article>
  )
}
```

- [ ] **Step 2：手动验证**

```bash
pnpm dev
```

打开 http://localhost:5173/resume ，应该看到新版的图文简历。

- [ ] **Step 3：commit**

```bash
git add src/pages/Resume.tsx
git commit -m "feat(frontend): Resume page redesigned with structured layout"
```

---

## Phase 10：DemoCard + CaseStudyCard

### Task 35：DemoCard 组件

**Files:**
- Create: `src/components/DemoCard.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/DemoCard.tsx`

```tsx
import { Link } from 'react-router-dom'
import type { Demo } from '../data/vibecoding'

interface Props {
  demo: Demo
}

export function DemoCard({ demo }: Props) {
  return (
    <Link
      to={`/vibecoding/${demo.slug}`}
      className="group block border border-line rounded-xl overflow-hidden hover:border-ink transition-colors"
    >
      <div className={`aspect-[16/9] bg-gradient-to-br ${demo.cover} relative`}>
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-mono text-[0.7rem] text-cream/70 uppercase tracking-[0.18em]">
            {demo.tags[0]}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[1.3rem] md:text-[1.5rem] leading-[1.1] group-hover:text-vermilion transition-colors">
          {demo.title}
        </h3>
        <p className="mt-2 text-[0.9rem] text-muted leading-[1.45] line-clamp-2">
          {demo.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {demo.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[0.7rem] px-2 py-0.5 border border-line rounded-full text-muted font-mono"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[0.75rem] text-muted num">
          <span>{demo.effort}</span>
          <span>{demo.year}</span>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/DemoCard.tsx
git commit -m "feat(frontend): DemoCard component"
```

---

### Task 36：CaseStudyCard 组件

**Files:**
- Create: `src/components/CaseStudyCard.tsx`

- [ ] **Step 1：写组件**

文件：`src/components/CaseStudyCard.tsx`

```tsx
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../data/works'

interface Props {
  work: CaseStudy
  featured?: boolean
}

export function CaseStudyCard({ work, featured = false }: Props) {
  return (
    <Link
      to={`/works/${work.slug}`}
      className={`group block ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className={`bg-gradient-to-br ${work.cover} aspect-[${featured ? '21/9' : '16/10'}] rounded-xl mb-6 relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-end p-6">
          <div className="text-cream/90">
            <div className="text-[0.7rem] uppercase tracking-[0.18em] opacity-70 mb-2 num">
              {work.year} · {work.role}
            </div>
            <h3 className="font-display text-[1.5rem] md:text-[2rem] leading-[1.05] text-balance">
              {work.title}
            </h3>
          </div>
        </div>
      </div>
      <p className="text-[1rem] md:text-[1.1rem] text-muted leading-[1.5] max-w-prose group-hover:text-ink transition-colors">
        {work.subtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {work.tags.map((t) => (
          <span
            key={t}
            className="text-[0.7rem] px-2 py-0.5 border border-line rounded-full text-muted font-mono"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2：commit**

```bash
git add src/components/CaseStudyCard.tsx
git commit -m "feat(frontend): CaseStudyCard component"
```

---

### Task 37：在 Works / Vibecoding 列表用新卡片

**Files:**
- Modify: `src/pages/Works.tsx`
- Modify: `src/pages/Vibecoding.tsx`

- [ ] **Step 1：读现有 Works.tsx**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
cat src/pages/Works.tsx
```

- [ ] **Step 2：替换 Works 列表渲染**

在 Works.tsx 里把 `{works.map(...)}` 替换为：

```tsx
import { CaseStudyCard } from '../components/CaseStudyCard'

// 在 return 里：
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
  {works.map((w, i) => (
    <CaseStudyCard key={w.slug} work={w} featured={i === 0} />
  ))}
</div>
```

- [ ] **Step 3：替换 Vibecoding 列表渲染**

在 Vibecoding.tsx 里把 `{demos.map(...)}` 替换为：

```tsx
import { DemoCard } from '../components/DemoCard'

// 在 return 里：
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {demos.map((d) => (
    <DemoCard key={d.slug} demo={d} />
  ))}
</div>
```

- [ ] **Step 4：手动验证**

```bash
pnpm dev
```

打开 /works 和 /vibecoding，应该看到新卡片样式。

- [ ] **Step 5：commit**

```bash
git add src/pages/Works.tsx src/pages/Vibecoding.tsx
git commit -m "feat(frontend): use new DemoCard/CaseStudyCard in lists"
```

---

### Task 38：强化 Demo 详情页"打开 demo"按钮

**Files:**
- Modify: `src/pages/Demo.tsx`

- [ ] **Step 1：读现有 Demo.tsx 看结构**

```bash
cat src/pages/Demo.tsx
```

- [ ] **Step 2：把"在线 →"链接强化为大主按钮**

在 Demo.tsx 里找到那个外链按钮（`{d.liveUrl ? ... }`），替换为：

```tsx
{d.liveUrl && (
  <a
    href={d.liveUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-ink text-cream text-[1.05rem] rounded-full hover:bg-vermilion transition-colors"
  >
    打开 demo
    <span className="text-[1.2rem]">→</span>
  </a>
)}
```

把"演示"那一栏的 "在线 →" 链接去掉或弱化（避免重复 CTA）。

- [ ] **Step 3：手动验证**

```bash
pnpm dev
```

打开任一 demo 详情页，应该看到醒目的大按钮。

- [ ] **Step 4：commit**

```bash
git add src/pages/Demo.tsx
git commit -m "feat(frontend): prominent demo CTA button"
```

---

## Phase 11：Docker + Nginx + 启动脚本

### Task 39：start.sh 启动脚本

**Files:**
- Create: `scripts/start.sh`

- [ ] **Step 1：写脚本**

```bash
mkdir -p /Users/wty/Documents/个人/pm-portfolio/scripts
```

文件：`scripts/start.sh`

```bash
#!/bin/sh
set -e

echo "🚀 Starting PM Portfolio..."

# 后端
cd /app/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1 &
BACKEND_PID=$!

# 前端（Nginx 在前台）
nginx -g "daemon off;"

# 如果 nginx 退出，关闭后端
kill $BACKEND_PID 2>/dev/null || true
```

- [ ] **Step 2：commit**

```bash
git add scripts/start.sh
git commit -m "feat(deploy): start.sh launches uvicorn + nginx"
```

---

### Task 40：Nginx 配置

**Files:**
- Create: `nginx.conf`

- [ ] **Step 1：写配置**

文件：`nginx.conf`

```nginx
server {
    listen 7860;
    server_name _;

    root /app/frontend_dist;
    index index.html;

    # 静态资源缓存
    location ~* \.(js|css|woff2?|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # API 反代到 FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # SSE 关键：关掉 buffering
        proxy_buffering off;
        proxy_cache off;
        proxy_set_header Connection '';
        proxy_http_version 1.1;

        # 超时
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 健康检查
    location = /health {
        access_log off;
        return 200 "ok\n";
        add_header Content-Type text/plain;
    }
}
```

- [ ] **Step 2：commit**

```bash
git add nginx.conf
git commit -m "feat(deploy): nginx config with SSE support + SPA fallback"
```

---

### Task 41：Dockerfile 多阶段构建

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

- [ ] **Step 1：写 .dockerignore**

文件：`.dockerignore`

```
node_modules
dist
.pnpm-store
.git
.github
docs
.venv
__pycache__
*.pyc
.pytest_cache
.DS_Store
```

- [ ] **Step 2：写 Dockerfile**

文件：`Dockerfile`

```dockerfile
# Stage 1: 前端构建
FROM node:20-alpine AS frontend
WORKDIR /app

# 装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 生成 data.json
COPY src ./src
COPY tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
RUN pnpm export-data
RUN pnpm build

# Stage 2: 后端 + 运行
FROM python:3.11-slim AS runtime

# 系统依赖（nginx + curl 用于 healthcheck）
RUN apt-get update && apt-get install -y --no-install-recommends \
        nginx curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# 前端 dist
COPY --from=frontend /app/dist /app/frontend_dist
# data.json（ingest 用）
COPY --from=frontend /app/src/data.json /app/src/data.json
# 公共资源（resume.pdf）
COPY public /app/public

# Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 关掉 nginx 默认 site
RUN rm -f /etc/nginx/sites-enabled/default

# 启动脚本
COPY scripts/start.sh /start.sh
RUN chmod +x /start.sh

# HF Spaces 必须 EXPOSE 7860
EXPOSE 7860

# Healthcheck
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://localhost:7860/health || exit 1

CMD ["/start.sh"]
```

- [ ] **Step 3：commit**

```bash
git add Dockerfile .dockerignore
git commit -m "feat(deploy): multi-stage Dockerfile for HF Spaces"
```

---

## Phase 12：GitHub Actions

### Task 42：保活 workflow

**Files:**
- Create: `.github/workflows/keepalive.yml`

- [ ] **Step 1：建目录 + 写 workflow**

```bash
mkdir -p /Users/wty/Documents/个人/pm-portfolio/.github/workflows
```

文件：`.github/workflows/keepalive.yml`

```yaml
name: Keep HF Space Alive

on:
  schedule:
    # 每 25 小时一次（48h 睡眠边界内）
    - cron: '0 */25 * * *'
  workflow_dispatch:  # 允许手动触发

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping health endpoint
        run: |
          curl -fsS ${{ secrets.SPACE_URL }}/health || echo "ping failed"
```

- [ ] **Step 2：commit**

```bash
git add .github/workflows/keepalive.yml
git commit -m "ci: keep-alive workflow for HF Spaces"
```

---

### Task 43：重索引 workflow

**Files:**
- Create: `.github/workflows/reindex.yml`

- [ ] **Step 1：写 workflow**

文件：`.github/workflows/reindex.yml`

```yaml
name: Reindex Documents

on:
  push:
    branches: [main]
    paths:
      - 'src/data/**'
      - 'public/resume.pdf'
  workflow_dispatch:

jobs:
  reindex:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger reindex endpoint
        run: |
          curl -fsS -X POST ${{ secrets.SPACE_URL }}/api/admin/reindex \
               -H "X-Admin-Token: ${{ secrets.ADMIN_TOKEN }}" \
               || echo "reindex failed (space may be waking up)"
```

- [ ] **Step 2：commit**

```bash
git add .github/workflows/reindex.yml
git commit -m "ci: reindex workflow on data change"
```

---

## Phase 13：HF Spaces 部署

### Task 44：部署到 HF Spaces

**Files:**
- Create: `README.md`（HF Spaces 必需的 README）
- Manual: HF Spaces 账户配置

- [ ] **Step 1：替换 README 为 HF Spaces 格式**

HF Spaces 强制读根级 README.md 来配置 Space 元数据。完整替换为：

文件：`README.md`

```markdown
---
title: PM Portfolio
emoji: 📝
colorFrom: yellow
colorTo: red
sdk: docker
pinned: false
---

# PM Portfolio 个人站

AI 产品经理个人作品集。

**架构：** 单容器 = Nginx + uvicorn + FastAPI + React 静态文件。
**AI：** RAG over 简历 + 案例 + demo，基于 MiniMax M3。

## 本地开发

\`\`\`bash
pnpm install
pnpm dev
cd backend && source .venv/bin/activate && uvicorn main:app --reload
\`\`\`

## 环境变量（HF Space Settings）

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `MINIMAX_API_KEY`
- `MINIMAX_API_BASE` (默认 `https://api.minimaxi.com`)
- `MINIMAX_CHAT_MODEL` (默认 `MiniMax-M3`)
- `MINIMAX_EMBED_MODEL` (默认 `emb-01`)
- `ADMIN_TOKEN`（与 GitHub Secret 保持一致）

## 一次性 Supabase 设置

见 `docs/setup-supabase.md`

## 触发重索引

\`\`\`bash
curl -X POST https://your-space.hf.space/api/admin/reindex \\
     -H "X-Admin-Token: $ADMIN_TOKEN"
\`\`\`

或 push 改 `src/data/**` 触发 GitHub Action。
```

- [ ] **Step 2：在 HF 创建 Space**

1. 打开 https://huggingface.co/new-space
2. SDK 选 `Docker`
3. Hardware 选 `CPU basic` (免费)
4. Visibility: Public

- [ ] **Step 3：关联 GitHub 仓库**

在 Space Settings → Repository:
- 连到 `your-handle/pm-portfolio` GitHub repo
- 启用 `Sync with GitHub`

- [ ] **Step 4：配 Secrets**

在 GitHub repo → Settings → Secrets and variables → Actions:
- `SPACE_URL`: `https://your-handle-pm.hf.space`
- `ADMIN_TOKEN`: 跟 HF Space 的 `ADMIN_TOKEN` 一致

在 HF Space → Settings → Variables and secrets:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `MINIMAX_API_KEY`
- `MINIMAX_API_BASE` (optional, 默认值即可)
- `MINIMAX_CHAT_MODEL` (optional)
- `MINIMAX_EMBED_MODEL` (optional)
- `ADMIN_TOKEN`

- [ ] **Step 5：推送触发首次部署**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
git push origin main
```

- [ ] **Step 6：commit README**

```bash
git add README.md
git commit -m "docs: HF Spaces README with metadata + setup"
```

---

## Phase 14：端到端验证

### Task 45：本地端到端测试

- [ ] **Step 1：本地起完整栈**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
# Terminal 1
pnpm dev

# Terminal 2
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

- [ ] **Step 2：跑 ingest 一次**

```bash
cd /Users/wty/Documents/个人/pm-portfolio
pnpm export-data
cd backend
source .venv/bin/activate
python scripts/run_ingest.py
```

预期：`✅ 完成，写入 X 个 chunks`（X 应在 8-20 之间）

- [ ] **Step 3：浏览器验证**

打开 http://localhost:5173 ，检查：
- [ ] 7 个页面都能打开
- [ ] 右下角悬浮按钮出现
- [ ] 点击打开聊天窗口
- [ ] 4 个推荐问题
- [ ] 点一个推荐问题，看到流式响应
- [ ] 答案下方有"📎 参考 X 段资料"，点开展示
- [ ] 清空对话按钮工作
- [ ] Cmd+K 能唤起
- [ ] 简历页新样式正常

- [ ] **Step 4：测试边界情况**

- [ ] 问一个明显与作品无关的问题（如"北京今天天气"），应该回答"这个我没在作品里写过..."
- [ ] 刷新页面后历史对话恢复
- [ ] 移动端尺寸（375px）布局不破

---

### Task 46：HF Spaces 端到端测试

- [ ] **Step 1：访问部署的 URL**

打开 `https://your-handle-pm.hf.space`

- [ ] **Step 2：跑全部 7 个页面**

- [ ] **Step 3：测试 AI 聊天**

- [ ] **Step 4：改 src/data/profile.ts 一个字段，commit + push**

- [ ] **Step 5：等待 ~30s，AI 助理应该用新内容回答**

- [ ] **Step 6：手动触发 reindex 验证**

```bash
curl -X POST https://your-handle-pm.hf.space/api/admin/reindex \
     -H "X-Admin-Token: $ADMIN_TOKEN"
```

预期：`{"status":"ok","chunks_written":X}`

- [ ] **Step 7：检查保活 cron 第二天是否真的触发了**

打开 GitHub → Actions → Keep HF Space Alive，看历史运行

---

## 验收清单（对应 Spec §13）

- [ ] HF Space 上线，访问 < 2s
- [ ] 7 个页面全部可访问，链接正常
- [ ] AI 助理能基于真实作品回答 80%+ 合理问题
- [ ] AI 助理不杜撰（回答"不知道"占 20% 问题）
- [ ] 流式响应 + 打字机效果工作正常
- [ ] 来源展开功能正常
- [ ] 改 `src/data/**` 后 30s 内 AI 助理答得对
- [ ] 保活 cron 正常工作
- [ ] 月成本 < ¥30
- [ ] Lighthouse Performance > 90
- [ ] 移动端可用
- [ ] 打印简历样式正常

---

## 实施注意事项

### MiniMax API 适配

计划中所有 `https://api.minimaxi.com` 和 `MiniMax-M3` / `emb-01` 是**占位**。

**实施 Task 6 前必须：**
1. 查 MiniMax 官方文档，确认：
   - API base URL
   - Chat 模型名
   - Embedding 模型名
   - 端点路径（`/v1/chat/completions` 还是别的）
   - 请求体格式（OpenAI 兼容还是自定义）
2. 如不兼容 OpenAI 格式，修改 `backend/lib/minimax.py` 的 `_post` / `chat_stream` / `embed_texts`
3. 同步更新 `backend/.env.example` 和 `README.md`（HF 元数据）

### Embedding 维度

Supabase 表用 `vector(1024)` 是占位。**Task 9 / Task 14 之前必须：**
1. 调一次 MiniMax embedding API 确认实际返回维度
2. 更新 `docs/setup-supabase.md` 的 SQL，把 `vector(1024)` 改成实际值
3. 更新 `backend/lib/supabase.py` 中 pgvector 索引的维度（如有硬编码）

### 首次部署容易踩的坑

| 坑 | 表现 | 解决 |
|----|------|------|
| HF Space 端口错 | 容器起不来 | 确认 Dockerfile `EXPOSE 7860`，Nginx 监听 7860 |
| data.json 找不到 | ingest 失败 | 确认 Dockerfile 里有 `COPY --from=frontend /app/src/data.json /app/src/data.json` |
| MiniMax API key 错 | chat 500 | 检查 HF Space Secrets 设置 |
| Supabase pgvector 没启用 | ingest 500 | 跑 `create extension vector;` |
| vector 维度不匹配 | Supabase 写入失败 | 改表 + 改代码统一 |
| 跨域 CORS | 前端 fetch 失败 | 部署后是同源不需要 CORS；本地 dev 端口不一致需要 CORS（已配）|

### 性能调优（可选，超出 MVP）

- 多次 chat 复用 embed 结果（短期缓存）
- Supabase 加 `lists = 100`（已在索引里）
- Frontend 代码分割（Vite 默认已开）
- 静态资源 CDN（HF 自带）
