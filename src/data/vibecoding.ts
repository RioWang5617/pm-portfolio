export type Demo = {
  slug: string
  title: string
  subtitle: string
  year: string
  stack: string[]
  effort: string
  tags: string[]
  cover: string
  // demo 页要写清的几件事
  motivation: string
  build: string
  whatILearned: string
  // 嵌入或外链
  liveUrl?: string
  sourceUrl?: string
  // 嵌入 iframe 的路径（如果有）
  embed?: string
}

// ⚠️ 下面是占位 demo
export const demos: Demo[] = [
  {
    slug: 'prd-reviewer',
    title: 'PRD 评审助手',
    subtitle: '上传一份 PRD，5 秒拿到结构化反馈',
    year: '2025',
    stack: ['Cursor', 'Claude Sonnet 4.5', 'Next.js', 'Vercel AI SDK'],
    effort: '周末 2 天',
    tags: ['AI 工作流', '提示词工程', 'B 端'],
    cover: 'from-[#0F0F0E] to-[#2A2520]',
    motivation:
      '我每次写完 PRD 都会怀疑"是不是漏了什么"。让 AI 当一个第一读者，可以发现错别字、缺失字段、模糊表述。它不是替代评审，是让人写得更扎实。',
    build:
      '前端用 Next.js + Tailwind，后端用 Vercel AI SDK + Claude API。Prompt 是关键——我设计了一个 4 阶段工作流：① 提取文档结构 ② 按 PRD 标准检查清单逐项打分 ③ 输出"高/中/低优先级"问题 ④ 给出改写建议。最难的是"评分一致性"——最后用 few-shot + rubric 解决了。',
    whatILearned:
      '提示词工程的核心不是"写得更巧"，是"定义得更清"。把"评分标准"写明白，比换一百种 prompt 模板都管用。',
    liveUrl: 'https://prd-reviewer-demo.vercel.app',
    sourceUrl: 'https://github.com/your-handle/prd-reviewer',
  },
  {
    slug: 'interview-cluster',
    title: '用户访谈聚类工具',
    subtitle: '把 20 段访谈录音转成"主题卡片墙"',
    year: '2025',
    stack: ['Claude API', 'Cursor', 'Whisper', 'React Flow'],
    effort: '3 个晚上',
    tags: ['用户研究', 'AI 工作流', '数据可视化'],
    cover: 'from-[#1A1A18] to-[#0F0F0E]',
    motivation:
      '做用户研究最痛苦的是"读 20 段访谈 → 提炼 8 个主题"。我把这个流程做成了一个工具。',
    build:
      '三步：① Whisper 转录音 → 文本 ② Claude 提取"痛点 / 情绪 / 引用片段" ③ React Flow 渲染成可拖拽的卡片墙。最后一步很关键：卡片之间可以连线表示"属于同一主题"，聚类由人做，AI 只做提取。',
    whatILearned:
      'AI 做"提取"，人做"聚类"——这条边界划对，工具才有价值。把聚类也交给 AI，看起来自动化高，但用户不再相信结果。',
    liveUrl: 'https://interview-cluster-demo.vercel.app',
    sourceUrl: 'https://github.com/your-handle/interview-cluster',
  },
]
