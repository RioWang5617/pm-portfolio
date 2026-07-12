export type Demo = {
  slug: string
  title: string
  subtitle: string
  year: string
  stack: string[]
  tags: string[]
  cover: string
  image?: string
  motivation: string
  build: string
  whatILearned: string
  liveUrl?: string
  sourceUrl?: string
  embed?: string
  customPage?: boolean
}

export const demos: Demo[] = [
  {
    slug: 'ghost-clone',
    title: 'AI 招魂幡',
    subtitle: '导入微信聊天记录，AI 模仿某人说话风格跟你对话',
    year: '2025',
    stack: ['Python', 'Claude', '微信导出'],
    tags: ['NLP', '趣味'],
    cover: 'from-[#1A0F1A] to-[#0E0E0E]',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    motivation:
      '想和已经不联系的老朋友"再聊一次"，但又不好意思真的发消息。',
    build:
      '微信聊天记录导出 → Python 解析某人的消息 → 提取高频用语、表情包习惯、句式特征 → Claude fine-tune 风格 prompt → 实现"跟 TA 风格一样的 AI"对话。',
    whatILearned:
      '说话风格是最难模仿的——"嗯嗯"和"嗯"和"嗯。"代表三种完全不同的情绪。AI 能学会用词，但很难学会"什么时候不用词"。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'express-master',
    title: 'AI 快递大师',
    subtitle: '授权手机号，自动全网聚合所有快递状态',
    year: '2025',
    stack: ['Python', '快递100 API', '微信小程序'],
    tags: ['聚合', '效率工具'],
    cover: 'from-[#1A1A2A] to-[#0E0E14]',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop',
    motivation:
      '淘宝、京东、拼多多、抖音买的快递分散在不同 App 里，经常漏收。',
    build:
      '授权手机号 → Python 调用快递100 API 全网查询 → 自动识别快递公司 + 聚合去重 → 按状态（待取件/运输中/已签收）分类展示 → 到件自动提醒。',
    whatILearned:
      '聚合类工具的核心壁垒不是"能查"，是"查得准"。不同快递公司的数据格式差异巨大，光是"已签收"就有十几种表述方式。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'prd-reviewer',
    title: 'AI 合同审查助手',
    subtitle: '上传一份合同，AI 自动识别风险条款并提出修改建议',
    year: '2025',
    stack: ['Dify', 'Claude', 'Python'],
    tags: ['Agent 工作流', '文档分析'],
    cover: 'from-[#0F0F0E] to-[#2A2520]',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    motivation:
      '在 AI CRM 项目里要做合同审查模块，顺手做了一个通用的 AI 合同审查工具。',
    build:
      '基于 Dify 设计审查工作流：合同上传 → OCR/PDF 解析 → 条款分类（金额/时限/违约责任/保密条款）→ AI 逐条分析风险等级 → 输出审查报告。',
    whatILearned:
      '法律领域对准确率要求极高——AI 只能"建议"不能"判断"。最终设计为"AI 标记风险 + 律师确认"流程，而不是全自动审查。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'interview-cluster',
    title: '爬虫状态监控 + 热点资讯推送',
    subtitle: '打通 Webhook/飞书/Outlook 的实时监控与自动化触达系统',
    year: '2025',
    stack: ['Python', 'Webhook', '飞书', 'Outlook'],
    tags: ['自动化', '工具链'],
    cover: 'from-[#1A1A18] to-[#0F0F0E]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    motivation:
      '在 AI CRM 项目中需要实时监控竞品动态和客户行业热点，手动查太慢。',
    build:
      '设计爬虫自动化监控 + 热点资讯推送系统，打通 Webhook / 飞书 / Outlook 三端触达，实现销售线索与业务数据的实时监控与自动化播报。',
    whatILearned:
      '工具的价值不在"功能多"，在"时机对"。凌晨推送的行业资讯没人看，改成每天早 9 点半发到飞书群，打开率从 12% 升到 67%。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'resume-optimizer',
    title: 'AI 简历优化器',
    subtitle: '上传简历，AI 逐段分析并给出优化建议',
    year: '2025',
    stack: ['Dify', 'PDF.js', 'Claude'],
    tags: ['文档分析', '求职'],
    cover: 'from-[#1E293B] to-[#0F172A]',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    motivation:
      '帮朋友改简历时发现大多数人不知道自己简历的问题在哪，想做一个自动诊断工具。',
    build:
      '基于 Dify 编排工作流：PDF 上传 → 结构化解析（教育/经历/技能）→ AI 逐段评分（用词精准度、数据量化、STAR 法则匹配度）→ 生成优化建议 + 改写示例。',
    whatILearned:
      '简历优化的核心不是"写得好"，是"让 HR 3 秒内看到亮点"。AI 最大的价值是站在招聘方视角做逆向审查，而不是帮用户"美化文字"。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'competitor-radar',
    title: 'AI 竞品分析雷达',
    subtitle: '输入产品名，自动爬取信息生成竞品对比报告',
    year: '2025',
    stack: ['Python', 'Claude', 'Chart.js'],
    tags: ['自动化', '数据分析'],
    cover: 'from-[#1A1F2E] to-[#0E0E14]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    motivation:
      '每次做竞品分析都要手动翻官网、看应用商店、搜新闻，太慢了。',
    build:
      'Python 爬虫自动抓取竞品官网功能列表、应用商店评分、新闻动态、社媒反馈 → Claude 结构化分析 → Chart.js 生成多维雷达图对比 → 输出可分享的竞品报告。',
    whatILearned:
      '竞品分析的价值不在"收集信息"，在"发现差异"。AI 擅长横向对比，但产品经理必须自己判断"这个差异重不重要"。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'prd-generator',
    title: 'AI PRD 生成器',
    subtitle: '一句话需求 → 自动生成完整 PRD 文档',
    year: '2025',
    stack: ['Coze', 'Markdown', 'Claude'],
    tags: ['Agent 工作流', 'B 端'],
    cover: 'from-[#2A2520] to-[#0F0F0E]',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    motivation:
      '很多产品经理写 PRD 的时候不知道从哪开始，尤其是新人。',
    build:
      '基于 Coze 搭建多轮对话 Agent：用户输入一句话需求 → AI 追问目标用户、核心场景、边界条件 → 自动生成完整 PRD（背景、用户故事、功能清单、交互流程、异常处理、数据埋点）。',
    whatILearned:
      'PRD 的价值不在"写得多"，在"想清楚"。AI 生成的 PRD 可以当 60 分的底稿，但产品经理必须自己补上业务判断和优先级排序。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'weekly-report',
    title: 'AI 周报生成器',
    subtitle: '连接 Git + 日历，自动生成周报草稿',
    year: '2025',
    stack: ['Python', 'GitHub API', 'Claude'],
    tags: ['自动化', '效率工具'],
    cover: 'from-[#1A2A1A] to-[#0E0E0C]',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    motivation:
      '每周五下午最痛苦的事就是写周报，明明做了很多但就是想不起来。',
    build:
      'Python 脚本自动拉取本周 GitHub commits + PR 记录 + 日历会议 → Claude 按"本周完成/下周计划/需要支持"结构化输出 → 生成可直接复制的周报草稿。',
    whatILearned:
      '周报的本质是"让老板知道你做了什么"，而不是"记录你做了什么"。AI 可以帮你回忆和组织，但"哪些事值得写"还是得自己判断。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
  {
    slug: 'interview-analyzer',
    title: 'AI 用户访谈分析器',
    subtitle: '上传访谈文字稿，自动提取痛点和洞察',
    year: '2025',
    stack: ['Dify', 'NLP', 'Python'],
    tags: ['用户研究', '数据分析'],
    cover: 'from-[#2A1F1A] to-[#0E0E0C]',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
    motivation:
      '做用户访谈后，手动整理 5 个小时的录音文字稿太痛苦了。',
    build:
      '基于 Dify 设计分析工作流：上传访谈文字稿 → AI 按主题聚类（痛点/需求/情绪/场景）→ 提取关键洞察 + 原话引用 → 生成用户画像卡片和需求优先级矩阵。',
    whatILearned:
      '用户访谈的金矿不在"用户说了什么"，在"用户没说什么"。AI 擅长提取显性信息，但隐性需求还是得靠产品经理自己的敏感度。',
    liveUrl: '',
    sourceUrl: '',
    customPage: true,
  },
]
