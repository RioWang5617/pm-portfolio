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
    slug: 'prd-generator',
    title: 'AI PRD 生成器',
    subtitle: '一句话需求 → AI 多轮追问 → 生成 19 章节完整 PRD',
    year: '2025',
    stack: ['Coze', 'Markdown', 'Claude'],
    tags: ['Agent 工作流', 'B 端工具'],
    cover: 'from-indigo-600/80 via-violet-500/60 to-purple-400/40',
    image: '/images/prototypes/prd-generator-01-input.png',
    motivation: '很多产品经理写 PRD 的时候不知道从哪开始，尤其是新人。PRD 的格式和结构因人而异，新人不知道哪些章节是必须的。核心矛盾不是"不会写"，是"没想清楚就开始写"。',
    build: '基于 Coze 搭建多轮对话 Agent：输入一句话需求 → 意图识别 → 3-5 轮结构化追问 → 分 19 个章节生成 PRD → 质量检查 → 输出完整文档。',
    whatILearned: 'Prompt 工程的核心不是"让 AI 写得更多"，是"让 AI 帮你想得更清楚"。追问策略的设计比生成策略更重要。',
    customPage: true,
  },
  {
    slug: 'contract-reviewer',
    title: 'AI 合同审查助手',
    subtitle: '上传合同文档，AI 逐条审查风险并生成可视化报告',
    year: '2025',
    stack: ['Python', 'Claude', 'Dify', 'FastAPI'],
    tags: ['法律 AI', 'B 端工具'],
    cover: 'from-blue-600/80 via-cyan-500/60 to-teal-400/40',
    image: '/images/prototypes/01-home.png',
    motivation: '帮朋友审合同的时候发现大多数人签合同根本不看条款。企业法务同样痛苦，一份 50-80 页的供应商合同人工审查需要半天到一天，审查质量完全依赖个人经验。',
    build: '上传合同 → AI 识别类型 → 条款拆分 → 逐条风险审查 → 合规比对（可选） → 生成可视化风险报告。支持 PDF/Word/图片，集成企业 OA 审批流程。',
    whatILearned: '法律 AI 必须"有据可依"——纯粹靠大模型自由发挥做法律判断是危险的，必须结合法律知识库 RAG，让每个风险判断都引用具体法条。',
    customPage: true,
  },
  {
    slug: 'resume-optimizer',
    title: 'AI 简历优化器',
    subtitle: '上传简历 PDF，AI 以招聘方视角逐段诊断并给出优化建议',
    year: '2025',
    stack: ['Dify', 'PDF.js', 'Claude'],
    tags: ['文档分析', '求职'],
    cover: 'from-emerald-600/80 via-teal-500/60 to-cyan-400/40',
    image: '/images/prototypes/resume-optimizer-01-upload.png',
    motivation: '帮朋友改简历时发现大多数人根本不知道自己简历的问题在哪。HR 平均只花 6 秒扫一份简历，如果前 3 秒没看到亮点，直接下一个。市面上的工具大多是模板填充型，真正缺的是招聘方视角的逆向审查。',
    build: '基于 Dify 工作流：PDF 上传 → PDF.js 解析 → 结构化分段 → Claude 逐段评分（用词精准度/数据量化/STAR 法则） → 生成优化建议和改写示例。',
    whatILearned: '简历优化的核心不是"写得好"，是"让 HR 3 秒内看到亮点"。AI 最大的价值不是帮用户美化文字，而是站在招聘方视角做逆向审查。',
    customPage: true,
  },
  {
    slug: 'competitor-radar',
    title: 'AI 竞品分析雷达',
    subtitle: '输入产品名，自动爬取多源数据生成可视化雷达图对比报告',
    year: '2025',
    stack: ['Python', 'Claude', 'Chart.js'],
    tags: ['数据爬取', '竞品分析'],
    cover: 'from-violet-600/80 via-purple-500/60 to-fuchsia-400/40',
    image: '/images/prototypes/competitor-radar-01-search.png',
    motivation: '每次做竞品分析都要手动翻官网、看应用商店、搜新闻、刷社媒——信息散落在四五个平台，光是收集整理就要花两三天。人工整理很难做到全面、客观、可对比。',
    build: '输入产品名 → 竞品推荐（行业图谱+相似度算法） → 并行爬取四大渠道（官网/应用商店/新闻/社媒） → Claude 结构化分析 → Chart.js 雷达图可视化 → 输出可分享报告。',
    whatILearned: '竞品分析的价值不在"收集信息"，在"发现差异"。自动化采集只是基础，AI 的核心价值是帮产品经理从海量信息中提炼出可决策的洞察。',
    customPage: true,
  },
  {
    slug: 'express-master',
    title: 'AI 快递大师',
    subtitle: '授权手机号，自动全网聚合所有快递状态',
    year: '2025',
    stack: ['Python', '快递100 API', '微信小程序'],
    tags: ['生活工具', '数据聚合'],
    cover: 'from-orange-600/80 via-amber-500/60 to-yellow-400/40',
    image: '/images/prototypes/express-master-01-auth.png',
    motivation: '淘宝买的衣服、京东买的数码、拼多多买的日用——四个平台四个 App，每次想找一个快递都要先回忆"这个是在哪买的"。不同快递公司"已签收"就有十几种表述方式。',
    build: '微信小程序授权手机号 → 快递100 API 全网查询 → AI 快递公司识别（准确率≥95%） → 状态语义标准化（统一为6种标准状态） → 聚合去重 → 按状态分类 → 到件自动提醒。',
    whatILearned: '产品差异化不是"能用"和"不能用"的区别，而是"能用"和"用得爽"的区别。AI 让状态标准化和智能去重成为可能，这才是真正的壁垒。',
    customPage: true,
  },
  {
    slug: 'ghost-clone',
    title: 'AI 招魂幡',
    subtitle: '导入微信聊天记录，AI 模仿某人说话风格跟你对话',
    year: '2025',
    stack: ['Python', 'Claude', '微信导出'],
    tags: ['情感 AI', 'NLP'],
    cover: 'from-rose-600/80 via-pink-500/60 to-red-400/40',
    image: '/images/prototypes/ghost-clone-01-chat-import.png',
    motivation: '通讯录里有些人，你们曾经无话不谈，后来却连"在吗"都说不出口。如果我能导入我们所有的聊天记录，让 AI 学会 TA 的说话方式，是不是就可以跟"TA"再聊一次？',
    build: '上传微信聊天记录 → NLP 解析双方身份 → 语言风格分析（词汇/句式/表情/节奏） → 构造风格化 Prompt → Claude 生成风格化对话 → 支持话题语料匹配和风格强度调节。',
    whatILearned: '微信聊天记录是一段关系的数字遗迹。AI 不是在"复活一个人"，而是在"保留一种说话方式"。情感产品的核心是尊重用户的情感需求，而不是技术炫技。',
    customPage: true,
  },
  {
    slug: 'weekly-report',
    title: 'AI 周报生成器',
    subtitle: '连接 Git + 日历，自动生成管理层可读的周报草稿',
    year: '2025',
    stack: ['Python', 'GitHub API', 'Claude'],
    tags: ['效率工具', '数据汇总'],
    cover: 'from-teal-600/80 via-cyan-500/60 to-sky-400/40',
    image: '/images/prototypes/weekly-report-01-overview.png',
    motivation: '每周五下午最痛苦的事就是写周报。明明做了很多事情，但坐在电脑前就是想不起来这周到底干了啥。写周报的痛苦不在于"写"，而在于"回忆"。',
    build: '连接 GitHub API（代码提交+PR）+ 日历 API（会议安排） → AI 汇总本周数据 → 自动生成"本周完成/下周计划/需要支持"三段式结构 → 一键复制到企业微信/飞书。',
    whatILearned: '写周报的本质不是记录，而是汇报。老板不关心你修了几个 bug，想知道"这周产出了什么""下周要做什么""有什么需要帮忙的"。结构化输出比内容量更重要。',
    customPage: true,
  },
  {
    slug: 'interview-cluster',
    title: '爬虫状态监控 + 热点资讯推送',
    subtitle: '打通 Webhook/飞书/Outlook 的实时监控与自动化触达系统',
    year: '2025',
    stack: ['Python', 'Webhook', '飞书', 'Outlook'],
    tags: ['监控系统', '信息推送'],
    cover: 'from-sky-600/80 via-blue-500/60 to-indigo-400/40',
    image: '/images/prototypes/crawler-monitor-01-tasks.png',
    motivation: '销售团队需要实时监控竞品动态、客户行业热点和市场变化，但实际操作中大家要么靠人工刷新闻，要么等同事转发——信息严重滞后。某竞品悄悄上线了高度相似的功能，我们整整三天后才从客户口中得知。',
    build: '爬虫定时抓取（竞品官网/行业门户/招投标/政策法规） → AI 智能摘要+相关度评分+实体识别 → 多渠道推送（飞书群机器人/Outlook邮件/Webhook） → 支持每日汇总和即时告警。',
    whatILearned: '工具的价值不在"功能多"，在"时机对"。凌晨推送的资讯没人看，改成每天早 9 点半发到飞书群，打开率从 12% 升到 67%。推送时机比内容质量更影响触达效果。',
    customPage: true,
  },
  {
    slug: 'interview-analyzer',
    title: 'AI 用户访谈分析器',
    subtitle: '上传访谈文字稿，自动提取痛点和洞察',
    year: '2025',
    stack: ['Dify', 'NLP', 'Python'],
    tags: ['用户研究', '数据分析'],
    cover: 'from-amber-600/80 via-orange-500/60 to-red-400/40',
    image: '/images/prototypes/interview-analyzer-01-list.png',
    motivation: '做用户访谈后手动整理 5 个小时的录音文字稿太痛苦了。一次深度访谈转写文字通常长达 2-4 万字，人工阅读、标记、分类至少需要 3-5 小时，且容易遗漏关键信息。',
    build: '上传访谈文字稿（TXT/DOCX/PDF） → 文本预处理+说话人识别 → Dify 工作流：主题聚类（痛点/需求/情绪/场景） → 关键洞察提取+原话引用 → 用户画像卡片+需求优先级矩阵。',
    whatILearned: '用研分析的核心不是"摘要"，而是"结构化的洞察提取"。AI 直接总结访谈内容总是"正确的废话"——需要按主题聚类、附带原话引用、输出可量化的优先级。',
    customPage: true,
  },
]
