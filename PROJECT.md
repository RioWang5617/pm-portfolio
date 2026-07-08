# 项目说明文档

**项目名称**：王天阳个人作品集网站  
**线上地址**：https://qq1833411196-jianli.hf.space  
**技术栈**：React + Vite + FastAPI + Supabase + MiniMax + HF Spaces

---

## 一、代码结构

```
pm-portfolio/
├── Dockerfile              # 多阶段构建：Node构建前端 → Python运行
├── nginx.conf              # Nginx 配置（静态文件 + /api/ 反代）
├── package.json            # 前端依赖
├── index.html              # SPA 入口
│
├── backend/                # FastAPI 后端
│   ├── main.py             # 应用入口
│   ├── config.py           # 环境变量配置
│   ├── models.py           # Pydantic 数据模型
│   ├── api/
│   │   ├── chat.py         # POST /api/chat（AI 对话 SSE）
│   │   └── admin.py        # POST /api/admin/reindex（RAG 重建）
│   ├── lib/
│   │   ├── minimax.py      # MiniMax LLM/Embedding 客户端
│   │   ├── supabase.py     # Supabase REST 客户端
│   │   └── pdf.py          # PDF 文本提取
│   └── rag/
│       ├── chunker.py      # 文本切块
│       ├── sources.py      # 数据源处理
│       ├── ingest.py       # RAG 入库
│       ├── retriever.py    # 向量检索
│       └── prompts.py      # AI 人格 prompt
│
├── src/                    # React 前端
│   ├── main.tsx            # 入口
│   ├── App.tsx             # 路由表
│   ├── components/         # UI 组件
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── ResumeViewer.tsx    # PDF.js 渲染简历
│   │   ├── ChatPanel.tsx       # AI 对话面板
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ...
│   ├── pages/              # 页面
│   │   ├── Home.tsx        # 首页
│   │   ├── Works.tsx       # 作品列表
│   │   ├── CaseStudy.tsx   # 作品详情
│   │   ├── Vibecoding.tsx  # Demo 列表
│   │   ├── Demo.tsx        # Demo 详情
│   │   └── About.tsx       # 关于 + 简历
│   ├── data/               # 静态数据
│   │   ├── profile.ts      # 个人信息
│   │   ├── works.ts        # 作品数据
│   │   └── vibecoding.ts   # Demo 数据
│   └── hooks/              # 自定义 hooks
│       ├── useChat.ts
│       ├── useChatHistory.ts
│       └── useStreaming.ts
│
├── scripts/
│   └── start.sh            # 容器启动脚本（uvicorn + nginx）
│
└── tests/                  # 后端测试
    └── *.py
```

---

## 二、部署到 Hugging Face Spaces

### 推送流程

```bash
# 1. 配置 HF remote（只需一次）
git remote add hf https://qq1833411196:<YOUR_HF_TOKEN>@huggingface.co/spaces/qq1833411196/jianli

# 2. 推送代码（自动触发构建）
git push hf main

# 3. 等待构建完成（约 5-10 分钟）
# 查看构建日志：https://huggingface.co/spaces/qq1833411196/jianli → Logs tab
```

### HF Space 工作原理

1. **推送代码** → HF 自动检测 `Dockerfile` → 触发 Docker 构建
2. **Docker 多阶段构建**：
   - Stage 1（Node 22）：`pnpm install` → `pnpm build` → 生成 `dist/`
   - Stage 2（Python 3.11）：安装依赖 → 复制前端 → 启动 uvicorn + nginx
3. **运行**：HF 提供 16GB 内存 / 2vCPU，监听 7860 端口，分配免费子域名

---

## 三、用到的服务和账号密码

### 1. Hugging Face（部署平台）

| 项目 | 值 |
|---|---|
| 网址 | https://huggingface.co |
| 用户名 | `qq1833411196` |
| 邮箱 | `wy1833411196@gmail.com` |
| 密码 | `Aa11235617.` |
| Access Token | `<YOUR_HF_TOKEN>` |
| Space 名称 | `qq1833411196/jianli` |
| 线上地址 | https://qq1833411196-jianli.hf.space |

### 2. Supabase（数据库 + 存储）

| 项目 | 值 |
|---|---|
| 网址 | https://supabase.com/dashboard |
| 邮箱 | `wy1833411196@gmail.com` |
| 密码 | `Aa11235617.` |
| Project URL | `https://ivlrszbwekymbydhnlre.supabase.co` |
| Anon Key | `sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa` |
| Storage Bucket | `resume`（公开） |
| 简历文件 | `wang-tianyang-resume.pdf` |

### 3. MiniMax（AI 模型）

| 项目 | 值 |
|---|---|
| 网址 | https://platform.minimaxi.com |
| API Base | `https://api.minimaxi.com/v1` |
| API Key | `sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw` |
| Chat 模型 | `MiniMax-M3` |
| Embedding 模型 | `embo-01`（1536 维） |

### 4. 环境变量（backend/.env）

```bash
SUPABASE_URL=https://ivlrszbwekymbydhnlre.supabase.co
SUPABASE_KEY=sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa
MINIMAX_API_KEY=sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw
MINIMAX_API_BASE=https://api.minimaxi.com/v1
MINIMAX_CHAT_MODEL=MiniMax-M3
MINIMAX_EMBED_MODEL=embo-01
ADMIN_TOKEN=change-me-to-random-string
```

**注意**：HF Space 线上环境变量通过 Settings → Variables and secrets 配置，不通过 `.env` 文件。

---

## 四、核心功能

### 1. 个人简历展示
- PDF.js 渲染简历为可滚动图片
- 支持移动端适配

### 2. AI 对话助手
- 基于 RAG（检索增强生成）
- 向量化知识库（Supabase pgvector）
- 流式响应（SSE）

### 3. 作品/Case Study 展示
- 6 个页面路由
- 响应式设计

---

## 五、本地开发

```bash
# 安装依赖
pnpm install

# 启动前端（http://localhost:5173）
pnpm dev

# 启动后端（新终端，http://localhost:8000）
cd backend && source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000

# RAG 知识库入库
curl -X POST -H "X-Admin-Token: change-me-to-random-string" http://localhost:8000/api/admin/reindex
```

---

## 六、更新简历

1. 上传新 PDF 到 Supabase Storage：
   - 访问 https://supabase.com/dashboard → Storage → `resume` bucket
   - 上传文件（英文命名）

2. 触发 RAG 重建：
   ```bash
   curl -X POST -H "X-Admin-Token: change-me-to-random-string" https://qq1833411196-jianli.hf.space/api/admin/reindex
   ```

---

**文档更新时间**：2026-07-08
**作者**：王天阳
