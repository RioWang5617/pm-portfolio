import type { CaseStudyData } from '../pages/CaseStudyPage'

const caseData: CaseStudyData = {
  slug: 'interview-cluster',
  title: '爬虫状态监控 + 热点资讯推送',
  subtitle: '打通 Webhook/飞书/Outlook 的实时监控与自动化触达系统',
  description: '构建从爬虫采集到多端推送的自动化监控体系，让信息主动找到人而不是人去刷数据。',
  year: '2025',
  stack: ['Python', 'Webhook', '飞书', 'Outlook'],
  coverImage: '/images/prototypes/crawler-monitor-01-tasks.png',

  coverQuote:
    '「工具的价值不在"功能多"，在"时机对"——凌晨推送的资讯没人看，早 9 点半发到飞书群，打开率从 12% 升到 67%。」',

  motivation: {
    paragraphs: [
      '在 AI CRM 项目推进过程中，销售团队需要<strong>实时监控竞品动态、客户行业热点和市场变化</strong>。但实际操作中，大家要么靠人工刷新闻网站，要么等同事转发链接——信息严重滞后，等看到的时候商机已经过去了。',
      '最痛的一次：某竞品悄悄上线了一个和我们高度相似的功能，我们整整<strong>三天后</strong>才从客户口中得知。如果能早一天知道，那场竞标的打法完全不同。这让我意识到，信息的<strong>时效性</strong>本身就是一种竞争力。',
      '于是决定做一套自动化系统：爬虫定时抓取 → AI 智能摘要 → 多渠道推送。核心目标只有一个——<strong>让信息主动找到人，而不是人去找信息</strong>。',
    ],
    highlights: [
      {
        icon: 'satellite',
        title: '实时监控',
        desc: '支持 15 分钟 / 30 分钟 / 每小时 / 每天四档频率，竞品和行业动态第一时间捕获',
      },
      {
        icon: 'link',
        title: '多端触达',
        desc: '打通飞书群机器人、Outlook 邮件、自定义 Webhook 三端，确保信息到达率',
      },
      {
        icon: 'robot',
        title: '智能播报',
        desc: 'AI 自动摘要 + 相关度评分 + 实体识别，减少噪音、突出高价值信息',
      },
    ],
  },

  architecture: {
    description:
      '系统采用<strong>五层架构</strong>设计，从数据源采集到最终用户触达，每层职责清晰、可独立扩展。核心思路是"采集归采集、处理归处理、推送归推送"，避免耦合导致牵一发动全身。',
    layers: [
      {
        title: '数据源层',
        items: [
          '竞品官网 · 产品页 / 新闻页 / 博客',
          '行业门户 · 36氪 / 虎嗅 / 亿欧',
          '招投标平台 · 中国招标网 / 政府采购网',
          '政策法规 · 国务院 / 工信部',
        ],
        color: 'from-blue-950/40 to-blue-900/20',
        borderColor: 'border-blue-800/40',
      },
      {
        title: '采集层',
        items: [
          '爬虫调度器 · 任务队列 / 优先级 / 限流',
          '页面抓取器 · HTTP 请求 / Headless Browser',
          '内容解析器 · 正文提取 / 结构化输出',
          '去重引擎 · URL 去重 / 内容指纹去重',
        ],
        color: 'from-emerald-950/40 to-emerald-900/20',
        borderColor: 'border-emerald-800/40',
      },
      {
        title: 'AI 处理层',
        items: [
          '摘要引擎 · LLM 一句话摘要生成',
          '热点排序 · 相关度评分 / 热度计算',
          '实体识别 · 公司 / 人物 / 金额 / 日期',
          '内容分类 · 行业 / 事件类型自动分类',
        ],
        color: 'from-purple-950/40 to-purple-900/20',
        borderColor: 'border-purple-800/40',
      },
      {
        title: '推送层',
        items: [
          '飞书推送 · 群机器人 / 卡片消息 / 操作按钮',
          'Outlook 推送 · SMTP 邮件 / 模板渲染',
          'Webhook 推送 · 自定义回调 / 签名验证',
          '推送调度器 · 定时汇总 / 即时告警 / 投递追踪',
        ],
        color: 'from-amber-950/40 to-amber-900/20',
        borderColor: 'border-amber-800/40',
      },
      {
        title: '展示层',
        items: [
          '监控仪表盘 · 爬虫状态 / 健康度 / 趋势图',
          '资讯浏览页 · 列表 / 筛选 / 搜索 / 详情',
          '配置管理 · 监控源 / 推送通道 / 规则',
        ],
        color: 'from-rose-950/40 to-rose-900/20',
        borderColor: 'border-rose-800/40',
      },
    ],
  },

  featureModules: [
    {
      icon: 'globe',
      title: '爬虫采集管理',
      desc: '统一管理爬虫任务、频率、优先级和反爬策略，确保采集稳定。',
      features: ['任务调度', '限流与重试', '代理与 UA 轮换', '多源并行爬取'],
    },
    {
      icon: 'brain',
      title: 'AI 内容分析',
      desc: '对采集到的原始内容进行摘要、主题提取和相关度排序，减少噪音。',
      features: ['摘要生成', '热点排序', '实体识别', '内容分类'],
    },
    {
      icon: 'paperclip',
      title: '多端推送中心',
      desc: '将高价值资讯推送到飞书、Outlook 和自定义 Webhook，形成闭环触达。',
      features: ['飞书卡片推送', '邮件推送', 'Webhook 回调', '失败重试'],
    },
    {
      icon: 'chart',
      title: '监控与报告',
      desc: '实时监控爬虫与推送状态，提供可视化报告和异常告警。',
      features: ['爬虫健康仪表盘', '推送成功率统计', '异常告警', '历史回溯'],
    },
  ],

  prototypes: [
    {
      label: '爬虫任务面板',
      desc: '展示当前采集任务状态、频率和失败原因，支持一键重跑。',
      image: '/images/prototypes/crawler-monitor-01-tasks.png',
    },
    {
      label: '资讯推送配置',
      desc: '配置推送规则、渠道和过滤条件，确保信息准时到达目标人群。',
      image: '/images/prototypes/crawler-monitor-02-push-config.png',
    },
    {
      label: '监控仪表盘',
      desc: '实时展示爬虫健康、推送成功率和热点趋势，便于快速定位异常。',
      image: '/images/prototypes/crawler-monitor-03-dashboard.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：让营销和销售团队第一时间获知竞品与行业动态，提升信息敏捷度。用户：AI CRM 中的业务线负责人和竞品情报团队。成功标准：打开率 ≥ 67%、推送成功率 ≥ 92%、信息价值反馈 ≥ 80%。',
  },

  metrics: [
    {
      icon: 'clock',
      label: '监控响应时间',
      value: '5s',
      desc: '从异常发生到告警触达平均响应时间控制在 5 秒以内。',
    },
    {
      icon: 'send',
      label: '推送打开率',
      value: '67%',
      desc: '优化后飞书推送打开率从 12% 提升到 67%。',
    },
    {
      icon: 'globe',
      label: '爬虫成功率',
      value: '92%',
      desc: '多策略降级后，爬虫采集成功率提升到 92%。',
    },
    {
      icon: 'filter',
      label: '无效内容率',
      value: '18%',
      desc: 'AI 噪音过滤和内容分级后，无效推送内容比例下降到 18%。',
    },
  ],

  flows: [
    {
      title: '爬虫监控与采集流程',
      description:
        '从定时调度触发到内容入库的完整链路，包含限流、重试、去重等关键机制。',
      steps: [
        { label: '定时调度触发', icon: 'clock', sub: 'Cron / 手动触发' },
        { label: '任务入队列', icon: 'layers', sub: '按优先级排序' },
        { label: '频率限制检查', icon: 'filter', sub: '超限则排队等待' },
        { label: '页面抓取', icon: 'search', sub: 'HTTP / Headless Browser' },
        { label: '内容解析', icon: 'brain', sub: '正文提取 + 结构化' },
        { label: '去重检查', icon: 'target', sub: 'URL + 内容指纹', accent: true },
        { label: 'AI 处理管线', icon: 'sparkle', sub: '摘要 / 评分 / 实体识别' },
        { label: '内容入库', icon: 'database', sub: '触发推送判断' },
      ],
    },
    {
      title: '多端推送流程',
      description:
        '根据推送规则引擎判断目标通道，构建对应格式消息并投递，失败自动重试。',
      steps: [
        { label: '推送触发', icon: 'send', sub: '即时 / 定时汇总' },
        { label: '规则引擎匹配', icon: 'sliders', sub: '源 + 关键词 + 阈值' },
        { label: '通道判断', icon: 'target', sub: '飞书 / Outlook / Webhook' },
        { label: '消息构建', icon: 'layers', sub: '卡片 / HTML / JSON' },
        { label: '消息投递', icon: 'send', sub: 'API 调用 / SMTP / HTTP POST' },
        { label: '投递结果判断', icon: 'chart', sub: '成功记录 / 失败分类', accent: true },
        { label: '失败重试', icon: 'refresh', sub: '指数退避 · 最多 3 次' },
        { label: '统计更新', icon: 'chart', sub: '仪表盘实时刷新' },
      ],
    },
  ],

  challenges: [
    {
      problem: '反爬策略导致抓取频繁失败',
      detail:
        '部分竞品网站有严格的反爬机制：IP 频率限制、JavaScript 动态渲染、Cloudflare 拦截。初期直接用 requests 抓取，失败率高达 40%。',
      solution:
        '引入 Headless Browser（Playwright）处理 JS 渲染页面；搭建代理 IP 池 + UA 轮换池（50+ 常见 UA）；请求间隔随机化 2-10 秒。失败率从 40% 降到 5% 以内。',
    },
    {
      problem: '推送时间不对，打开率极低',
      detail:
        '最初系统抓到内容就立即推送，凌晨两三点的飞书消息根本没人看。统计下来整体打开率只有 12%。',
      solution:
        '设计"即时推送 + 定时汇总"双模式：高相关度资讯（≥70 分）即时推送，其余加入每日汇总队列，统一在早 9:30 推送到飞书群。打开率从 12% 升到 67%。',
    },
    {
      problem: '内容去重不精准，重复推送惹人烦',
      detail:
        '同一事件被不同媒体报道，URL 不同但内容高度相似，简单的 URL 去重无法过滤，导致飞书群里同一条新闻出现三四次。',
      solution:
        '采用"URL 去重 + 内容指纹去重"双重机制：先用 URL 快速过滤完全相同的页面，再对正文生成 SimHash 指纹，相似度 ≥ 85% 的内容自动合并为同一事件的不同来源。',
    },
    {
      problem: 'AI 摘要质量不稳定，偶尔产生幻觉',
      detail:
        'LLM 生成摘要时偶尔会"脑补"原文没有的信息，比如把"正在洽谈"说成"已经签约"，这在销售场景中是致命错误。',
      solution:
        '摘要 prompt 严格约束"只基于原文内容，不得添加原文未提及的信息"；增加置信度评分，低于阈值的摘要标记为"待人工确认"；建立摘要反馈机制，销售可标记"准确/有误"，反馈数据持续优化 prompt。',
    },
    {
      problem: '飞书 Webhook 限流导致批量推送失败',
      detail:
        '飞书自定义机器人有频率限制（每分钟 5 条），每日汇总推送 30+ 条资讯时触发限流，后半部分消息全部丢失。',
      solution:
        '设计推送队列 + 令牌桶限流：将待推送消息放入队列，按飞书限流规则控制发送速率（每分钟 4 条，留 1 条余量）；同时对汇总消息做卡片合并，单条卡片展示 5 条资讯，减少请求次数。',
    },
  ],

  techStack: [
    {
      layer: '爬虫引擎',
      tech: 'Python + Playwright',
      reason: 'Python 生态成熟，Playwright 处理 JS 动态渲染页面效果好',
    },
    {
      layer: '任务调度',
      tech: 'APScheduler + Redis',
      reason: 'APScheduler 支持 Cron 表达式，Redis 做任务队列和去重集合',
    },
    {
      layer: 'AI 处理',
      tech: 'Claude API',
      reason: '摘要生成 + 相关度评分 + 实体识别，单模型多任务复用',
    },
    {
      layer: '飞书推送',
      tech: '飞书自定义机器人 Webhook',
      reason: '支持 Interactive Card，可嵌入操作按钮，交互体验好',
    },
    {
      layer: '邮件推送',
      tech: 'Python smtplib + Jinja2',
      reason: 'smtplib 原生 SMTP 支持，Jinja2 渲染 HTML 邮件模板',
    },
    {
      layer: '数据存储',
      tech: 'SQLite + Redis',
      reason: 'SQLite 轻量适合内部工具，Redis 处理队列和缓存',
    },
    {
      layer: '监控面板',
      tech: 'Flask + ECharts',
      reason: 'Flask 快速搭建 API，ECharts 渲染趋势图和统计图表',
    },
  ],

  insights: [
    {
      title: '时机比内容更重要',
      desc: '同样的资讯，凌晨推送打开率 12%，早 9:30 推送打开率 67%。不是内容不好，是推送时机不对。工具的价值不在"功能多"，在"时机对"。',
    },
    {
      title: '聚合类工具的核心壁垒是"查得准"',
      desc: '不同来源的数据格式差异巨大。光是"抓取成功"就有十几种状态表述，光是"已发布"就有多种时间格式。数据标准化的工作量远超预期。',
    },
    {
      title: 'AI 是辅助不是替代',
      desc: 'AI 摘要偶尔会产生幻觉，在销售场景中"把洽谈说成签约"是致命的。最终设计为"AI 标记 + 人工确认"流程，而不是全自动推送。',
    },
    {
      title: '限流设计要留余量',
      desc: '飞书 Webhook 限制每分钟 5 条，实际按 4 条设计；爬虫频率限制 100 次/小时，实际按 80 次调度。留 20% 余量应对突发和系统抖动。',
    },
    {
      title: '用户反馈是最好的迭代引擎',
      desc: '上线后最有价值的不是监控数据本身，而是销售在飞书卡片上点"已跟进/待跟进"产生的行为数据——它告诉你哪些信息源真的有用。',
    },
  ],

  closingQuote:
    '「做监控系统最大的收获不是技术，而是理解了"信息差"的真正含义——不是你不知道，而是你知道的时候已经晚了。自动化不是为了替代人的判断，而是让人在第一时间拥有判断的机会。」',
}

export default caseData
