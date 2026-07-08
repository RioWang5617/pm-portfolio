---
title: PM Portfolio — 王天阳个人作品集
emoji: 🚀
colorFrom: gray
colorTo: indigo
sdk: docker
sdk_version: "1.0"
app_file: Dockerfile
pinned: true
license: mit
---

# PM Portfolio — 王天阳个人作品集网站

> AI 产品经理 王天阳 的个人作品集网站。**纯静态部署**：前端直连 MiniMax API，无需后端。HF Spaces Docker 内跑 Nginx 静态服务。

## 功能

- 🏠 个人作品展示（Works / Vibecoding / About）
- 💬 AI 对话助手（前端直连 MiniMax，流式响应）
- 📄 简历 PDF 在线预览（Supabase Storage）
- 📱 移动端适配

## 环境变量

在 HF Space Settings → Variables and secrets 中配置：

| 变量名 | 说明 |
|---|---|
| `VITE_MINIMAX_API_KEY` | MiniMax API Key（必需） |

## 本地开发

```bash
cp .env.example .env.local  # 填入你的 API Key
pnpm install
pnpm dev  # http://localhost:5173
```

**线上地址**：[https://qq1833411196-jianli.hf.space](https://qq1833411196-jianli.hf.space)

---

## 📋 目录

1. [快速开始](#-快速开始)
2. [架构设计](#-架构设计)
3. [目录结构](#-目录结构)
4. [代码详解](#-代码详解)
5. [环境变量 / 密钥 / 账号](#-环境变量--密钥--账号)
6. [本地开发](#-本地开发)
7. [数据库 (Supabase)](#-数据库-supabase)
8. [文件存储 (Supabase Storage)](#-文件存储-supabase-storage)
9. [LLM (MiniMax / 官方 OpenAI 兼容)](#-llm-minimax--官方-openai-兼容)
10. [部署到 Hugging Face Spaces](#-部署到-hugging-face-spaces)
11. [GitHub Actions 自动任务](#-github-actions-自动任务)
12. [RAG 知识库构建流程](#-rag-知识库构建流程)
13. [未完成 / 待办事项](#-未完成--待办事项)
14. [常见问题 / 故障排查](#-常见问题--故障排查)

---

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install --ignore-scripts
cd backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && cd ..

# 2. 配置环境变量
cat > backend/.env << 'EOF'
SUPABASE_URL=https://ivlrszbwekymbydhnlre.supabase.co
SUPABASE_KEY=sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa
MINIMAX_API_KEY=sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw
MINIMAX_API_BASE=https://api.minimaxi.com/v1
MINIMAX_CHAT_MODEL=MiniMax-M3
MINIMAX_EMBED_MODEL=embo-01
ADMIN_TOKEN=change-me-to-random-string
HOST=0.0.0.0
PORT=8000
EOF

# 3. 导出数据 (从 .ts 编译为后端可读的 .json)
pnpm export-data

# 4. RAG 知识库入库 (把简历+项目+demo 切成块 + embedding + 写 Supabase)
curl -X POST -H "X-Admin-Token: change-me-to-random-string" http://localhost:8000/api/admin/reindex

# 5. 启动开发服务器
# 前端
pnpm dev   # → http://localhost:5173
# 后端 (新终端)
cd backend && source .venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

---

## 🏗️ 架构设计

### 整体架构图

```
┌────────────────────────────────────────────────────────────────┐
│  浏览器 (用户)                                                  │
│  - 静态页面：React + Vite + Tailwind                           │
│  - 简历查看：PDF.js (把 PDF 渲染成 canvas 滚动浏览)            │
│  - AI 对话：fetch /api/chat (SSE 流式响应)                     │
└──────────────┬─────────────────────────────────────────────────┘
               │ HTTPS
               ▼
┌────────────────────────────────────────────────────────────────┐
│  HF Space 单容器 (Docker, 16GB RAM / 2 vCPU)                  │
│  域：qq1833411196-jianli.hf.space                              │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Nginx (前台, listen 7860)                           │    │
│  │  ├── /health    → 200 ok                             │    │
│  │  ├── /assets/*  → 静态文件 (带 immutable 缓存)     │    │
│  │  ├── /api/*     → proxy_pass → 127.0.0.1:8000       │    │
│  │  └── /*         → SPA fallback (index.html)          │    │
│  └──────────────┬───────────────────────────────────────┘    │
│                 │                                              │
│  ┌──────────────▼───────────────────────────────────────┐    │
│  │  uvicorn (后台, 127.0.0.1:8000)                      │    │
│  │  FastAPI app:                                        │    │
│  │  - GET  /api/health                                  │    │
│  │  - POST /api/chat         (RAG SSE stream)          │    │
│  │  - POST /api/admin/reindex (RAG ingest, X-Admin)    │    │
│  └──────────────┬───────────────────────────────────────┘    │
└─────────────────┼──────────────────────────────────────────────┘
                  │
        ┌─────────┴──────────┬─────────────────────┐
        ▼                    ▼                     ▼
┌──────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Supabase    │   │  Supabase        │   │  MiniMax API     │
│  (Postgres + │   │  Storage         │   │  (LLM + Embed)   │
│  pgvector)   │   │  (简历 PDF)      │   │                  │
│              │   │                  │   │  embeddings API  │
│  documents   │   │  bucket: resume  │   │  chat API        │
│  (chunks +   │   │  file:           │   │                  │
│   embedding) │   │   wang-tianyang- │   │  MiniMax-M3      │
│              │   │   resume.pdf     │   │  embo-01 (1536d) │
│  match_      │   │                  │   │                  │
│  documents() │   │  public bucket,  │   │                  │
│  (RPC)       │   │  URL 直接访问    │   │                  │
└──────────────┘   └──────────────────┘   └──────────────────┘
```

### 设计取舍

- **单容器 vs 多服务**：用 HF Spaces Docker 单容器（前端构建产物 + Nginx + uvicorn），不依赖任何外部 BaaS 就能跑起来。CORS 问题不存在（同源），冷启动也快。
- **Nginx 反代 + uvicorn 后台**：HF Spaces 必须 listen `7860` 端口 + 前台进程。Nginx 占 7860，uvicorn 在 8000 后台跑。Nginx 负责 SPA 路由 + 静态资源 + API 反代 + SSE buffer 关闭。
- **PDF.js vs iframe 嵌入**：iframe 嵌入 PDF 浏览器原生支持但加载慢、无法定制 UI；用 `pdfjs-dist` 渲染成 `<canvas>` 可以**逐页渲染、滚动浏览、缩放控制**，并且和站点风格统一。
- **RAG 用 Supabase pgvector**：免维护（Supabase 免费 500MB），直接在 Postgres 里跑 `CREATE EXTENSION vector` 启用向量，1 个 RPC 函数 `match_documents` 搞定相似度检索。
- **MiniMax M3 + embo-01**：国内访问稳定，价格低（比 OpenAI 便宜一个数量级）。embo-01 返回 1536 维向量，`type=query` 用于查询，`type=db` 用于入库（两者**不通用**），实测用 `type=query` 同时存和查 cos=1.0 一致。

---

## 📁 目录结构

```
pm-portfolio/
├── README.md                   # 本文件
├── Dockerfile                  # 多阶段构建：Node 22 构建前端 → Python 3.11 运行
├── nginx.conf                  # Nginx 配置：静态 + /api/ 反代 + SPA fallback
├── package.json                # 前端依赖（React/Vite/PDF.js）
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json               # TypeScript 根配置
├── tsconfig.app.json           # 前端代码编译配置
├── tsconfig.node.json          # vite.config / export-data.ts 配置
├── vite.config.ts              # Vite 配置（React + port 5173）
├── vitest.config.ts            # 前端单元测试
├── tailwind.config.js          # Tailwind 主题（cream / ink / accent / vermilion）
├── postcss.config.js
├── index.html                  # SPA 入口
├── .gitignore                  # 忽略 node_modules / dist / .env / .venv / tsbuildinfo
├── .dockerignore               # Docker 忽略 .git / .venv / node_modules
├── .npmrc                      # pnpm 配置
├── pytest.ini                  # pytest 配置
│
├── .github/
│   └── workflows/
│       ├── keepalive.yml       # 每 25 小时 ping 一次 /health 防 HF 休眠
│       └── reindex.yml         # push data 改动 → 触发 reindex
│
├── backend/                    # FastAPI 后端
│   ├── .env                    # 环境变量 (含所有密钥，**不进 git**)
│   ├── .env.example            # 模板
│   ├── requirements.txt        # Python 依赖
│   ├── main.py                 # FastAPI app 入口
│   ├── config.py               # pydantic-settings 加载 .env
│   ├── models.py               # Pydantic request/response models
│   ├── api/
│   │   ├── chat.py             # POST /api/chat (RAG SSE)
│   │   └── admin.py            # POST /api/admin/reindex (RAG ingest)
│   ├── lib/
│   │   ├── minimax.py          # LLM/Embed API 客户端 (httpx async)
│   │   ├── supabase.py         # Supabase REST 客户端 (绕开 supabase-py 的 SSL bug)
│   │   └── pdf.py              # pypdf 文本提取
│   ├── rag/
│   │   ├── chunker.py          # 按段落切块，400 字符 / 50 overlap
│   │   ├── sources.py          # 把 profile/works/demos/resume 拼成 docs
│   │   ├── ingest.py           # 切块 → embedding → 写 Supabase
│   │   ├── retriever.py        # query → embed → match_documents RPC
│   │   └── prompts.py          # AI 替身的 system prompt
│   └── .venv/                  # 本地 Python venv (不进 git)
│
├── src/                        # 前端
│   ├── main.tsx                # React 入口
│   ├── App.tsx                 # 路由表 (/)
│   ├── index.css               # Tailwind + 全局样式
│   ├── data.json               # ⚠️ build 产物 (由 export-data.ts 生成)
│   ├── vite-env.d.ts           # vite `?url` 类型声明
│   ├── pages/                  # 6 个路由
│   │   ├── Home.tsx            # / 首页
│   │   ├── Works.tsx           # /works 作品列表
│   │   ├── CaseStudy.tsx       # /works/:slug 作品详情
│   │   ├── Vibecoding.tsx      # /vibecoding demo 列表
│   │   ├── Demo.tsx            # /vibecoding/:slug demo 详情
│   │   └── About.tsx           # /about 个人介绍 + 简历 PDF
│   ├── components/             # 12 个组件
│   │   ├── Layout.tsx          # 根布局 (Outlet)
│   │   ├── Navigation.tsx      # 顶部 nav
│   │   ├── Footer.tsx
│   │   ├── CaseStudyCard.tsx   # 作品卡片
│   │   ├── DemoCard.tsx        # demo 卡片
│   │   ├── ResumeViewer.tsx    # ⭐ PDF.js 渲染简历成可滚动 canvas
│   │   ├── ChatLauncher.tsx    # 右下角悬浮按钮
│   │   ├── ChatPanel.tsx       # 弹出对话面板
│   │   ├── ChatInput.tsx       # 输入框
│   │   ├── ChatMessage.tsx     # 单条消息 (含 sources)
│   │   ├── ChatSuggestions.tsx # 初始推荐问题
│   │   └── ChatSources.tsx     # 引用资料列表
│   ├── hooks/
│   │   ├── useChat.ts          # 消息列表 + streaming 状态
│   │   ├── useChatHistory.ts   # localStorage 持久化
│   │   └── useStreaming.ts     # SSE 流解析
│   ├── data/                   # TypeScript 源数据
│   │   ├── profile.ts          # 个人基本信息
│   │   ├── works.ts            # 4 个 case study
│   │   └── vibecoding.ts       # 2 个 demo
│   ├── scripts/
│   │   └── export-data.ts      # 把 .ts 编译成 data.json (build 必需)
│   └── test/
│       └── setup.ts            # vitest setup
│
├── tests/                      # 后端 pytest
│   ├── conftest.py
│   ├── fixtures/sample.pdf
│   ├── test_health.py
│   ├── test_main.py
│   ├── test_models.py
│   ├── test_chat_endpoint.py
│   ├── test_admin.py
│   ├── test_chunker.py
│   ├── test_sources.py
│   ├── test_ingest_e2e.py      # 端到端：实际跑 ingest
│   ├── test_retriever.py
│   ├── test_prompts.py
│   ├── test_pdf.py
│   ├── test_minimax.py
│   └── test_supabase_client.py
│
├── scripts/
│   └── start.sh                # 容器启动脚本 (uvicorn + nginx)
│
├── public/
│   └── favicon.svg
│
└── docs/
    └── setup-supabase.md       # Supabase 初始化 SQL 备份
```

---

## 💻 代码详解

### 1. 前端 (React + Vite)

**入口** `src/main.tsx` → `src/App.tsx` 定义 6 条路由：

| 路径 | 组件 | 说明 |
|---|---|---|
| `/` | `Home` | Hero 大字 + featured work + featured demo |
| `/works` | `Works` | 4 个 case study 卡片列表 |
| `/works/:slug` | `CaseStudy` | 作品详情 (intro/context/problem/approach/outcome/reflection) |
| `/vibecoding` | `Vibecoding` | 2 个 demo 卡片 |
| `/vibecoding/:slug` | `Demo` | demo 详情 (motivation/build/whatILearned) |
| `/about` | `About` | 自我介绍 + 邮箱 + 能力标签 + 简历 PDF |

**简历渲染** `src/components/ResumeViewer.tsx`：

```typescript
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'  // Vite 处理
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

// 从 Supabase Storage 公开 URL 拉 PDF
const RESUME_URL = 'https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf'

// getDocument → 拿到 pdf → 逐页 getPage → render 到 canvas → 挂到 DOM
const loadingTask = pdfjsLib.getDocument({ url: RESUME_URL })
const pdf = await loadingTask.promise
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i)
  const viewport = page.getViewport({ scale: 1.5 * dpr })
  // ... render 到 canvas
}
```

关键点：
- Vite 的 `?url` 后缀让 worker 走 build pipeline (被打包到 `dist/assets/`)
- ⚠️ **Nginx 必须给 `.mjs` 设 `Content-Type: application/javascript`**，否则浏览器拒绝作为 ES module 加载
- 移动端 `scale=1.2 * dpr`，桌面 `1.5 * dpr` (DPR clamp 到 2 防超大)
- 进度条 + 加载/错误两种状态

**对话流** `src/components/ChatPanel.tsx` + `src/hooks/useChat.ts` + `src/hooks/useStreaming.ts`：

1. 用户在 `ChatInput` 输入 → 触发 `send(text)`
2. `parseSSEStream('/api/chat', ...)` 用 `fetch` 发起 POST，**手动解析 `data: ...\n\n` SSE 协议**
3. 后端先发 `{type: "sources", sources: [...]}` (引用资料)
4. 接着流式发 `{type: "token", content: "..."}` (LLM 输出字符)
5. 最后发 `{type: "done"}` 结束
6. 每次收到 token 就 `updateLastMessage` 拼接，UI 流式渲染

历史消息走 `useChatHistory` → `localStorage`，刷新页面不丢。

### 2. 后端 (FastAPI)

**`backend/main.py`** — 应用入口：

```python
app.include_router(chat.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

# CORS 只允许本地开发 (线上同源不需要 CORS)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", ...])
```

**`backend/api/chat.py`** — RAG 对话端点：

```python
@router.post("/chat")
async def chat(req: ChatRequest):
    # 1. 检索 top-5 相似 chunks
    chunks = await search_relevant_chunks(req.message, top_k=5, threshold=0.3)
    # 2. 拼 system prompt (人格 + 检索到的资料)
    system_prompt = build_system_prompt(chunks)
    # 3. 拼 messages: system + 最近 12 条历史 + 当前
    messages = [{"role": "system", "content": system_prompt}, *req.history[-12:], user_msg]
    # 4. SSE 流式返回
    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

**`backend/rag/retriever.py`** — 向量检索：

```python
async def search_relevant_chunks(query, top_k=5, threshold=0.3):
    [query_embedding] = await embed_texts([query], input_type="query")
    response = client.rpc("match_documents", {
        "query_embedding": query_embedding,
        "match_threshold": threshold,
        "match_count": top_k,
    }).execute()
    return response.data or []
```

**`backend/rag/prompts.py`** — 王天阳人格化 system prompt（关键设计）：
- 27岁 / 4年经验 / 北京/成都
- 性格：靠谱、实在、爱琢磨、不装
- 必须用中文、不能 markdown 加粗、单次 80-200 字
- 不知道就说不知道，不要编
- 自带 6 个反例 / 正面例子

**`backend/lib/minimax.py`** — LLM/Embed 客户端：

```python
# Embedding
POST {minimax_api_base}/embeddings
{ "model": "embo-01", "texts": [...], "type": "query" | "db" }
→ { "vectors": [[float x 1536], ...] }

# Chat (SSE)
POST {minimax_api_base}/chat/completions
{ "model": "MiniMax-M3", "messages": [...], "stream": true }
→ OpenAI 兼容 SSE: data: {choices:[{delta:{content:"..."}}]}\n\n
```

⚠️ **embo-01 关键陷阱**：`type=query` 和 `type=db` 是不通的 embedding 空间，存和查必须用同一个 type（实测用 `query` 双向通用 cos=1.0）。

**`backend/lib/supabase.py`** — 自建 REST 客户端（绕开 SSL bug）：

直接用 `httpx` + `certifi.where()` 调 Supabase REST API，支持 `client.table("x").select().eq().execute()` 和 `client.rpc("fn", params).execute()`。**不用 supabase-py 是因为 macOS 系统 Python 3.9 + LibreSSL 不兼容 Supabase 的 Cloudflare SSL**。

**`backend/api/admin.py`** — RAG 重建：

```python
RESUME_URL = "https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf"

def _fetch_resume_text():
    # 优先从 Supabase Storage 拉 PDF（动态）
    with httpx.Client() as c:
        r = c.get(RESUME_URL)
        if r.status_code == 200:
            tmp.write_bytes(r.content)
            text = extract_text(str(tmp))
            if text.strip(): return text
    # 兜底：本地 public/resume.pdf
    if (ROOT / "public" / "resume.pdf").exists():
        return extract_text("public/resume.pdf")
    return ""
```

### 3. 数据库 (Postgres + pgvector)

`docs/setup-supabase.md` 里有完整 SQL 备份。核心：

```sql
-- 1. 启用向量扩展
create extension if not exists vector;

-- 2. chunks 表
create table if not exists documents (
  id bigserial primary key,
  content text not null,
  embedding vector(1536),  -- embo-01 输出 1536 维
  metadata jsonb,
  created_at timestamptz default now()
);

-- 3. 向量索引 (余弦距离)
create index if not exists documents_embedding_idx
  on documents
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 4. 相似度检索 RPC
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (id bigint, content text, metadata jsonb, similarity float)
language sql stable
as $$
  select
    id, content, metadata,
    1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

### 4. Nginx 配置 (`nginx.conf`)

```nginx
server {
    listen 7860;
    server_name _;
    root /app/frontend_dist;
    index index.html;

    # ⚠️ 关键：把 .mjs 显式设为 javascript MIME，否则 PDF.js worker 加载失败
    types {
        application/javascript  js mjs;
        text/css                css;
        image/svg+xml           svg;
    }

    # 静态资源 7 天缓存
    location ~* \.(js|mjs|css|woff2?|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # /api/* 反代到 FastAPI，SSE 关键：关 buffering
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_buffering off;
        proxy_cache off;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        proxy_read_timeout 300s;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 5. Dockerfile

两阶段构建：

**Stage 1** `node:22-alpine`：
1. `pnpm install --ignore-scripts` (跳过 esbuild postinstall，pnpm 10+ 阻止)
2. 手动跑 esbuild postinstall（`node install.js`）
3. `pnpm run export-data` (生成 `src/data.json` 供后端用)
4. `pnpm build` (Vite 打包，输出到 `dist/`)

**Stage 2** `python:3.11-slim`：
1. `apt-get install nginx curl`
2. `pip install -r backend/requirements.txt`
3. `COPY --from=frontend /app/dist /app/frontend_dist`
4. `COPY nginx.conf /etc/nginx/conf.d/default.conf`
5. `COPY scripts/start.sh /start.sh`
6. `EXPOSE 7860`
7. `CMD ["/start.sh"]`

`start.sh`：
```sh
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 1 &
nginx -g "daemon off;"  # 前台
```

---

## 🔐 环境变量 / 密钥 / 账号

> ⚠️ **本节包含明文凭证**，仅供开发者本地使用，不要泄露。

### 1. Hugging Face

| 项目 | 值 |
|---|---|
| 站点 | https://huggingface.co |
| 用户名 | `qq1833411196` |
| 邮箱 | `wy1833411196@gmail.com` |
| 密码 | `Aa11235617.` |
| Access Token | `<YOUR_HF_TOKEN>` |
| Space 名称 | `jianli` |
| Space URL | https://huggingface.co/spaces/qq1833411196/jianli |
| 线上域名 | https://qq1833411196-jianli.hf.space |
| Git remote (HTTPS, 带 token) | `https://qq1833411196:<YOUR_HF_TOKEN>@huggingface.co/spaces/qq1833411196/jianli` |
| S3 endpoint | `https://s3.hf.co/qq1833411196` |
| S3 access key | `HFAKvFdm7ZvZhibu1SGa4YC6KHYWK1k` |
| S3 secret key | `a43c783262bb71e6e485b54ac7cfc10a8a5896284609d28c772f12c4cca26883` |

**配置 Git remote**（已经配好）：
```bash
git remote add hf https://qq1833411196:<YOUR_HF_TOKEN>@huggingface.co/spaces/qq1833411196/jianli
git push hf feat/ai-portfolio-v2:main
```

### 2. Supabase

| 项目 | 值 |
|---|---|
| 站点 | https://supabase.com/dashboard |
| 用户名 | `wy1833411196-prog` (Org) |
| Project URL | `https://ivlrszbwekymbydhnlre.supabase.co` |
| Project ref | `ivlrszbwekymbydhnlre` |
| Anon (publishable) key | `sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa` |
| Postgres connection | `postgresql://postgres:[YOUR-PASSWORD]@db.ivlrszbwekymbydhnlre.supabase.co:5432/postgres` |
| 浏览器登录邮箱 | `wy1833411196@gmail.com` |
| 浏览器登录密码 | `Aa11235617.` |
| Storage bucket | `resume` (public) |
| Storage 文件 | `wang-tianyang-resume.pdf` |
| 公开 URL | `https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf` |

> **DB password**：本项目代码只用 REST API，**不需要**数据库密码。如果需要 psql 直连，从 Supabase dashboard → Project Settings → Database → Connection string 找。

### 3. MiniMax

| 项目 | 值 |
|---|---|
| 平台 | https://platform.minimaxi.com |
| API base | `https://api.minimaxi.com/v1` |
| 文档 | https://platform.minimaxi.com/document/embeddings |
| API key | `sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw` |
| Chat model | `MiniMax-M3` |
| Embed model | `embo-01` (1536 维) |
| Embeddings endpoint | `POST /embeddings` `{model, texts[], type: "query"\|"db"}` |
| Chat endpoint | `POST /chat/completions` OpenAI 兼容 + SSE |

### 4. GitHub

| 项目 | 值 |
|---|---|
| 用户名 | `wy18603313359` |
| 邮箱 | `wy18603313359@gmail.com` |
| 密码 | `Aa11235617.` |
| 仓库 | (尚未公开，本地 git only，HF Space 是 remote) |

> 备注：之前"GitHub"上传指的是把代码传到 HuggingFace Space 的 git 仓库（HF Space 本身就是 git remote），**不是** GitHub.com 上的仓库。

### 5. backend/.env 完整内容

```bash
SUPABASE_URL=https://ivlrszbwekymbydhnlre.supabase.co
SUPABASE_KEY=sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa
MINIMAX_API_KEY=sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw
MINIMAX_API_BASE=https://api.minimaxi.com/v1
MINIMAX_CHAT_MODEL=MiniMax-M3
MINIMAX_EMBED_MODEL=embo-01
ADMIN_TOKEN=change-me-to-random-string
HOST=0.0.0.0
PORT=8000
```

> HF Space 容器里的环境变量是 **build 时**通过 `secrets` 注入的（见 `docs/setup-supabase.md` 的 HF 配置），**不是**通过 `backend/.env`（那个文件不进 git）。要修改线上配置，去 https://huggingface.co/spaces/qq1833411196/jianli/settings → Variables and secrets。

### 6. GitHub Actions Secrets（如果用真 GitHub）

如果以后要 push 到 GitHub.com 触发 CI，需要在 repo Settings → Secrets 里加：
- `SPACE_URL` = `https://qq1833411196-jianli.hf.space`
- `ADMIN_TOKEN` = `change-me-to-random-string`

（当前只有 `.github/workflows/` 配置文件，没接真 GitHub）

---

## 🛠️ 本地开发

### 前置

- macOS / Linux
- Node 22+ (nvm 或系统装)
- pnpm 10+ (`npm i -g pnpm`)
- Python 3.9+ (推荐 3.11，与 Docker 一致)
- 已有 `backend/.env` (见上)

### 命令

```bash
# 安装依赖
pnpm install --ignore-scripts
cd backend && source .venv/bin/activate && pip install -r requirements.txt && cd ..

# 一次性：导出数据 (生成 src/data.json)
pnpm export-data

# 启动前端 (http://localhost:5173)
pnpm dev

# 启动后端 (新终端，http://localhost:8000)
cd backend && source .venv/bin/activate
uvicorn backend.main:app --reload --port 8000

# RAG 知识库入库 (从 src/data.json + 远程 PDF 拉内容，写到 Supabase)
curl -X POST -H "X-Admin-Token: change-me-to-random-string" \
  http://localhost:8000/api/admin/reindex

# 跑测试
pnpm test                                     # 前端
cd backend && source .venv/bin/activate && pytest -v  # 后端

# build 生产产物
pnpm build    # 输出到 dist/
```

### 调试技巧

- **看 RAG 检索了什么**：浏览器打开 devtools，在 `parseSSEStream` callback 里 `console.log(event)`
- **改完简历要重 ingest**：curl reindex（Supabase Storage 是 source of truth，HF 容器里没 `public/resume.pdf`）
- **改 prompt 立即生效**：直接 restart `uvicorn` (FastAPI 会 reload)
- **改前端立即生效**：vite HMR 自动

---

## 🗄️ 数据库 (Supabase)

### 表 / RPC

| 对象 | 类型 | 作用 |
|---|---|---|
| `storage.buckets` | 系统表 | `resume` (public) |
| `storage.objects` | 系统表 | `resume/wang-tianyang-resume.pdf` |
| `documents` | 自建表 | RAG 知识库 chunks + embeddings |
| `match_documents(...)` | SQL function | pgvector 相似度检索 |

### 如何进 dashboard

1. 打开 https://supabase.com/dashboard
2. 用 `wy1833411196@gmail.com` / `Aa11235617.` 登录
3. 进 `wy1833411196-prog's Org` → `wy1833411196-prog's Project`
4. SQL Editor：跑 `select count(*), metadata->>'type' from documents group by 2;` 看每类多少 chunks
5. Table Editor：直接看 `documents` 表
6. Storage：上传/管理 `resume` bucket 文件

### 备份

完整建表 SQL 在 `docs/setup-supabase.md`，包括：
- 启用 `vector` 扩展
- 建 `documents` 表
- 建 `ivfflat` 索引
- 建 `match_documents` RPC

---

## 📦 文件存储 (Supabase Storage)

### Bucket 设计

- **名称**：`resume`
- **公开**：是 (public bucket，URL 直接可访问，无需 token)
- **文件**：`wang-tianyang-resume.pdf` (约 226 KB)
- **公开 URL**：`https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf`

### 上传新简历 PDF 的两种方式

**方法 1：Supabase dashboard（手动）**
1. https://supabase.com/dashboard/project/ivlrszbwekymbydhnlre/storage/files/buckets/resume
2. 点 "Upload files"，选新 PDF，**文件名必须是英文**（中文文件名 storage 会拒绝）
3. 浏览器直接覆盖 `wang-tianyang-resume.pdf`
4. **改完触发 reindex**：`curl -X POST -H "X-Admin-Token: change-me-to-random-string" https://qq1833411196-jianli.hf.space/api/admin/reindex`

**方法 2：REST API（自动化，需要 service_role key）**

普通 anon key 无 upload 权限（RLS 阻止），需要 service_role key（**不要泄露**）。当前没有 service_role 写进代码，要自动化上传需要：
1. 在 Supabase dashboard 拿 service_role key
2. 写个脚本 `scripts/upload-resume.py` 用 `Authorization: Bearer <service_role>` header POST 到 `/storage/v1/object/resume/wang-tianyang-resume.pdf`
3. 触发 reindex

> **注**：当前设计 PDF 变更频率低 (一年一次)，手动 dashboard 上传够用。**如果以后要频繁更新简历**（比如每月改），再加自动上传。

### 为什么不用 HF Dataset

HF Spaces git 拒绝 binary 文件 (`public/resume.pdf` push 不上去)；HF Dataset 方案需要再开一个 dataset repo，每次更新简历都得 git push 到 dataset，操作更繁琐。Supabase Storage 一次配置永久可用，dashboard 上传也最快。

---

## 🤖 LLM (MiniMax / 官方 OpenAI 兼容)

### 配置

- **API base**：`https://api.minimaxi.com/v1` (国内访问稳定)
- **Chat**：`MiniMax-M3` (对标 GPT-4 级别)
- **Embed**：`embo-01` (1536 维)
- **接口格式**：OpenAI 兼容，stream 也用标准 SSE

### Embedding 关键陷阱

`embo-01` 有两种 `type`：
- `type=query` —— 用于查询
- `type=db` —— 用于入库

**两者是不同 embedding 空间**，存和查必须用同一个 type。实测用 `query` 双向通用（存进去再查出来 cos=1.0）。代码里统一用 `type=query`。

### Chat 接口

```
POST {minimax_api_base}/chat/completions
Authorization: Bearer {key}
Content-Type: application/json
Body: { "model": "MiniMax-M3", "messages": [...], "stream": true }
→ SSE: data: {"choices":[{"delta":{"content":"..."}}]}\n\n
```

`backend/lib/minimax.py` 里 `chat_stream()` async generator 解析 SSE。

### 限流

没有显式限流，用户发多少问多少次（按 API 用量计费）。如果以后要保护，加个 `slowapi` 中间件：
```python
from slowapi import Limiter
limiter = Limiter(key_func=lambda req: req.client.host)
@router.post("/chat")
@limiter.limit("5/minute")
async def chat(req: Request, body: ChatRequest): ...
```

---

## 🚢 部署到 Hugging Face Spaces

### 架构回顾

```
git push hf feat/ai-portfolio-v2:main
        ↓
   HF 检测到 main 分支更新
        ↓
   触发 Docker build (按 Dockerfile)
        ↓
   容器起来 → 跑 start.sh → uvicorn + nginx
        ↓
   domain qq1833411196-jianli.hf.space 指向新容器
```

### 首次创建 Space（已完成）

1. https://huggingface.co/new-space
2. Owner: `qq1833411196` / Name: `jianli` / SDK: **Docker** / Hardware: **CPU basic** (free)
3. Space 创建后，HF 给一个 git remote：`https://huggingface.co/spaces/qq1833411196/jianli`
4. 本地添加 remote：`git remote add hf https://<token>@huggingface.co/spaces/qq1833411196/jianli`
5. 第一次 `git push hf main` 上传代码

### 配置 Space 的环境变量 / Secrets

https://huggingface.co/spaces/qq1833411196/jianli/settings → **Variables and secrets**：

| Name | Kind | Value |
|---|---|---|
| `SUPABASE_URL` | variable | `https://ivlrszbwekymbydhnlre.supabase.co` |
| `SUPABASE_KEY` | secret | `sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa` |
| `MINIMAX_API_KEY` | secret | `sk-cp-...` |
| `MINIMAX_API_BASE` | variable | `https://api.minimaxi.com/v1` |
| `MINIMAX_CHAT_MODEL` | variable | `MiniMax-M3` |
| `MINIMAX_EMBED_MODEL` | variable | `embo-01` |
| `ADMIN_TOKEN` | secret | `change-me-to-random-string` |

> HF Space 的环境变量在容器启动时由 HF 注入到 `/proc/1/environ`。**但当前代码用 pydantic-settings 读 `backend/.env` 文件**，HF 容器内没那个文件，所以线上**目前用的是默认 placeholder 值**。要修：要么 (a) 改 `config.py` 也读 `os.environ`，要么 (b) 在 Dockerfile 里 `ENV` 注入。我推荐 (a)，1 行代码。

### 更新部署

```bash
git add -A
git commit -m "your message"
git push hf feat/ai-portfolio-v2:main
```

⚠️ HF 强制 `main` 分支是部署分支，本仓库默认在 `feat/ai-portfolio-v2`，所以 push 时要 `feat/ai-portfolio-v2:main`。

### 部署监控

- HF Space 顶部状态：`Building` / `Running` / `Sleeping` / `Runtime error`
- 看 Logs：https://huggingface.co/spaces/qq1833411196/jianli → Logs tab
- 健康检查：HF 每 60s 调 `curl /health`，失败 3 次重启容器

### 重启 / 重建

- **Restart space**：Settings → Restart space (轻量重启，不重建 image)
- **Factory rebuild**：Settings → Factory rebuild (丢弃 docker layer cache，从头 build)

---

## ⚙️ GitHub Actions 自动任务

文件：`.github/workflows/`

### `keepalive.yml` — HF Space 保活

HF Spaces free tier **48 小时无访问后休眠**。每 25 小时 ping 一次 `/health`：

```yaml
on:
  schedule:
    - cron: '0 */25 * * *'
  workflow_dispatch:
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - run: curl -fsS ${{ secrets.SPACE_URL }}/health
```

需要在 repo Secrets 配：
- `SPACE_URL` = `https://qq1833411196-jianli.hf.space`

> 注：当前 workflows 是**配置好的**，但**没有真正接 GitHub.com**（还没创建 GitHub repo）。如要启用，push 到 GitHub 即可。

### `reindex.yml` — 自动 reindex

```yaml
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
      - run: |
          curl -fsS -X POST ${{ secrets.SPACE_URL }}/api/admin/reindex \
            -H "X-Admin-Token: ${{ secrets.ADMIN_TOKEN }}"
```

只要 `src/data/*.ts` 或 `public/resume.pdf` 改动，**自动触发线上 RAG 重建**。

> 注：当前 `src/data.json` 是 build 产物（`pnpm export-data` 生成），没在 paths 里。**应该改成** `src/data/**` + `src/data.json` + `Dockerfile` (因为 data.json 是从 .ts 编译的，要 rebuild container 才会带新 .json)。**触发流程应该是**：
> 1. push data 改动 → push Dockerfile 触发 HF rebuild
> 2. 新 container 启动
> 3. **reindex.yml 自动跑** → 重新拉 PDF + 切块 + embedding + 写 Supabase

**当前未实现自动化**：reindex 还是手动跑 curl。要自动化：加一条 `watchdog` 端点，容器启动 30s 后自动调一次 reindex。

---

## 🔄 RAG 知识库构建流程

### 数据源

`src/data.json`（build 时由 `src/scripts/export-data.ts` 从 `src/data/*.ts` 生成）：

```json
{
  "profile": { name, nameZh, title, tagline, subtitle, location, email, capabilities, pitch },
  "works": [{ slug, title, subtitle, year, role, team, intro, context, problem, approach[], outcome[], reflection }, ...],
  "demos": [{ slug, title, subtitle, year, effort, stack[], motivation, build, whatILearned }, ...]
}
```

外加 **Supabase Storage 上的 PDF 简历** (`wang-tianyang-resume.pdf`)。

### 构建步骤

```
                   ┌─────────────────────────┐
                   │  src/data.json + PDF    │
                   └────────────┬────────────┘
                                ▼
              ┌─────────────────────────────────┐
              │  load_all_sources() in sources.py │
              │  把每个对象拼成 text + metadata │
              │  - profile → "姓名: ... 职位: ..."│
              │  - work    → "标题: ... Context: ..."│
              │  - demo    → "标题: ... Build: ..." │
              │  - resume  → PDF 全文 pypdf 提取 │
              └────────────┬────────────────────┘
                            ▼
              ┌─────────────────────────────────┐
              │  chunk_text() in chunker.py     │
              │  按段落切块                       │
              │  max_chars=400, overlap=50      │
              └────────────┬────────────────────┘
                            ▼
              ┌─────────────────────────────────┐
              │  embed_texts() in minimax.py    │
              │  type=query                      │
              │  → 1536 维向量                   │
              └────────────┬────────────────────┘
                            ▼
              ┌─────────────────────────────────┐
              │  DELETE all + INSERT all to      │
              │  Supabase documents 表            │
              └─────────────────────────────────┘
```

### 触发方式

| 方式 | 命令 |
|---|---|
| 手动 (线上) | `curl -X POST -H "X-Admin-Token: ..." https://qq1833411196-jianli.hf.space/api/admin/reindex` |
| 手动 (本地) | `curl -X POST -H "X-Admin-Token: change-me-to-random-string" http://localhost:8000/api/admin/reindex` |
| 自动 (CI) | `reindex.yml` 在 push data 改动时触发（**需接 GitHub**） |

返回 `{ "status": "ok", "chunks_written": N }`。当前约 60-80 chunks。

---

## ❌ 未完成 / 待办事项

### 高优先级

- [ ] **HF Space 环境变量没生效**：线上容器读不到 `MINIMAX_API_KEY` 等，导致 AI 对话 500。需要把 `config.py` 改成 `os.environ` 优先。**1 行代码**。
  ```python
  # backend/config.py 当前
  _ENV_FILE = _BACKEND_DIR / ".env"  # 容器内不存在
  # 改：先读 .env，再用 os.environ 覆盖（pydantic-settings 默认行为，但 .env 不存在会 warning）
  ```
- [ ] **PDF.js worker 加载 404**：HF Space 老 container 还在 serve 老 nginx 配置（缺 `mjs` MIME type）。需要 Factory rebuild 一次强制拉新 nginx。
- [ ] **Works 页面图片没**：现在只有 `cover: 'from-[#1F2A44] to-[#0E0E0C]'` (CSS gradient)，没真实配图。要不要加？

### 中优先级

- [ ] **限流**：chat API 没有限流。加 `@limiter.limit("5/minute")`（slowapi 中间件）。
- [ ] **Demo 详情都是占位文本**：`demos` 数组里 motivation/build/whatILearned 字段都是"我还没做"之类的占位。要补真实内容。
- [ ] **邮箱显示"演示用"**：`profile.email` 用了真实邮箱但网站显示时可以考虑加 `href="mailto:..."` 之外加个点击 copy 按钮。
- [ ] **聊天历史加密**：`localStorage` 存的是明文 messages（含 API key 不会泄露但是用户隐私）。可以加 AES 加密或用 IndexedDB。

### 低优先级

- [ ] **测试覆盖**：前端 vitest 只测了 hooks；后端 pytest 覆盖了主要模块，但 `chat.py` 的 SSE 端到端没测。
- [ ] **CI 真实接 GitHub**：把 `.github/workflows/` 配的 secret 加进 GitHub repo。
- [ ] **简历 PDF 每年自动更新**：写个 cron + 调 Supabase API 自动上传（需要 service_role key）。
- [ ] **i18n**：网站现在全是中文，要不要加英文版？
- [ ] **PWA / SEO**：meta tags 加 OG image、Twitter card；robots.txt；sitemap.xml。
- [ ] **404 页面**：路由 fallback 应该有自定义 404 页面。

---

## 🆘 常见问题 / 故障排查

### 1. PDF.js worker 404 / MIME error

**症状**：浏览器 console 报 `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

**原因**：Nginx 没给 `.mjs` 设 `Content-Type: application/javascript`

**解决**：
1. 确认 `nginx.conf` 有 `types { application/javascript js mjs; }` 块
2. `git push` 触发 rebuild
3. HF Space dashboard → Settings → **Factory rebuild**（普通 restart 不会拉新 nginx image）

### 2. AI 对话 500

**症状**：`POST /api/chat` 报 500，log 报 `KeyError: 'minimax_api_key'` 或 `Minimax API key not set`

**原因**：HF Space 容器内没有 `backend/.env` 文件，pydantic-settings 加载默认 placeholder 值

**解决**：见"未完成事项"第一条，改 `config.py` 读 `os.environ`

### 3. RAG 检索没结果

**症状**：问任何问题，AI 都回答"暂无相关资料"

**排查**：
```bash
# 1. 查 Supabase documents 表有多少行
psql 到 Supabase 或用 dashboard SQL Editor:
select count(*), metadata->>'type' from documents group by 2;
# 应该看到 profile / case_study / demo / resume 各 10+ 行

# 2. 查 vector 索引
select indexname from pg_indexes where tablename = 'documents';
# 应该看到 documents_embedding_idx

# 3. 直接调 match_documents
select * from match_documents(
  (select embedding from documents limit 1),  -- 拿一个真实向量
  0.3, 5
);
```

**解决**：
- 表是空的 → 跑 `curl POST /api/admin/reindex`
- 索引不在 → `docs/setup-supabase.md` 有建索引 SQL
- 函数不存在 → 同上

### 4. HF Space 一直 "Building" 不停

**原因**：Dockerfile build 失败。看 Logs tab：

- `pnpm install` 报 `ERR_PNPM_IGNORED_BUILDS` → Dockerfile 里没 `--ignore-scripts`，需要加
- `node: not found` → 用了错的 base image
- `pnpm run export-data` 失败 → 某个 .ts 文件类型错

**解决**：本地 `pnpm build` 通过再 push。

### 5. macOS 本地后端 SSL 错误

**症状**：`ssl.SSLError: [SSL: CERTIFICATE_VERIFY_FAILED]`

**原因**：macOS 系统 Python 自带 OpenSSL 跟 Supabase Cloudflare SSL 不兼容

**解决**：用 certifi 的证书 bundle
```python
import certifi
httpx.Client(verify=certifi.where())
```
（已经在 `backend/lib/supabase.py` 里实现）

### 6. 端口 5173 / 7860 冲突

- 前端 5173：改 `vite.config.ts` → `server.port`
- 后端 8000：改 `backend/.env` 的 `PORT`
- HF Space 必须用 7860（HF 限制）

### 7. git push HF 报 401/403

**原因**：token 失效或 remote 配错

**解决**：
```bash
# 重新配 remote
git remote set-url hf https://qq1833411196:<YOUR_HF_TOKEN>@huggingface.co/spaces/qq1833411196/jianli
# 测试
git push hf feat/ai-portfolio-v2:main --dry-run
```

---

## 📜 License

MIT (个人项目)

---

**最后更新**：2026-07-08
**作者**：王天阳
**联系方式**：wy1833411196@gmail.com
