---
title: PM Portfolio
emoji: 📝
colorFrom: yellow
colorTo: red
sdk: docker
pinned: false
---

# PM Portfolio 个人站

AI 产品经理个人作品集。HF Spaces 单容器 = Nginx + uvicorn + FastAPI + React 静态文件。RAG over 简历 + 案例 + demo，基于 MiniMax M3。

## 本地开发

```bash
pnpm install
pnpm dev

# 另一个终端
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 数据准备

```bash
# 前端 data → JSON（供后端 ingest 用）
source backend/.venv/bin/activate
pip install demjson3
python3 backend/scripts/convert_ts_to_json.py
```

## 环境变量（HF Space Settings）

- `SUPABASE_URL` — Supabase 项目 URL
- `SUPABASE_KEY` — Supabase anon key
- `MINIMAX_API_KEY` — MiniMax API key
- `MINIMAX_API_BASE` — 默认 `https://api.minimaxi.com`
- `MINIMAX_CHAT_MODEL` — 默认 `MiniMax-M3`
- `MINIMAX_EMBED_MODEL` — 默认 `emb-01`
- `ADMIN_TOKEN` — 重索引用（与 GitHub Secret 一致）

## 一次性 Supabase 设置

见 `docs/setup-supabase.md`

## 触发重索引

```bash
curl -X POST https://your-space.hf.space/api/admin/reindex \
     -H "X-Admin-Token: $ADMIN_TOKEN"
```

或 push 改 `src/data/**` 触发 GitHub Action。
