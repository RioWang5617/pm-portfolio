# 项目说明文档

**项目名称**：王天阳个人作品集网站
**线上地址**：https://qq1833411196-jianli.hf.space
**技术栈**：React + Vite + TypeScript + Tailwind + MiniMax + HuggingFace Spaces (Static)

---

## 一、代码结构

```
pm-portfolio/
├── index.html                  # SPA 入口（构建产物，commit 到 git）
├── assets/                     # vite build 产物（部署时拷贝到根目录）
├── package.json
├── vite.config.ts              # Vite 配置（含 MiniMax API key 注入）
├── tailwind.config.js          # 主题色板（page/ink/line/card-bg 等 CSS 变量）
├── postcss.config.js
├── tsconfig*.json
├── vitest.config.ts
├── public/                     # 静态资源
│   ├── favicon.svg
│   ├── avatar.png              # AI 替身头像
│   ├── resume.pdf              # 简历 PDF
│   └── images/                 # 案例封面图（SVG + PNG）
├── src/
│   ├── main.tsx                # React 入口
│   ├── App.tsx                 # 路由表
│   ├── index.css               # Tailwind + CSS 变量 + 动画
│   ├── components/             # 12 个 UI 组件
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── DemoCard.tsx
│   │   ├── ResumeViewer.tsx    # ⭐ PDF.js 渲染简历成可滚动 canvas
│   │   ├── ChatLauncher.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatSuggestions.tsx
│   │   └── ChatSources.tsx
│   ├── pages/                  # 6 个路由
│   │   ├── Home.tsx
│   │   ├── Works.tsx
│   │   ├── CaseStudy.tsx
│   │   ├── CaseStudyPage.tsx   # /works/:slug 作品详情
│   │   ├── Vibecoding.tsx
│   │   ├── Demo.tsx
│   │   ├── About.tsx
│   │   ├── PrdReviewer.tsx
│   │   └── IndexRedirect.tsx
│   ├── data/                   # TypeScript 源数据
│   │   ├── profile.ts
│   │   ├── works.ts
│   │   ├── vibecoding.ts
│   │   └── cases/              # 8 个原型设计 case data
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useChatHistory.ts
│   │   ├── useStreaming.ts
│   │   ├── useTheme.ts         # 三套主题切换 + CSS 变量
│   │   └── useInView.ts
│   ├── lib/
│   │   └── minimax.ts          # MiniMax Chat Completions SSE client
│   └── test/
│       └── setup.ts
├── README.md
├── PROJECT.md                  # 本文件
├── .env.example                # 环境变量模板
├── .gitignore
└── dist/                       # vite build 临时输出（不进 git）
```

---

## 二、技术决策

### 1. 为什么是纯前端 + HF Static？

- 没有后端依赖 → 部署成本最低（HF Static 完全免费）
- 数据全在 `.ts` 文件里 → 改文案不需要重建后端
- MiniMax API 允许前端直连 + CORS → 不用代理

### 2. 为什么不用 Docker SDK？

- Docker SDK 需要维护 Dockerfile + nginx.conf + start.sh，启动慢（冷启动 30s+），内存占用大
- Static SDK 部署即上传静态文件，零运行时开销
- 单页 React 应用天然适合 Static

### 3. 主题系统设计

```
useTheme.ts → 设置 document.documentElement.style 的 CSS 变量
   ↓
src/index.css :root 声明同名变量
   ↓
tailwind.config.js 用 rgba(var(--xxx-rgb), <alpha-value>) 引用
```

**坑点**：modern `rgb(var(--xxx-rgb) / <alpha-value>)` 语法跟逗号分隔的 `--xxx-rgb: 'r, g, b'` 变量不兼容（CSS 解析失败，回退到 `rgba(0,0,0,0)` 透明）。必须用 classic `rgba(var(--xxx-rgb), <alpha-value>)`。

### 4. PDF 简历渲染

- 用 `pdfjs-dist` 的 `?url` import 把 worker 打进 bundle
- `getDocument` → 逐页 `getPage` → 渲染到 `<canvas>`，支持缩放控制
- 桌面 `scale = 1.5 * dpr`，移动 `1.2 * dpr`（clamp 到 2 防 4K 屏过载）

### 5. AI 对话（SSE 流式）

- 用 `fetch` 直连 `https://api.minimaxi.com/v1/chat/completions`
- 手动解析 `data: {...}\n\n` SSE 协议
- 过滤 `minimax-m3` API key 欠费 / 模型下架等错误
- 历史消息走 `localStorage`，刷新不丢

---

## 三、本地开发

```bash
cp .env.example .env.local
# 填入 VITE_MINIMAX_API_KEY
npm install
npm run dev
# → http://localhost:5173
```

## 四、部署流程

```bash
npm install
npm run build
# 把 dist/* 拷贝到仓库根目录（除 resume.pdf 和 avatar.png 等已经存在的 public 文件）
cp dist/index.html ./index.html
cp -r dist/assets/ ./assets/
rm -rf dist

git add -A
git commit -m "deploy: <说明>"
git push origin main     # GitHub
git push hf main         # HuggingFace Space
```

HF Static SDK 会自动 serve 仓库根目录的所有文件。SPA 路由通过 `/index.html` fallback。

---

## 五、Git 远程

| Remote | URL |
|---|---|
| origin | https://github.com/RioWang5617/pm-portfolio.git |
| hf | https://huggingface.co/spaces/qq1833411196/jianli |

---

**文档更新时间**：2026-07-14
**作者**：王天阳