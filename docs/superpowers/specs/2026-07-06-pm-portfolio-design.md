# PM Portfolio 个人站设计 Spec

> 日期: 2026-07-06
> 状态: 已通过设计评审，待写实施计划

## 1. 概述

### 1.1 项目定位

**这是个人作品集网站，不是求职网站。** 主要承载两件事：

1. **Resume** — 一份编辑式图文简历
2. **Vibecoding** — 用 AI / Cursor 在周末/业余时间做的小 demo 集合

辅助承载：
- 3 篇产品案例长文（同时作为 AI 助理"我"的知识库）
- 一个可以跟"我"聊的 AI 助理（核心差异化）

### 1.2 目标用户

- 同行产品经理、技术 co-founder、潜在合作者
- 通过分享链接 / 搜索进入的陌生人
- 未来的自己（看作品、写简历）

### 1.3 成功标准

- 访客 30 秒内知道"这是谁的站、点哪里能看什么"
- AI 助理能基于真实作品回答 80%+ 的合理问题
- 全站加载 < 2s（Lighthouse Performance > 90）
- 月运营成本 < ¥30

## 2. 架构

### 2.1 整体架构图

```
浏览器
   │
   ▼
yourname-pm.hf.space（免费子域名）
   │
   ▼
HF Spaces Docker 容器（单容器全包）
├── Nginx（反向代理）
│   ├── /api/*  → uvicorn (8000) → FastAPI
│   └── /*      → React 静态文件（/app/frontend_dist）
├── 16GB RAM / 2 vCPU
├── 48 小时无访问后休眠
│
   │  HTTPS
   ├──→ Supabase（免费层，pgvector）
   │    └── documents(id, content, embedding, metadata)
   │
   └──→ MiniMax API
        ├── M3（chat）
        └── emb-...（embedding）
```

### 2.2 关键选型

| 决策 | 选择 | 理由 |
|------|------|------|
| 部署平台 | HF Spaces | 0 元；单容器全包；demo 全外链不需复杂部署 |
| 前端 | React 18 + Vite + TypeScript | 已有；不换 |
| 样式 | Tailwind CSS | 已有；不换 |
| 后端 | FastAPI（Python 3.11） | 用户钦定 |
| 反向代理 | Nginx | 容器内 |
| 向量库 | Supabase pgvector | 0 元 + 已有 Supabase 选型 |
| LLM | MiniMax M3 | 用户钦定 |
| Embedding | MiniMax emb-... | 同上 |
| 认证 | 无 | 公开站，不存访客身份 |
| 聊天历史 | 仅前端 localStorage | 不上服务器 |

## 3. 页面与导航

### 3.1 路由表

| 路径 | 页面 | 作用 |
|------|------|------|
| `/` | Home | 首页：自我介绍 + 三个亮点入口 |
| `/about` | About | 关于我：经历、兴趣、理念、联系方式 |
| `/works` | Works | 3 个产品案例（编辑式长文列表） |
| `/works/:slug` | CaseStudy | 单个案例详情 |
| `/vibecoding` | Vibecoding | 2-3 个 demo 卡片 |
| `/vibecoding/:slug` | Demo | demo 介绍 + 外链 |
| `/resume` | Resume | 自动渲染的图文简历 |

**全局：** 悬浮 AI 聊天按钮（全站右下角）。

### 3.2 导航顺序

`Home · Works · Vibecoding · Resume · About · 跟我聊`

按"访客认知路径"排序：作品强度 → 动手能力 → 履历 → 人。"跟我聊"放最后是 fallback 而非主菜。

### 3.3 各页核心

- **Home**：大标题 + 一句话定位 + 3 个推荐项（一个作品 / 一个 demo / "跟我聊聊"）+ 联系方式
- **About**：经历时间线 + 兴趣 + 理念 + 邮箱社交
- **Works 列表**：3 篇编辑式长文卡片（封面渐变 + 标题 + 副标题 + tags）
- **CaseStudy 详情**：intro → context → problem → approach → outcome → reflection
- **Vibecoding 列表**：2-3 个 demo 卡片（动机一句话 + stack + 用时）
- **Demo 详情**：动机 + 怎么做的 + 收获 + 大按钮"打开 demo →"（外链） + 源码链接
- **Resume**：顶部关键信息（姓名/职位/邮箱/位置） + 结构化渲染 + "下载 PDF"按钮

## 4. AI 助理"我"的具体设计

### 4.1 触发与 UI

- **入口 1**：全站悬浮按钮（右下角，呼吸动画）
- **入口 2**：导航栏"跟我聊"按钮
- **快捷键**：`Cmd/Ctrl + K` 全局唤起
- **响应式**：移动端铺满屏幕下方 70%

### 4.2 RAG 流程

```
访客输入
   │
   ▼
[前端] ChatPanel 发 POST /api/chat { message, history }
   │
   ▼
[FastAPI] /api/chat
   │
   ├── 1. 拼接 query（最近 6 轮对话 + 本次 message）
   │
   ├── 2. Embedding → 调 MiniMax embedding API
   │
   ├── 3. Supabase pgvector 检索 top-5 chunks
   │      (按相似度排序，过滤 < 0.65 阈值的)
   │
   ├── 4. 拼 System Prompt
   │
   ├── 5. 调 MiniMax M3 chat API（stream=true）
   │
   └── 6. SSE 流式返回给前端
   │
   ▼
[前端] ChatPanel 打字机显示
```

### 4.3 数据源

| 来源 | 类型 | 文档数 | 切块策略 |
|------|------|--------|----------|
| `src/data/profile.ts` | TS 数据 | 1 | 整段 |
| `src/data/resume.ts` | TS 数据 | 1 | 按 section |
| `src/data/works.ts` | TS 数据 | 3 篇 | 每篇按段落 |
| `src/data/vibecoding.ts` | TS 数据 | 2-3 个 | 每个按字段 |
| `public/resume.pdf` | PDF | 1 | 用 pypdf 提文本后按段 |
| **合计** | | **8-9** | 每块 ~400 字，重叠 50 |

### 4.4 System Prompt 模板

```
你是林越（Lin Yue）的 AI 替身。基于他的真实经历和作品回答访客问题。

# 参考资料（按相关度排序）：
[1] {chunk 1}
[2] {chunk 2}
...

# 行为规则：
- 只基于参考资料回答，不要编造
- 不知道就明确说"这个我没在作品里写过，建议直接联系林越"
- 保持中文，口语化
- 单次回答不超过 200 字
- 不杜撰数字、年份、公司名
```

### 4.5 Supabase 表结构

```sql
create table documents (
  id bigserial primary key,
  content text not null,
  embedding vector(1024),  -- 维度按 MiniMax embedding 实际值
  metadata jsonb,
  created_at timestamptz default now()
);

create index on documents using ivfflat (embedding vector_cosine_ops);
```

`metadata` 字段示例：

```json
{ "source": "works/ai-customer-support", "type": "case_study", "title": "..." }
```

### 4.6 切块策略

- 每块 400 字，重叠 50 字
- 按"段落边界"切（`\n\n` 优先），不切到句子中间
- 每块带 metadata：source / type / title

### 4.7 触发重索引

- **手动**：`python scripts/run_ingest.py`（本地）
- **自动**：GitHub Action 监听 `src/data/**` 变更，触发 `/api/admin/reindex`（带 `X-Admin-Token`）

### 4.8 UX 细节

| 设计点 | 做法 |
|--------|------|
| 首次打开 | 4 个推荐问题（如"你最近在做什么？" "AI Agent 项目里最难的决策是什么？"）|
| 流式响应 | SSE，打字机效果 |
| 显示来源 | 答案下方折叠区："📎 参考 2 段资料"，点开展示 chunk 原文 |
| 不知道 | "这个我没在作品里写过，建议直接联系林越" |
| 限流 | **完全放开**（用户 Token 多） |
| 历史 | 仅前端 localStorage 存最近 6 轮；不存服务器 |
| 快捷键 | `Cmd/Ctrl + K` 全局唤起 |
| 错误 | 网络错显示重试按钮；超时显示"林越没回应，要不要换个问法？" |

### 4.9 成本估算（月 1000 次聊天）

- Embedding：~0.1 元
- M3 chat：~10 元
- **总计：~10 元/月**

## 5. Resume 页设计（新增）

### 5.1 数据结构

新增 `src/data/resume.ts`：

```ts
export const resume = {
  basics: {
    name, nameZh, title, tagline,
    email, location, social: [...],
  },
  summary: '...',  // 2-3 句话
  experience: [
    {
      company, role, period, location,
      highlights: ['...', '...', '...'],
    },
  ],
  education: [
    { school, degree, period, notes? }
  ],
  skills: [
    { group: '产品', items: [...] },
    { group: 'AI', items: [...] },
  ],
  awards: ['...'],
  selectedProjects: ['ai-customer-support', '...'],  // 引 works.ts
}
```

### 5.2 页面布局

- **顶部 Hero**：大名字 + 副标题 + 联系方式 + 社交链接 + 右上"下载 PDF ↓"按钮
- **Summary**：2-3 句话自我介绍
- **Experience**：左侧时间线，3-5 段工作经历，bullets 列关键成就
- **Education**：学历
- **Skills**：分组标签（产品 / AI / 工具）
- **Selected Work**：从 works.ts 自动拉的精选项目

### 5.3 视觉风格

- 时间线：1px 细线 + 实心圆点，竖向节奏
- 大标题用 Fraunces 衬线，副标题 Inter，tags 用 JetBrains Mono
- 每个 section 顶部一条细分隔线（1px 横线 8 段模拟编辑式断行）
- 数字（67%、38% 等）大字号 + 朱砂色
- 滚动渐入（FadeIn 已有）
- 响应式：移动端时间线左 padding 缩到 24px

### 5.4 打印优化

- `@media print`：隐藏悬浮按钮、隐藏导航、链接去下划线、字号微调
- 用户可直接"打印 → 存为 PDF"
- 同时保留 `/public/resume.pdf` 供传统下载

## 6. Vibecoding / Demo 呈现

### 6.1 设计决策

**全外链模式**：

- Vibecoding 列表页只展示 demo 卡片
- Demo 详情页只展示文字介绍 + 大按钮"打开 demo →"（外链）
- 主站不内嵌 demo 本身，避免单点故障和技术栈分裂

### 6.2 DemoCard vs CaseStudyCard

**两个组件分开**（不复用）：

- `DemoCard`：标题 + 副标题 + stack + 用时 + 一句话动机 + tags
  - 视觉：更轻、卡片更小、带渐变 cover
  - 强调：实验性、动手能力
- `CaseStudyCard`：标题 + 副标题 + year + role + team + tags + 封面渐变
  - 视觉：更重、卡片更大、editorial 排版
  - 强调：思考深度、决策能力

### 6.3 Demo 详情页

- motivation / build / whatILearned 三个 section
- 大主按钮"打开 demo →"（外链 liveUrl）
- 源码链接
- 不内嵌 iframe
- 可选：截图（`<img>`）让卡片到详情有视觉延续

## 7. 组件清单

### 7.1 新增组件

- `ChatLauncher.tsx` — 悬浮按钮
- `ChatPanel.tsx` — 聊天窗口容器
- `ChatMessage.tsx` — 消息气泡
- `ChatInput.tsx` — 输入框（多行 + Cmd+Enter）
- `ChatSources.tsx` — 来源展开组件
- `ChatSuggestions.tsx` — 4 个推荐问题
- `DemoCard.tsx` — demo 卡片
- `CaseStudyCard.tsx` — 案例卡片
- `ResumeHeader.tsx` — 简历顶部信息
- `ResumePDF.tsx` — PDF 嵌入（按钮 + 下载链接）
- `MetaTable.tsx` — 元数据表

### 7.2 新增 Hooks

- `useChat.ts` — 聊天状态机
- `useStreaming.ts` — SSE 处理
- `useChatHistory.ts` — localStorage 持久化

### 7.3 工具

- `src/lib/api.ts` — fetch 封装
- `src/lib/chatStorage.ts` — localStorage helpers

### 7.4 复用现有

- Layout / Navigation / Footer
- 7 个 pages 的样式结构
- FadeIn 动效
- 字体（Fraunces + Inter + JetBrains Mono）
- 配色（cream + ink + vermilion）

### 7.5 需微调

- `App.tsx` 加 `<ChatProvider>` 和 `<ChatLauncher />`
- `Navigation.tsx` 加"跟我聊"按钮
- `Home.tsx` 加 AI 助理入口卡片
- `Demo.tsx` 把"在线 →"按钮强化为大主按钮

## 8. 文件结构

```
pm-portfolio/
├── src/
│   ├── components/
│   │   ├── [已有组件]
│   │   ├── ChatLauncher.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatSources.tsx
│   │   ├── ChatSuggestions.tsx
│   │   ├── DemoCard.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── ResumeHeader.tsx
│   │   ├── ResumePDF.tsx
│   │   └── MetaTable.tsx
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useStreaming.ts
│   │   └── useChatHistory.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── chatStorage.ts
│   ├── pages/                 [已有]
│   ├── data/
│   │   ├── profile.ts         [已有]
│   │   ├── works.ts           [已有]
│   │   ├── vibecoding.ts      [已有]
│   │   └── resume.ts          [新]
│   ├── App.tsx                [微调]
│   └── main.tsx
│
├── backend/                   [新增]
│   ├── main.py
│   ├── api/
│   │   ├── chat.py
│   │   └── admin.py
│   ├── rag/
│   │   ├── retriever.py
│   │   ├── prompts.py
│   │   └── ingest.py
│   ├── lib/
│   │   ├── supabase.py
│   │   ├── minimax.py
│   │   └── pdf.py
│   ├── scripts/
│   │   └── run_ingest.py
│   ├── requirements.txt
│   └── .env.example
│
├── nginx.conf                 [新]
├── Dockerfile                 [新] 多阶段构建
├── docker-compose.yml         [新] 本地调试
├── public/
│   └── resume.pdf
│
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-07-06-pm-portfolio-design.md
│
├── .github/workflows/
│   ├── reindex.yml            [新]
│   └── keepalive.yml          [新]
│
└── README.md
```

## 9. 部署

### 9.1 HF Spaces 自动部署

- 监听 GitHub repo，`push main` → 自动构建
- 读根级 Dockerfile
- 容器暴露 7860 端口

### 9.2 Dockerfile（多阶段）

```dockerfile
# Stage 1: 前端构建
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: 后端 + 运行
FROM python:3.11-slim
WORKDIR /app/backend
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
COPY --from=frontend /app/dist /app/frontend_dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY scripts/start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 7860
CMD ["/start.sh"]
```

### 9.3 Nginx 配置

```nginx
server {
    listen 7860;
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_buffering off;        # 支持 SSE
        proxy_cache off;
    }
    location / {
        root /app/frontend_dist;
        try_files $uri $uri/ /index.html;
    }
}
```

### 9.4 保活策略

```yaml
# .github/workflows/keepalive.yml
name: Keep Space Alive
on:
  schedule:
    - cron: '0 */25 * * *'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping
        run: curl -fsS ${{ secrets.SPACE_URL }}/health
```

### 9.5 重索引触发

```yaml
# .github/workflows/reindex.yml
name: Reindex
on:
  push:
    paths: ['src/data/**', 'public/resume.pdf']
jobs:
  reindex:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger
        run: |
          curl -X POST ${{ secrets.SPACE_URL }}/api/admin/reindex \
               -H "X-Admin-Token: ${{ secrets.ADMIN_TOKEN }}"
```

### 9.6 本地开发

```bash
# 终端 1: 前端
pnpm dev                      # :5173

# 终端 2: 后端
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload     # :8000

# 终端 3: 一次性导数据
cd backend
python scripts/run_ingest.py
```

`vite.config.ts` 加 proxy：`/api` → `http://localhost:8000`

### 9.7 环境变量

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=...
MINIMAX_API_KEY=...
ADMIN_TOKEN=...
MINIMAX_EMBED_MODEL=emb-...
MINIMAX_CHAT_MODEL=MiniMax-M3
```

## 10. 成本

| 项 | 月费用 | 备注 |
|----|--------|------|
| HF Spaces | ¥0 | 免费 CPU basic |
| Supabase | ¥0 | 500MB |
| MiniMax API | ~¥10-30 | 按聊天量 |
| 域名 | ¥0 | HF 子域名 / 或自购 |
| **总计** | **~¥10-30/月** | |

## 11. 已知风险

| 风险 | 缓解 |
|------|------|
| HF Spaces 48h 睡眠 | GitHub Actions 保活 |
| Supabase 7 天无活动暂停 | 保活同时 ping supabase |
| HF 免费层 CPU 慢 | 单用户用没问题 |
| MiniMax API 限流 | 限流已去；真被限再做缓存兜底 |
| 改了 data AI 不知道 | push 触发 reindex，30s 生效 |

## 12. 不做清单（YAGNI）

- 用户系统 / 登录
- 聊天历史服务器存储
- 评论 / 点赞
- RSS / Newsletter
- 多语言（先中文）
- 深色模式
- 站点搜索
- Analytics
- 聊天限流
- 站点内 demo 嵌入（全外链）
- FastAPI 之外的 Python 框架
- Vercel 等其他部署平台

## 13. 验收标准

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
