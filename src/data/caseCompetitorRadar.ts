import type { CaseStudyData } from '../pages/CaseStudyPage'

const caseData: CaseStudyData = {
  slug: 'competitor-radar',
  title: 'AI 竞品分析雷达',
  subtitle: '输入产品名，自动爬取信息生成竞品对比报告',
  description: '自动爬取多源竞品数据并生成可视化雷达图，帮助产品团队快速发现差异与机会。',
  year: '2025',
  stack: ['Python', 'Claude', 'Chart.js'],
  coverImage: '/images/prototypes/competitor-radar-01-search.png',

  coverQuote: '「竞品分析的价值不在"收集信息"，在"发现差异"。」',

  motivation: {
    paragraphs: [
      '每次做竞品分析都要手动翻官网、看应用商店、搜新闻、刷社媒——信息散落在四五个平台，光是<strong>收集整理就要花两三天</strong>，等报告做完，竞品可能又更新了一轮。',
      '更痛苦的是，好不容易收集到的数据往往是"信息碎片"：官网说的功能和实际体验不一样，应用商店评分看不出具体差在哪里，新闻报道只讲大事件不讲产品细节。<strong>人工整理很难做到全面、客观、可对比</strong>。',
      '所以我做了这个工具——输入一个产品名，系统自动爬取竞品的官网功能列表、应用商店评分评论、行业新闻动态、社媒用户反馈，然后用 Claude 做结构化分析，最后用 Chart.js 生成多维雷达图。<strong>把原本需要数天的竞品调研压缩到分钟级</strong>，让产品经理把精力从"收集信息"转移到"发现差异"和"做出决策"。',
    ],
    highlights: [
      {
        icon: 'satellite',
        title: '自动采集',
        desc: '自动爬取官网、应用商店、新闻、社媒四大渠道，一次输入覆盖全网信息源',
      },
      {
        icon: 'chart',
        title: '多维对比',
        desc: '6+ 维度雷达图可视化对比，功能、体验、定价、技术、市场、生态差异一目了然',
      },
      {
        icon: 'link',
        title: '可分享报告',
        desc: '一键导出 PDF 或生成在线报告链接，团队协作和汇报零门槛',
      },
    ],
  },

  architecture: {
    description:
      '系统采用<strong>五层架构</strong>：展示层负责报告呈现和分享，接入层处理鉴权和任务调度，核心服务层驱动产品识别、爬虫调度、AI 分析和报告生成，数据采集层并行爬取四大渠道数据，AI 能力层基于 Claude 完成结构化分析和情感判断。数据流从采集层向上汇聚，经核心服务层处理后在展示层呈现。',
    layers: [
      {
        title: '展示层',
        items: ['Web 应用 · 竞品分析主入口', '报告分享页 · 在线报告查看', 'API 接口 · 数据集成出口', '监控看板 · 竞品动态追踪'],
        color: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/30',
      },
      {
        title: '核心服务层',
        items: ['产品识别引擎 · 名称匹配与行业分类', '竞品推荐引擎 · 行业图谱与相似度算法', '爬虫调度中心 · 多源数据采集协调', '报告生成器 · PDF 与在线报告组装'],
        color: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30',
      },
      {
        title: '数据采集层',
        items: ['官网爬虫 · 功能列表/定价/团队', '应用商店爬虫 · 评分/评论/排名', '新闻爬虫 · 行业媒体/科技新闻', '社媒爬虫 · 微博/Twitter/公众号'],
        color: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
      },
      {
        title: 'AI 能力层',
        items: ['Claude 大模型 · 结构化分析与结论生成', '情感分析 · 评论/新闻情感分类', '关键词提取 · 高频词与话题聚类'],
        color: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
      },
      {
        title: '数据层',
        items: ['产品数据库 · 产品画像与竞品关系', '爬取数据存储 · 原始数据与清洗后数据', '报告存储 · 分析报告与雷达图快照', '缓存层 · Redis 热点数据'],
        color: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
      },
    ],
  },

  featureModules: [
    {
      icon: 'globe',
      title: '竞品数据采集',
      desc: '自动爬取官网、应用商店、新闻、社媒等多源信息，形成竞品画像。',
      features: ['官网功能爬取', '应用商店评分抓取', '新闻舆情采集', '社媒评论分析'],
    },
    {
      icon: 'brain',
      title: 'AI 结构化分析',
      desc: '用 Claude 将非结构化信息转化为多维评分、差异洞察和竞品对比结论。',
      features: ['功能矩阵生成', '情感分析', '关键词提取', '差异洞察归纳'],
    },
    {
      icon: 'chart',
      title: '雷达图可视化',
      desc: '将竞品在功能、体验、定价、技术等维度可视化，对比差异直观明了。',
      features: ['多维雷达图', '权重调整', '维度自定义', '交互标注'],
    },
    {
      icon: 'paperclip',
      title: '报告导出与分享',
      desc: '支持生成在线报告和 PDF，方便团队协作与结果汇报。',
      features: ['PDF 导出', '链接分享', '动态报告', '下载缓存'],
    },
  ],

  prototypes: [
    {
      label: '产品搜索页',
      desc: '输入产品名后展示竞品推荐和数据源覆盖情况。',
      image: '/images/prototypes/competitor-radar-01-search.png',
    },
    {
      label: '竞品雷达图页',
      desc: '展示多维雷达图对比，并支持维度权重调整和差异解读。',
      image: '/images/prototypes/competitor-radar-02-radar.png',
    },
    {
      label: '分析报告页',
      desc: '结构化呈现竞品结论、差异洞察和可行动建议。',
      image: '/images/prototypes/competitor-radar-03-report.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：把竞品调研从“人工收集”转化为“自动化洞察”，让产品团队能够更快做出差异化决策。用户：产品经理、运营和策略团队。成功标准：调研时间缩短至 5 分钟、差异洞察命中率 ≥ 90%、团队复用率 ≥ 78%。',
  },

  metrics: [
    {
      icon: 'clock',
      label: '分析耗时',
      value: '5min',
      desc: '竞品分析从人工 2 天缩短到自动生成报告的 5 分钟。',
    },
    {
      icon: 'globe',
      label: '信息覆盖度',
      value: '85%',
      desc: '自动采集覆盖 85% 以上核心竞品信息来源。',
    },
    {
      icon: 'users',
      label: '团队复用率',
      value: '78%',
      desc: '报告在团队内部复用率达到 78%，提升沟通效率。',
    },
    {
      icon: 'target',
      label: '差异洞察命中率',
      value: '90%',
      desc: 'AI 识别出的关键差异洞察命中率高达 90%。',
    },
  ],

  flows: [
    {
      title: '竞品数据采集分析流程',
      description:
        '从用户输入产品名开始，系统自动识别产品、推荐竞品、并行爬取多源数据，最终由 Claude 完成结构化分析。',
      steps: [
        { label: '输入产品名', icon: 'search', sub: '名称/URL' },
        { label: '产品识别', icon: 'brain', sub: '行业分类' },
        { label: '竞品推荐', icon: 'sparkle', sub: '图谱匹配' },
        { label: '用户确认', icon: 'check', sub: '增删竞品' },
        { label: '并行爬取', icon: 'globe', sub: '四大渠道', accent: true },
        { label: '数据清洗', icon: 'filter', sub: '去重/标准化' },
        { label: 'AI 分析', icon: 'brain', sub: 'Claude 结构化', accent: true },
        { label: '生成报告', icon: 'file', sub: 'PDF/在线' },
      ],
    },
    {
      title: '雷达图生成流程',
      description:
        '将 AI 分析后的多维数据映射为雷达图，支持自定义维度和权重，让竞品差异可视化。',
      steps: [
        { label: '维度定义', icon: 'sliders', sub: '功能/体验/定价等' },
        { label: '数据映射', icon: 'database', sub: '评分标准化' },
        { label: '权重配置', icon: 'sliders', sub: '可自定义' },
        { label: 'Chart.js 渲染', icon: 'chart', sub: '多边形叠加', accent: true },
        { label: '交互标注', icon: 'target', sub: '悬停详情' },
        { label: '对比分析', icon: 'search', sub: '差异高亮' },
      ],
    },
  ],

  challenges: [
    {
      problem: '爬虫反爬和数据源不稳定',
      detail:
        '官网经常改版、应用商店有反爬机制、社媒接口频繁变更，导致爬虫经常失效，数据采集成功率一度只有 60%。',
      solution:
        '设计了"多策略降级"机制：主爬虫失败后自动切换备用方案（API → 模拟浏览器 → 静态缓存），同时建立数据源健康度监控，异常自动告警，最终将采集成功率提升到 92%。',
    },
    {
      problem: '非结构化数据难以标准化对比',
      detail:
        '不同竞品的官网描述风格各异，应用商店评论质量参差不齐，新闻报道角度不同——直接对比就像拿苹果比橘子。',
      solution:
        '用 Claude 做"二次结构化"：先让 AI 从非结构化文本中提取统一维度的信息（如功能列表、定价模式、核心卖点），再映射到标准评分体系，确保对比的公平性和一致性。',
    },
    {
      problem: '雷达图维度评分的客观性',
      detail:
        '用户对"功能丰富度 7.2 分"这种评分天然不信任——分数是怎么来的？依据是什么？如果评分不透明，报告就没有说服力。',
      solution:
        '每个维度评分都附带"评分依据"：列出具体的数据来源和判断逻辑（如"功能丰富度 7.2：覆盖 12/15 项核心功能，缺少离线模式和多语言支持"），用户可以点击查看详细依据，也可以手动修正评分。',
    },
    {
      problem: '爬取数据的时效性管理',
      detail:
        '竞品信息变化很快——今天爬的数据下周可能就过期了，但频繁全量爬取既浪费资源又容易触发反爬。',
      solution:
        '实现"增量更新 + 智能刷新"策略：核心数据（如定价、版本）每日增量检查，低频数据（如功能列表）每周全量刷新，新闻和社媒通过 RSS/Webhook 实时订阅，大幅降低爬取成本。',
    },
    {
      problem: '报告导出的排版一致性',
      detail:
        'Chart.js 生成的雷达图在不同设备上渲染效果不一致，PDF 导出时中文字体缺失、图表错位，分享链接在微信内打开时样式异常。',
      solution:
        '采用"服务端渲染 + 截图"方案：雷达图在服务端用 Node Canvas 渲染为高清图片，PDF 用 Puppeteer 生成确保排版一致，分享页面做了微信内置浏览器的适配和降级处理。',
    },
  ],

  techStack: [
    { layer: '爬虫引擎', tech: 'Python + Scrapy + Playwright', reason: 'Scrapy 处理静态页面高效，Playwright 应对 JS 渲染页面和反爬场景' },
    { layer: 'AI 分析', tech: 'Claude API', reason: '长文本理解能力强，结构化输出稳定，适合多维度竞品信息提取和分析' },
    { layer: '数据可视化', tech: 'Chart.js', reason: '轻量级图表库，雷达图渲染性能好，支持自定义样式和交互' },
    { layer: '后端服务', tech: 'FastAPI', reason: '异步高性能，原生支持并发爬取任务调度，自动生成 API 文档' },
    { layer: '数据存储', tech: 'PostgreSQL + Redis', reason: 'PostgreSQL 存储结构化产品和报告数据，Redis 缓存热点竞品信息和爬取状态' },
    { layer: '报告导出', tech: 'Puppeteer + Node Canvas', reason: '服务端渲染确保图表和排版一致性，PDF 导出质量可控' },
    { layer: '任务调度', tech: 'Celery + RabbitMQ', reason: '分布式任务队列，支持爬取任务的异步执行、重试和优先级调度' },
  ],

  insights: [
    {
      title: '信息收集是手段，差异洞察才是目的',
      desc: '做竞品分析最怕"为了收集而收集"——爬了一堆数据却不知道该看什么。真正有价值的是从数据中发现"别人有而我没有的"和"别人做得好而我做得差的"，这才是产品决策的依据。',
    },
    {
      title: '数据透明度决定报告可信度',
      desc: '用户不信评分，信评分背后的依据。每个结论都要有数据支撑，每个数据都要能追溯来源——这不是功能需求，是信任基础。',
    },
    {
      title: '自动化不是替代人工，是释放人工',
      desc: '爬虫和 AI 能替代的是"重复性信息收集"，替代不了的是"基于行业经验的判断"。工具的价值是让人把时间花在更高价值的思考上。',
    },
    {
      title: '竞品分析是持续的，不是一次性的',
      desc: '一份竞品报告的有效期可能只有一个月。产品迭代、市场变化、新玩家入局——竞品分析应该是"监控+告警"的持续过程，而不是"调研+报告"的一次性项目。',
    },
    {
      title: '可视化让讨论更高效',
      desc: '雷达图最大的价值不是"好看"，是"对齐认知"——团队成员对"我们比竞品差在哪"往往有不同看法，一张图就能让所有人站在同一个视角讨论。',
    },
  ],

  closingQuote: '「把收集信息的工作交给机器，把发现差异的智慧留给人。」',
}

export default caseData
