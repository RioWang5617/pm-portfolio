import type { CaseStudyData } from '../pages/CaseStudyPage'

const caseData: CaseStudyData = {
  slug: 'resume-optimizer',
  title: 'AI 简历优化器',
  subtitle: '上传简历，AI 逐段分析并给出优化建议',
  description: '通过 AI 逐段诊断简历问题，输出可执行优化建议，让简历在 3 秒内抓住 HR 目光。',
  year: '2025',
  stack: ['Dify', 'PDF.js', 'Claude'],
  coverImage: '/images/prototypes/resume-optimizer-01-upload.png',

  coverQuote: '简历优化的核心不是"写得好"，是"让 HR 3 秒内看到亮点"。',

  motivation: {
    paragraphs: [
      '帮朋友改简历时发现一个扎心的事实：<strong>大多数人根本不知道自己简历的问题在哪</strong>。他们觉得"写了就行"，却不知道 HR 平均只花 6 秒扫一份简历——如果前 3 秒没看到亮点，直接下一个。',
      '市面上的简历工具大多是<strong>模板填充型</strong>——给你好看的排版，但不告诉你内容哪里有问题。真正缺的不是"好看的简历"，而是<strong>站在招聘方视角的逆向审查</strong>：你的用词够精准吗？你的成果有量化吗？你的经历符合 STAR 法则吗？',
      '于是我想做一个不一样的工具：<strong>不是帮用户"美化文字"，而是像一个资深 HR 那样，逐段诊断简历的问题，给出具体可执行的优化建议和改写示例</strong>。用 AI 的能力，把"招聘方视角"这件事规模化。',
    ],
    highlights: [
      {
        icon: 'search',
        title: '智能诊断',
        desc: '从用词精准度、数据量化、STAR 法则等多维度逐段评分，精确定位问题',
      },
      {
        icon: 'star',
        title: 'STAR 法则',
        desc: '自动检测经历描述是否符合 Situation-Task-Action-Result 结构',
      },
      {
        icon: 'pencil',
        title: '改写示例',
        desc: '每条建议附带 AI 生成的改写示例，保留事实只优化表达，一键复制',
      },
    ],
  },

  architecture: {
    description:
      '整体采用 <strong>Dify 工作流编排</strong>架构，前端负责 PDF 上传与渲染，后端通过 Dify 调度多个 AI 节点完成结构化解析、逐段评分和优化建议生成。各模块通过工作流串联，支持独立迭代。',
    layers: [
      {
        title: '用户交互层',
        items: ['PDF 拖拽上传', '进度状态展示', '报告可视化', '改写对比面板'],
        color: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
      },
      {
        title: '前端解析层',
        items: ['PDF.js 文档解析', '文本分段提取', '结构化数据映射', '实时渲染预览'],
        color: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30',
      },
      {
        title: 'AI 工作流层（Dify）',
        items: ['简历结构化节点', '逐段评分节点', 'STAR 法则检测', '优化建议生成', '改写示例生成'],
        color: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30',
      },
      {
        title: '模型能力层',
        items: ['Claude 文本理解', '用词精准度分析', '数据量化检测', '语义改写生成'],
        color: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
      },
      {
        title: '数据与输出层',
        items: ['评分数据聚合', '报告 PDF 导出', '历史记录存储'],
        color: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
      },
    ],
  },

  featureModules: [
    {
      icon: 'upload',
      title: '简历上传与解析',
      desc: '支持 PDF 一键上传并自动解析简历结构，提取经历、教育、技能等模块。',
      features: ['PDF.js 解析', '文本分段提取', '结构化数据映射', '格式自动识别'],
    },
    {
      icon: 'search',
      title: '逐段评分引擎',
      desc: '对每段经历进行用词、量化、STAR 结构等多维度评分，精确定位问题。',
      features: ['用词精准度分析', '量化检验', 'STAR 结构检测', '语义评分'],
    },
    {
      icon: 'brain',
      title: '优化建议与改写',
      desc: '根据评分结果生成具体优化建议，并提供高保真改写示例。',
      features: ['问题识别', '改写示例生成', '可复制输出', '保留原始事实'],
    },
    {
      icon: 'chart',
      title: '报告可视化',
      desc: '将简历问题和改进点可视化展示，帮助用户快速理解优化方向。',
      features: ['雷达图评分', '问题卡片', '改写前后对比', '历史趋势'],
    },
  ],

  prototypes: [
    {
      label: '简历上传页',
      desc: '用户上传简历并查看解析进度，界面清晰引导操作。',
      image: '/images/prototypes/resume-optimizer-01-upload.png',
    },
    {
      label: '评分报告页',
      desc: '展示多维度评分结果和问题点，明确告知简历的弱项。',
      image: '/images/prototypes/resume-optimizer-02-report.png',
    },
    {
      label: '优化建议页',
      desc: '按段落展示具体建议和改写示例，支持一键复制。',
      image: '/images/prototypes/resume-optimizer-03-suggestions.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：让求职者快速找到简历中的结构性问题，显著提升简历通过率。用户：求职焦虑型白领、应届毕业生和职业转型者。成功标准：简历通过率提升 ≥ 35%、优化建议采纳率 ≥ 70%、工具复用率 ≥ 40%。',
  },

  metrics: [
    {
      icon: 'clock',
      label: '简历优化时间',
      value: '10min',
      desc: '从上传到生成优化建议的平均时间控制在 10 分钟内。',
    },
    {
      icon: 'chart',
      label: '简历通过率提升',
      value: '35%',
      desc: '优化后简历通过筛选的概率提升约 35%。',
    },
    {
      icon: 'check',
      label: '自动诊断覆盖',
      value: '95%',
      desc: '自动检测出 95% 以上常见简历问题，覆盖率高。',
    },
    {
      icon: 'star',
      label: '用户满意度',
      value: '4.8/5',
      desc: '基于用户反馈的工具满意度达到 4.8/5。',
    },
  ],

  flows: [
    {
      title: '简历分析评分流程',
      description: '从用户上传 PDF 到生成各维度评分的完整链路，确保每一段经历都被精准诊断。',
      steps: [
        { label: '上传简历', icon: 'upload', sub: 'PDF 拖拽/选择' },
        { label: 'PDF 解析', icon: 'file', sub: 'PDF.js 提取文本' },
        { label: '结构化分段', icon: 'layers', sub: '识别教育/经历/技能等模块' },
        { label: '逐段 AI 分析', icon: 'brain', sub: 'Claude 逐段诊断', accent: true },
        { label: '多维度评分', icon: 'sliders', sub: '用词/量化/STAR 等维度打分' },
        { label: '生成雷达图', icon: 'chart', sub: '可视化各维度得分' },
        { label: '输出评分报告', icon: 'check', sub: '总体评分 + 等级标签' },
      ],
    },
    {
      title: '优化建议生成流程',
      description: '基于评分结果，为每个问题点生成具体可执行的优化建议和改写示例。',
      steps: [
        { label: '接收评分结果', icon: 'search', sub: '读取各段评分数据' },
        { label: '问题优先级排序', icon: 'sliders', sub: '关键 > 重要 > 建议' },
        { label: '生成优化方向', icon: 'sparkle', sub: 'AI 提出改进思路' },
        { label: '生成改写示例', icon: 'pencil', sub: '保留事实，优化表达', accent: true },
        { label: '标注优化原则', icon: 'check', sub: 'STAR/量化/用词等标签' },
        { label: '组装优化报告', icon: 'clipboard', sub: '评分+建议+示例整合' },
      ],
    },
  ],

  challenges: [
    {
      problem: 'PDF 解析格式混乱',
      detail: '不同用户的简历排版差异巨大——有的用表格、有的用多栏、有的用文本框。PDF.js 提取的文本顺序经常错乱，导致分段不准确。',
      solution: '设计了"预解析 + 人工确认"机制：PDF.js 先提取原始文本，再通过 AI 做一次结构化纠错，最后让用户确认分段结果，准确率从 62% 提升到 94%。',
    },
    {
      problem: 'STAR 法则检测误判率高',
      detail: '早期版本用关键词匹配检测 STAR 结构，但很多用户的表述是隐含式的（比如"负责 XX 项目"暗示了 Situation），误判率高达 35%。',
      solution: '改用 Claude 做语义理解，设计 few-shot prompt 让模型识别隐含的 STAR 结构，并给出"显式化"建议。误判率降到 8%。',
    },
    {
      problem: '改写示例"过度美化"',
      detail: 'AI 生成的改写示例经常添加用户没有的经历或夸大数据，导致改写后的内容"看着好但不真实"。',
      solution: '在 prompt 中加入硬约束："改写必须基于用户原始经历的事实，仅优化表达方式，不得添加新事实或夸大数字"，并通过 few-shot 示例强化这一规则。',
    },
    {
      problem: '评分维度权重难统一',
      detail: '不同岗位对简历的要求不同——技术岗看重项目量化，设计岗看重作品集展示。统一的评分权重不够精准。',
      solution: '引入"目标岗位"功能，用户可选填岗位类型和 JD，系统根据岗位特性动态调整各维度权重。比如投技术岗时"数据量化"权重从 15% 提升到 25%。',
    },
    {
      problem: '长简历处理超时',
      detail: '部分用户的简历超过 3 页，逐段分析的 token 消耗大，单次处理超过 60 秒，用户体验差。',
      solution: '采用分段并行处理策略：将简历按模块拆分后并行调用 AI 分析，最后汇总结果。处理时间从 60s+ 降到 15-20s。',
    },
  ],

  techStack: [
    {
      layer: 'AI 工作流',
      tech: 'Dify',
      reason: '可视化编排多步 AI 流程，支持条件分支和并行节点，降低工作流迭代成本',
    },
    {
      layer: 'PDF 解析',
      tech: 'PDF.js',
      reason: '浏览器端解析 PDF，无需上传到服务器预处理，保护用户隐私',
    },
    {
      layer: 'AI 模型',
      tech: 'Claude',
      reason: '长上下文理解能力强，适合处理完整简历文本；改写生成质量高',
    },
    {
      layer: '前端框架',
      tech: 'React + TypeScript',
      reason: '组件化开发，类型安全，适合构建复杂的报告可视化界面',
    },
    {
      layer: '报告导出',
      tech: 'html2canvas + jsPDF',
      reason: '将可视化报告转为 PDF，支持自定义封面和格式',
    },
    {
      layer: '状态管理',
      tech: 'Zustand',
      reason: '轻量级状态管理，适合管理多步骤分析流程的中间状态',
    },
    {
      layer: '数据存储',
      tech: 'LocalStorage + IndexedDB',
      reason: '历史记录本地存储，无需后端服务，降低部署复杂度',
    },
  ],

  insights: [
    {
      title: 'AI 的价值是"视角转换"，不是"文字美化"',
      desc: '简历优化的核心痛点不是"写不出来"，而是"不知道招聘方想看什么"。AI 最大的价值是站在 HR/面试官的视角做逆向审查，这比帮用户润色文字有意义得多。',
    },
    {
      title: '结构化评分比自由文本反馈更有效',
      desc: '用户对"你的简历需要改进"这种模糊反馈无感，但对"数据量化维度得分 45/100"这种具体评分能立刻定位问题。量化本身就是一种沟通方式。',
    },
    {
      title: '改写示例必须"保留事实"，否则会反噬信任',
      desc: '用户最怕的不是"写得不好"，而是"改完之后不认识自己的简历了"。改写的核心原则是：事实不变，只优化表达。一旦用户发现 AI 编造了经历，整个工具的可信度归零。',
    },
    {
      title: '"目标岗位"是简历优化的关键变量',
      desc: '同一份简历投不同岗位，优化方向完全不同。加上"目标岗位"这个输入后，AI 的建议精准度提升了 40%，用户的采纳率从 32% 提升到 67%。',
    },
    {
      title: '工具类产品要让用户"做完就能走"',
      desc: '简历优化是低频需求，用户不会反复使用。设计上要让整个流程在 3 分钟内完成，报告一眼看懂，建议直接可执行。不要做社交、不要做社区——做完就走，才是好工具。',
    },
  ],

  closingQuote:
    '简历是求职者给世界的"第一印象"。AI 不能帮你写经历，但能帮你把经历讲得更清楚——让 HR 在 3 秒内看到你最亮的那个点。',
}

export default caseData
