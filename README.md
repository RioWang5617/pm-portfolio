# PM Portfolio

AI 产品经理求职网站。Stripe Press 编辑式风格。

## 启动

```bash
pnpm install
pnpm dev
```

打开 http://localhost:5173

## 你需要替换的内容

全部在 `src/data/` 下：

- **profile.ts** — 姓名、邮箱、社交链接、能力标签、自我介绍
- **works.ts** — 3 个案例（已写示例，按"背景→问题→过程→结果→复盘"结构替换）
- **vibecoding.ts** — 2 个 demo（替换成你自己的真实项目）

## 放上你的简历 PDF

把 PDF 放到 `public/resume.pdf`，然后在 `src/pages/Resume.tsx` 把下载按钮的链接从 `#` 改成 `/resume.pdf`。

## 部署

最简单：推到 GitHub → 用 Vercel 一键部署。
免费、几分钟搞定、自带域名。

## 设计说明

- 字体：Fraunces（衬线大标题）+ Inter（正文）+ JetBrains Mono（标签）
- 配色：奶油底 + 深墨字 + 一点朱砂红强调
- 风格参考：Stripe Press、Linear Changelog
- 动效：仅滚动渐入（CSS + IntersectionObserver）
