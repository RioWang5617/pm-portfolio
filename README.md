---
title: PM Portfolio — 王天阳个人作品集
emoji: 🚀
colorFrom: gray
colorTo: indigo
sdk: static
pinned: true
license: mit
---

# PM Portfolio — 王天阳个人作品集

> AI 产品经理王天阳的个人作品集。纯前端 React SPA，部署在 Hugging Face Spaces（Static）。

## 功能

- 🏠 **首页** — 全屏居中 Landing，浮动光斑背景
- 📂 **Works** — 作品案例展示（卡片 + 滚动动画）
- 🎨 **Vibecoding** — AI Demo 展示（交替方向 + 入场动画）
- 👤 **About** — 个人介绍 + 简历 PDF 在线浏览
- → **AI 对话** — 前端直连 MiniMax API，SSE 流式响应
- 🎨 **三套主题** — Warm / Light / Dark，localStorage 持久化
- → 响应式适配

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS + CSS Variables |
| 路由 | React Router 6 |
| LLM | MiniMax（前端直连，SSE） |
| 部署 | Hugging Face Spaces（Static） |

## 本地开发

```bash
cp .env.example .env.local   # 填入 VITE_MINIMAX_API_KEY
npm install
npm run dev                  # http://localhost:5173
```

## 环境变量

| 变量名 | 说明 |
|---|---|
| `VITE_MINIMAX_API_KEY` | MiniMax API Key（AI 对话必需） |
| `VITE_MINIMAX_API_BASE` | API Base，默认 `https://api.minimaxi.com/v1` |
| `VITE_MINIMAX_CHAT_MODEL` | 模型名，默认 `MiniMax-M3` |

## 部署

HF Space 使用 **Static SDK**（不是 Docker），直接 serve 仓库根目录的 `index.html` 和同目录静态文件。

```bash
npm install
npm run build                                # 生成 dist/
rm -rf assets                                # 清理旧的构建产物
cp dist/index.html ./index.html             # 拷贝到根目录
cp -r dist/assets/ ./assets/
rm -rf dist
git add -A
git commit -m "deploy"
git push origin main      # GitHub
git push hf main          # HuggingFace Space
```

**线上地址**：[https://qq1833411196-jianli.hf.space](https://qq1833411196-jianli.hf.space)

## 目录结构

```
pm-portfolio/
├── index.html              # SPA 入口（构建产物）
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── vitest.config.ts
├── public/                 # 静态资源（vite build 时拷贝到根目录）
│   ├── favicon.svg
│   ├── avatar.png          # AI 替身头像
│   ├── resume.pdf          # 简历 PDF
│   └── images/             # 案例封面图
├── src/
│   ├── main.tsx
│   ├── App.tsx             # 路由表
│   ├── index.css           # Tailwind + 主题变量
│   ├── components/         # UI 组件
│   ├── data/               # 静态数据（works / vibecoding / profile / cases）
│   ├── hooks/              # useChat / useTheme / useInView
│   ├── lib/                # minimax API client
│   ├── pages/              # 路由页面
│   └── test/
├── assets/                 # vite build 产物（部署期拷贝到根目录）
├── dist/                   # vite build 临时输出
└── README.md
```

## 主题

CSS 变量定义在 `src/index.css` `:root` 上，通过 `src/hooks/useTheme.ts` 在三套主题间切换。所有颜色都通过 `--*-rgb` 变量 + `rgba()` 组合 Tailwind class 实现，**避免** modern `rgb(... / alpha)` 语法（与 Tailwind 兼容性差，会回退成透明）。