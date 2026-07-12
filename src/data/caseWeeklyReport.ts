import type { CaseStudyData } from '../pages/CaseStudyPage'

const caseData: CaseStudyData = {
  slug: 'weekly-report',
  title: 'AI 周报生成器',
  subtitle: '连接 Git + 日历，自动生成周报草稿',
  description: '自动汇总本周工作数据，生成适合管理层阅读的周报草稿，减少重复记忆成本。',
  year: '2025',
  stack: ['Python', 'GitHub API', 'Claude'],

  coverQuote:
    '「每周五下午最痛苦的事就是写周报，明明做了很多但就是想不起来。那就让 AI 帮你回忆。」',

  motivation: {
    paragraphs: [
      '每周五下午四点，办公室里总会响起此起彼伏的叹息声——<strong>又到写周报的时候了</strong>。明明一周做了很多事情，写了无数代码、开了无数会、解决了无数 bug，但坐在电脑前就是想不起来这周到底干了啥。',
      '写周报的痛苦不在于"写"，而在于<strong>"回忆"</strong>。你需要翻 Git log、翻日历、翻聊天记录、翻文档，把散落在各个角落的信息拼凑成一段看起来有条理的文字。这个过程通常要花 30-60 分钟，而其中 80% 的时间都花在了"找信息"上。',
      '更让人崩溃的是，<strong>你辛辛苦苦写出来的周报，老板可能只花 10 秒就扫完了</strong>。他不关心你修了几个 bug、重构了哪个模块，他想知道的是"这周产出了什么""下周要做什么""有什么需要他帮忙的"。写周报的本质不是记录，而是汇报。',
    ],
    highlights: [
      {
        icon: 'clock',
        title: '自动回忆',
        desc: '连接 GitHub + 日历，自动拉取本周的代码提交、PR 记录和会议安排，不用再手动翻记录',
      },
      {
        icon: 'clipboard',
        title: '结构化输出',
        desc: 'AI 自动将原始数据整理为"本周完成 / 下周计划 / 需要支持"三段式结构，符合管理层阅读习惯',
      },
      {
        icon: 'paperclip',
        title: '一键复制',
        desc: '生成的周报支持一键复制，可直接粘贴到企业微信、飞书、钉钉，格式零调整',
      },
    ],
  },

  architecture: {
    description:
      '系统采用<strong>数据采集 → AI 生成 → 用户编辑</strong>的三层架构。数据层负责从 GitHub API 和日历 API 拉取原始数据；AI 层通过 Claude 将非结构化数据转化为结构化周报；交互层提供预览、编辑和导出能力。核心设计原则是<strong>"采集自动化、生成智能化、输出标准化"</strong>。',
    layers: [
      {
        title: '用户交互层',
        items: ['Web 应用', 'CLI 工具', '浏览器插件'],
        color: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
      },
      {
        title: 'API 网关层',
        items: ['FastAPI 路由', 'OAuth 认证', '频率限制', '错误处理'],
        color: 'bg-teal-500/10',
        borderColor: 'border-teal-500/30',
      },
      {
        title: '业务逻辑层',
        items: ['数据采集服务', 'AI 生成服务', '周报管理服务'],
        color: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30',
      },
      {
        title: 'AI 处理层',
        items: ['Prompt 模板引擎', 'Claude API 调用', '结果解析与校验', '多轮优化'],
        color: 'bg-sky-500/10',
        borderColor: 'border-sky-500/30',
      },
      {
        title: '数据存储层',
        items: ['GitHub API', 'Google Calendar API', 'SQLite / PostgreSQL'],
        color: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
      },
    ],
  },

  featureModules: [
      {
        icon: 'globe',
        title: 'Git 与日历接入',
      desc: '自动连接用户的 GitHub 和日历数据，完成本周工作信息的自动收集。',
      features: ['GitHub OAuth', '日历授权', '多仓库数据拉取', '会议记录抓取'],
    },
    {
      icon: 'layers',
      title: '智能数据梳理',
      desc: '将散乱的提交、PR、会议等信息结构化，提取出可写入周报的核心内容。',
      features: ['Commit 聚合', '会议筛选', 'issue 关联', '数据摘要生成'],
    },
    {
    icon: 'clipboard',
    title: '周报草稿生成',
      desc: '按管理层阅读习惯生成本周完成、下周计划、需要支持三段式周报。',
      features: ['Prompt 生成', '业务语言转换', '结构化输出', '可编辑草稿'],
    },
    {
      icon: 'paperclip',
      title: '导出与分享',
      desc: '支持一键复制、Markdown 导出和纯文本分享，适配常见办公平台。',
      features: ['复制按钮', 'Markdown 导出', '纯文本模式', '历史记录存储'],
    },
  ],

  prototypes: [
    {
      label: '数据概览页',
      desc: '展示本周采集到的提交、PR 和会议摘要，帮助用户确认内容来源。',
      image: '/images/prototypes/weekly-report-01-overview.png',
    },
    {
      label: '周报草稿页',
      desc: '生成周报草稿并支持用户直接编辑与调整，符合管理层阅读习惯。',
      image: '/images/prototypes/weekly-report-02-draft.png',
    },
    {
      label: '导出分享页',
      desc: '提供一键复制与导出功能，方便将报告直接粘贴到企业 IM。',
      image: '/images/prototypes/weekly-report-03-export.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：把写周报从“记忆劳动”变成“结构化回忆”，让用户每周少花时间、写得更有价值。用户：软件开发者、项目经理和职场白领。成功标准：写周报时间 ≤ 15 分钟、完成率 ≥ 92%、信息覆盖率 ≥ 88%。',
  },

  metrics: [
    {
      icon: 'clock',
      label: '写周报时间',
      value: '15min',
      desc: '从打开工具到生成可编辑周报的平均时间控制在 15 分钟以内。',
    },
    {
      icon: 'brain',
      label: '回忆效率提升',
      value: '70%',
      desc: '用户回忆工作细节的时间减少约 70%。',
    },
    {
      icon: 'chart',
      label: '信息覆盖率',
      value: '88%',
      desc: '自动采集并结构化的工作信息覆盖率达到 88%。',
    },
    {
      icon: 'check',
      label: '周报完成率',
      value: '92%',
      desc: '使用该工具的周报按时完成率提升到 92%。',
    },
  ],

  flows: [
    {
      title: '数据采集流程',
      description:
        '用户授权后，系统自动从多个数据源拉取本周的工作数据，经过清洗和去重后形成结构化的原始数据集。',
      steps: [
        { label: '用户 OAuth 授权', icon: 'lock', sub: 'GitHub + 日历' },
        { label: '选择时间范围', icon: 'clock', sub: '默认本周' },
        { label: '拉取 Git Commits', icon: 'file', sub: '按仓库分组' },
        { label: '拉取 PR 记录', icon: 'file', sub: '含 review 状态' },
        { label: '拉取日历会议', icon: 'clock', sub: '标题 + 时长' },
        { label: '数据清洗去重', icon: 'filter', sub: '合并关联项' },
        { label: '生成数据摘要', icon: 'chart', sub: '按类别统计' },
      ],
    },
    {
      title: '周报生成流程',
      description:
        '将采集到的原始数据通过 Claude 进行智能分析，按照"本周完成 / 下周计划 / 需要支持"的结构生成周报草稿。',
      steps: [
        { label: '构建 Prompt', icon: 'sparkle', sub: '注入原始数据', accent: true },
        { label: '调用 Claude API', icon: 'zap', sub: '流式响应' },
        { label: '解析 AI 输出', icon: 'brain', sub: '结构化提取' },
        { label: '生成三段式周报', icon: 'clipboard', sub: '完成/计划/支持' },
        { label: '用户预览编辑', icon: 'pencil', sub: '富文本编辑器' },
        { label: '一键复制导出', icon: 'paperclip', sub: 'Markdown + 纯文本', accent: true },
        { label: '保存历史记录', icon: 'database', sub: '支持回溯查看' },
      ],
    },
  ],

  challenges: [
    {
      problem: 'GitHub commit message 质量参差不齐',
      detail:
        '很多开发者的 commit message 就是 "fix bug"、"update"、"wip" 这种，AI 根本无法从中提取有效信息。直接把这些丢给 Claude，生成的周报会变成一堆无意义的流水账。',
      solution:
        '设计了智能过滤和聚合策略：过滤掉 merge commit 和无意义 message，将同一功能的多个 commit 按 branch 关联聚合，结合 PR title 和 description 补充上下文。对于信息不足的 commit，自动关联对应的 issue 和 code review 记录。',
    },
    {
      problem: '日历会议数据噪音太大',
      detail:
        '日历里充斥着各种站会、周会、1:1、团建、午餐约饭，如果全部纳入周报会显得很水。但直接过滤掉又可能漏掉重要会议。',
      solution:
        '设计会议分类器：根据会议标题关键词（standup、sync、1:1）自动标记为"常规会议"并折叠为统计数字（"本周参加了 12 场会议"）；对于标题含项目名、评审、方案讨论等关键词的会议，标记为"重要会议"并单独列出。用户可在预览阶段手动调整分类。',
    },
    {
      problem: 'Claude 生成的周报过于"技术化"',
      detail:
        'AI 倾向于用技术语言描述工作（"重构了用户模块的认证逻辑"），但管理层更希望看到业务价值（"优化了登录体验，预计提升注册转化率 15%"）。',
      solution:
        '在 Prompt 中加入"管理层视角"的约束：要求 Claude 同时输出技术描述和业务价值描述两层；引入"so what"追问策略——每项工作成果后追问"这对业务有什么影响"；支持用户自定义"翻译词典"，将常用技术术语映射为业务语言。',
    },
    {
      problem: '多仓库场景下的数据合并',
      detail:
        '很多开发者一周内在多个仓库提交代码，每个仓库的命名规范、分支策略、PR 流程都不一样，直接合并会导致周报逻辑混乱。',
      solution:
        '设计了仓库级别的配置系统：支持为每个仓库设置权重（重要/普通/忽略）、自定义聚合规则、独立的过滤策略。合并时按项目维度重新组织，而非按时间线平铺。支持"跨仓库关联"——将同一 Jira ticket 在不同仓库的提交自动归组。',
    },
    {
      problem: '周报的"下周计划"从哪来？',
      detail:
        'GitHub 和日历都是"过去"的数据，但周报还需要"下周计划"。没有数据源支撑，AI 只能瞎编或者留空。',
      solution:
        '多源推断策略：从 GitHub open issues 和 in-progress PR 推断未完成工作；从日历下周已安排的会议推断即将开展的项目；从用户历史周报的"下周计划"中提取未完成项。最终由用户确认和补充，AI 只提供"建议"而非"决定"。',
    },
  ],

  techStack: [
    {
      layer: '数据采集',
      tech: 'Python + requests/httpx',
      reason: 'Python 生态对 GitHub API 和日历 API 的支持最成熟，httpx 支持异步并发拉取多仓库数据',
    },
    {
      layer: 'API 对接',
      tech: 'GitHub API v4 (GraphQL)',
      reason: 'GraphQL 可以一次请求获取 commits + PRs + reviews 的关联数据，减少 API 调用次数',
    },
    {
      layer: 'AI 引擎',
      tech: 'Claude (Anthropic)',
      reason: '长上下文窗口（200K tokens）能一次性塞入整周数据；指令遵循能力强，结构化输出稳定',
    },
    {
      layer: '后端框架',
      tech: 'FastAPI',
      reason: '原生异步支持，适合多数据源并发采集场景；自动生成 OpenAPI 文档，方便后续扩展',
    },
    {
      layer: '数据存储',
      tech: 'SQLite → PostgreSQL',
      reason: '个人版用 SQLite 零配置启动；团队版迁移到 PostgreSQL 支持多人协作和历史查询',
    },
    {
      layer: '前端交互',
      tech: 'React + Tailwind CSS',
      reason: '富文本编辑器 + 流式渲染 AI 输出，React 的状态管理更适合这种交互密集型场景',
    },
    {
      layer: '部署方案',
      tech: 'Docker + GitHub Actions',
      reason: 'CI/CD 自动化部署，支持一键回滚；Docker 保证环境一致性',
    },
  ],

  insights: [
    {
      title: '周报的本质是"向上管理"',
      desc: '周报不是工作日志，而是向上管理的工具。你写的不是"做了什么"，而是"老板应该知道什么"。AI 可以帮你回忆和组织，但"哪些事值得写"这个判断，只有你自己能做。',
    },
    {
      title: '数据采集的价值在于"完整性"而非"精确性"',
      desc: '采集到的原始数据 80% 都是噪音，但宁可多采集再过滤，也不要漏掉关键信息。设计了"宽进严出"的策略——先尽可能多地采集，再通过 AI 和规则进行智能筛选。',
    },
    {
      title: 'Prompt 工程是产品核心竞争力',
      desc: '同样的数据，不同的 Prompt 生成的周报质量天差地别。投入了大量时间在 Prompt 优化上——包括角色设定、输出格式约束、示例 few-shot、"so what" 追问策略等。最终发现，好的 Prompt 比好的模型更重要。',
    },
    {
      title: '"下周计划"比"本周总结"更有价值',
      desc: '用户反馈显示，周报中"下周计划"的部分反而最受管理者关注——因为它反映了团队的方向感和规划能力。但这也是 AI 最难自动生成的部分，需要结合 open issues、日历和历史周报进行推断。',
    },
    {
      title: '工具类产品的核心壁垒是"习惯养成"',
      desc: '周报生成器本身技术含量不高，但一旦用户形成了"每周五下午一键生成"的习惯，迁移成本就很高。产品的真正护城河不是功能，而是让用户离不开你。',
    },
  ],

  closingQuote:
    '周报的本质是"让老板知道你做了什么"，而不是"记录你做了什么"。AI 可以帮你回忆和组织，但"哪些事值得写"还是得自己判断。最好的周报，是让老板觉得你这一周很有价值，而不是让他觉得你这一周很忙。',
}

export default caseData
