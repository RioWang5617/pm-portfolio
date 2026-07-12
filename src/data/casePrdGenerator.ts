import type { CaseStudyData } from '../pages/CaseStudyPage'

const caseData: CaseStudyData = {
  slug: 'prd-generator',
  title: 'AI PRD 生成器',
  subtitle: '一句话需求 → 自动生成完整 PRD 文档',
  description: '通过多轮结构化追问将模糊需求转化为标准化 PRD，帮助产品经理更快落地想法。',
  year: '2025',
  stack: ['Coze', 'Markdown', 'Claude'],
  coverQuote:
    '「PRD 的价值不在"写得多"，在"想清楚"。AI 生成的 PRD 可以当 60 分的底稿——但那 60 分，是帮你把脑子里模糊的想法变成结构化的思考。」',

  motivation: {
    paragraphs: [
      '很多产品经理写 PRD 的时候不知道从哪开始，尤其是新人。面对一张空白文档，脑子里有一堆想法但不知道怎么组织——"目标用户是谁？""核心场景是什么？""边界条件怎么定？"——这些问题在写之前没想清楚，写出来的 PRD 就是一堆功能堆砌。',
      '更现实的问题是：PRD 的格式和结构因人而异，有的团队写 3 页就够，有的要 30 页。新人不知道哪些章节是必须的，哪些是可选的；资深 PM 虽然知道结构，但每次从零开始写也很耗时。<strong>核心矛盾不是"不会写"，是"没想清楚就开始写"。</strong>',
      '所以我做了一个<strong>基于 Coze 的多轮对话 Agent</strong>：用户输入一句话需求，AI 通过 3-5 轮结构化追问帮你理清目标用户、核心场景、边界条件、技术约束——然后自动生成一份包含 19 个标准章节的完整 PRD。不是替代产品经理思考，是<strong>用追问的方式逼你想清楚</strong>。',
    ],
    highlights: [
      {
        icon: 'question',
        title: '多轮追问',
        desc: '3-5 轮结构化对话，从宏观到细节逐步追问，逼你想清楚关键问题',
      },
      {
        icon: 'clipboard',
        title: '结构化输出',
        desc: '自动生成 19 个标准章节，格式统一规范，可直接复制到飞书/Notion',
      },
      {
        icon: 'sliders',
        title: '模板可定制',
        desc: '支持 Web/App/API/SaaS/内部工具等 5 种产品类型模板，追问策略自动适配',
      },
    ],
  },

  architecture: {
    description:
      '产品采用五层架构设计，以 Coze Agent 工作流为核心调度引擎。核心思路是<strong>将 PRD 拆解为"信息收集 → 结构化存储 → 分章节生成 → 质量校验"四个阶段</strong>，每个阶段由独立的 Prompt 链驱动，确保生成内容既完整又有深度。',
    layers: [
      {
        title: '用户交互层',
        color: 'from-blue-500/20 to-blue-600/5',
        borderColor: 'border-blue-500/30',
        items: [
          'Coze Bot 对话界面（多轮对话入口）',
          'Web 管理后台（PRD 管理与编辑，v2 规划）',
          'API 接口（第三方集成入口，v2 规划）',
        ],
      },
      {
        title: 'Agent 核心层',
        color: 'from-emerald-500/20 to-emerald-600/5',
        borderColor: 'border-emerald-500/30',
        items: [
          '意图识别模块（解析用户输入，提取产品关键词）',
          '追问策略引擎（基于产品类型选择追问路径）',
          '信息整合模块（汇总对话信息，结构化存储）',
          'PRD 生成引擎（调用 Prompt 链生成完整文档）',
          '质量检查模块（校验章节完整性与内容质量）',
        ],
      },
      {
        title: '知识与模板层',
        color: 'from-amber-500/20 to-amber-600/5',
        borderColor: 'border-amber-500/30',
        items: [
          'PRD 模板库（不同产品类型的文档结构模板）',
          '追问问题库（结构化追问问题集合）',
          '范例片段库（优质 PRD 片段作为参考）',
          '行业知识库（常见业务场景和解决方案）',
        ],
      },
      {
        title: 'AI 能力层',
        color: 'from-purple-500/20 to-purple-600/5',
        borderColor: 'border-purple-500/30',
        items: [
          'Claude 模型（长文本理解 / 结构化输出）',
          'Prompt 工程（分章节生成 Prompt 链）',
          '上下文管理（多轮对话记忆与信息提取）',
        ],
      },
      {
        title: '存储层',
        color: 'from-rose-500/20 to-rose-600/5',
        borderColor: 'border-rose-500/30',
        items: [
          '对话历史存储（用户对话记录）',
          'PRD 文档存储（生成的 PRD 内容）',
          '用户配置存储（模板偏好 / 历史记录）',
        ],
      },
    ],
  },

  featureModules: [
    {
      icon: 'search',
      title: '需求意图识别',
      desc: '解析用户一句话需求，提取目标用户、场景和核心问题。',
      features: ['意图提取', '产品类型识别', '关键词抽取', '业务场景分类'],
    },
    {
      icon: 'question',
      title: '多轮追问引擎',
      desc: '通过结构化追问逐步补全信息，防止用户直接得到空洞 PRD。',
      features: ['追问策略', '信息充分度评估', '动态选项引导', '多轮反馈'],
    },
    {
      icon: 'file',
      title: 'PRD 章节生成',
      desc: '将结构化数据映射为 19 个章节，生成规范化 PRD 文档。',
      features: ['章节模板', '分组并行生成', '逻辑校验', 'Markdown 输出'],
    },
    {
      icon: 'check',
      title: '质量检查与优化',
      desc: '对生成结果进行完整性、逻辑和格式检查，避免产出低质内容。',
      features: ['完整性校验', '前后矛盾检查', '套话过滤', '质量评分'],
    },
  ],

  prototypes: [
    {
      label: '对话输入页',
      desc: '引导用户输入一句话需求，并展示当前信息收集进度。',
      image: '/images/prototypes/prd-generator-01-input.png',
    },
    {
      label: '追问流程页',
      desc: '展示多轮追问交互和关键问题确认，确保信息完整。',
      image: '/images/prototypes/prd-generator-02-followup.png',
    },
    {
      label: 'PRD 预览页',
      desc: '展示生成的 PRD 文档结构，支持直接复制与导出。',
      image: '/images/prototypes/prd-generator-03-preview.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：让产品经理从“空白页面”解放出来，用结构化追问把模糊需求转化为完整 PRD。用户：新人 PM、业务方和跨部门沟通需求的负责人。成功标准：PRD 章节完整率 100%、信息补全率 ≥ 95%、生成转化率 ≥ 82%。',
  },

  metrics: [
    {
      icon: 'clock',
      label: '生成时长',
      value: '30s',
      desc: '从输入需求到输出完整 PRD 的平均时间控制在 30 秒以内。',
    },
    {
      icon: 'check',
      label: '章节完整率',
      value: '100%',
      desc: '生成 PRD 默认包含 19 个标准章节，结构规范完整。',
    },
    {
      icon: 'chart',
      label: '信息补全率',
      value: '95%',
      desc: '多轮追问确保关键业务信息补全率达到 95%。',
    },
    {
      icon: 'star',
      label: '用户转化率',
      value: '82%',
      desc: '用户从需求输入到生成 PRD 的完成率达 82%。',
    },
  ],

  flows: [
    {
      title: '需求追问与信息收集流程',
      description:
        '用户输入一句话需求后，AI 通过 3-5 轮结构化追问逐步收集关键信息。每轮追问包含 2-3 个具体问题，并提供选项引导降低回答难度。信息充分时提前结束追问。',
      steps: [
        { label: '输入需求', icon: 'pencil', sub: '用户输入一句话产品需求描述' },
        { label: '意图识别', icon: 'brain', sub: '提取产品类型、核心功能关键词、目标行业' },
        { label: '匹配模板', icon: 'layers', sub: '根据产品类型匹配追问路径和问题集' },
        { label: '第 1 轮追问', icon: 'question', sub: '目标用户与使用场景', accent: true },
        { label: '第 2 轮追问', icon: 'question', sub: '核心功能与优先级' },
        { label: '第 3 轮追问', icon: 'question', sub: '业务规则与边界条件' },
        { label: '信息确认', icon: 'check', sub: '汇总提取信息，确认是否需要补充' },
      ],
    },
    {
      title: 'PRD 章节生成流程',
      description:
        '信息收集完成后，系统调用 PRD 生成 Prompt 链，将 19 个章节分为 9 组并行生成，最后合并为完整文档并通过质量检查。',
      steps: [
        { label: '信息整合', icon: 'database', sub: '汇总对话信息，结构化为 JSON 格式' },
        { label: 'Prompt 链组装', icon: 'layers', sub: '将结构化信息注入各章节生成 Prompt' },
        { label: '分组生成', icon: 'sparkle', sub: '9 组 Prompt 并行生成 19 个章节', accent: true },
        { label: '章节合并', icon: 'clipboard', sub: '按顺序合并所有章节为完整文档' },
        { label: '质量检查', icon: 'check', sub: '完整性 / 一致性 / 格式 / 逻辑校验' },
        { label: '输出 PRD', icon: 'file', sub: '输出标准 Markdown 格式的完整 PRD' },
      ],
    },
  ],

  challenges: [
    {
      problem: 'AI 不知道"什么时候该停追问"',
      detail:
        '初版设计追问轮次固定 5 轮，但很多简单需求（如"做一个登录页"）3 轮就问完了，后面 2 轮 AI 在硬凑问题，用户体验很差。反过来，复杂需求 5 轮又不够。',
      solution:
        '设计"信息充分度评分"机制。每轮追问后 AI 自动评估已收集信息的完整度（0-100 分），≥ 80 分时主动结束追问并进入生成阶段。同时允许用户随时输入"开始生成"强制结束追问。',
    },
    {
      problem: '多轮对话上下文丢失',
      detail:
        'Coze Agent 的上下文窗口有限，当对话轮次增多时，早期信息容易被截断。用户第 1 轮说的目标用户，到第 5 轮时 AI 可能已经"忘了"，导致生成的 PRD 前后矛盾。',
      solution:
        '每轮追问结束后，立即将关键信息提取为结构化 JSON 存入变量（extracted_info）。后续生成 PRD 时直接读取变量而非依赖对话历史，彻底解决上下文丢失问题。',
    },
    {
      problem: '19 个章节生成质量参差不齐',
      detail:
        '一次性让 AI 生成 19 个章节，前面的章节（产品概述、用户故事）质量还行，后面的章节（运营指标、风险应对）明显敷衍——因为 token 限制，AI 到后面就开始"偷懒"。',
      solution:
        '改为分组生成策略：将 19 个章节按关联性分为 9 组，每组 2-3 个章节独立生成。每组 Prompt 都包含完整的上下文信息，确保每个章节都有足够的 token 预算和关注力。',
    },
    {
      problem: '用户回答模糊导致 PRD 内容空洞',
      detail:
        '很多用户追问时回答"都行""随便""还没想好"，AI 拿到这种信息生成出来的 PRD 全是套话——"建议根据实际情况选择合适的方案"等于什么都没说。',
      solution:
        '追问时提供具体选项引导（如"目标用户是 A. 个人用户 B. 企业用户 C. 两者都有"），并对模糊回答进行二次追问。实在无法获取具体信息时，在 PRD 对应章节标注"[待确认]"而非填充空洞内容。',
    },
    {
      problem: '不同产品类型的 PRD 结构差异大',
      detail:
        'Web 应用的 PRD 重点在页面结构和交互设计，API 服务的 PRD 重点在接口定义和数据模型，SaaS 平台的 PRD 还要加租户隔离和计费方案。用同一套模板生成，要么缺关键章节，要么多出无用章节。',
      solution:
        '为 5 种产品类型（Web 应用、移动 App、API 服务、SaaS 平台、内部工具）分别维护章节模板和权重配置。生成时根据识别的产品类型动态调整章节结构和内容侧重点。',
    },
  ],

  techStack: [
    { layer: 'Agent 平台', tech: 'Coze', reason: '可视化搭建多轮对话工作流，快速迭代 Prompt，零代码部署' },
    { layer: '大语言模型', tech: 'Claude', reason: '长上下文理解能力强，结构化输出稳定，中文表达自然' },
    { layer: '文档格式', tech: 'Markdown', reason: '轻量通用，可直接复制到飞书/Notion/Confluence，支持 Mermaid 图表' },
    { layer: 'Prompt 工程', tech: '分章节 Prompt 链', reason: '19 个章节分 9 组独立生成，每组有专属 Prompt 模板和质量约束' },
    { layer: '上下文管理', tech: '变量存储 + 结构化 JSON', reason: '每轮追问后提取关键信息存入变量，避免长对话上下文丢失' },
    { layer: '模板引擎', tech: '产品类型模板库', reason: '5 种产品类型各有专属章节结构、追问策略和内容权重' },
    { layer: '质量保障', tech: '多维度校验规则', reason: '完整性、一致性、格式、逻辑四重校验，确保输出质量' },
  ],

  insights: [
    {
      title: '追问比生成更重要',
      desc: 'PRD 的质量 80% 取决于前期信息收集的质量。用户给的信息越具体、越结构化，AI 生成的 PRD 越有深度。与其花时间优化生成 Prompt，不如花时间设计追问策略。',
    },
    {
      title: 'AI 生成的是"底稿"不是"终稿"',
      desc: 'AI 生成的 PRD 可以当 60 分的底稿——结构完整、逻辑通顺、覆盖全面。但真正有价值的业务判断、优先级取舍、创新方案，还是需要产品经理自己补充。把 AI 当"写作助手"而不是"替代者"。',
    },
    {
      title: '结构化输出是 Prompt 工程的核心',
      desc: '让 AI 生成 PRD 不难，让 AI 生成格式统一、章节完整、内容不敷衍的 PRD 才难。关键在于给 AI 明确的输出约束：每章最少字数、必须包含的元素（表格/列表/流程图）、禁止使用的套话。',
    },
    {
      title: '用户说"不知道"的时候才是追问的开始',
      desc: '用户回答"还没想好"不代表这个问题不重要，恰恰说明这是他最需要想清楚的地方。追问时用具体选项引导（"你倾向于 A 还是 B？"），比开放性问题（"你觉得呢？"）有效 10 倍。',
    },
    {
      title: '工具的价值在于降低启动成本',
      desc: 'PRD 生成器最大的价值不是"写得快"，是"开始写"。很多人面对空白文档会拖延，但如果只需要说一句话就能看到一份完整的底稿，启动成本从"坐下来写 2 小时"变成了"说一句话"。这才是效率提升的本质。',
    },
  ],

  closingQuote:
    '这个项目让我重新理解了"AI 写作工具"的定位——它不是替代你思考，而是用追问的方式逼你思考。最好的 AI 工具，是让你变成更好的产品经理，而不是让你不用当产品经理。',
}

export default caseData
