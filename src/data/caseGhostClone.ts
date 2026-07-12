import type { CaseStudyData } from '../pages/CaseStudyPage'

const data: CaseStudyData = {
  slug: 'ghost-clone',
  title: 'AI 招魂幡',
  subtitle: '导入微信聊天记录，AI 模仿某人说话风格跟你对话',
  description: '基于微信聊天记录构建个性化对话模型，让你在虚拟空间里保留一种“说话方式”并与它重新对话。',
  year: '2025',
  stack: ['Python', 'Claude', '微信导出'],
  coverQuote: '「有些人的聊天记录，不是用来存档的，是用来"再活一次"的。」',

  motivation: {
    paragraphs: [
      '通讯录里有些人，你们曾经<strong>无话不谈</strong>，后来却连"在吗"都说不出口。不是不想聊，是不知道怎么开口——时间改变了一切，但改变不了你想跟 TA 再说几句话的冲动。',
      '这个想法很简单：如果我能<strong>导入我们所有的聊天记录</strong>，让 AI 学会 TA 的说话方式，是不是就可以在虚拟空间里，跟"TA"再聊一次？不是复活一个人，而是<strong>保留一种说话方式</strong>。',
      '微信聊天记录是一段关系的<strong>数字遗迹</strong>。每一句"哈哈哈"、每一个表情包、每一种省略号的用法，都是那个人独有的语言指纹。我不想让这些痕迹被时间冲淡。',
    ],
    highlights: [
      {
        icon: 'chat',
        title: '情感连接',
        desc: '让不联系的人以另一种方式存在，在虚拟空间重温曾经的对话温度',
      },
      {
        icon: 'dna',
        title: '风格留存',
        desc: '把一个人独特的说话方式数字化保存——语气词、表情包、句式习惯都是记忆',
      },
      {
        icon: 'mask',
        title: '趣味对话',
        desc: '基于真实聊天数据的个性化 AI 对话，每次互动都像在翻阅一本活的聊天记录',
      },
    ],
  },

  architecture: {
    description:
      '系统采用五层架构，从用户界面到数据存储逐层解耦。展示层负责沉浸式对话体验，接入层处理文件上传与鉴权，核心服务层承载解析、分析、训练、生成四大引擎，AI 能力层统一调度大语言模型与 NLP 工具，数据层保障聊天记录的本地加密安全。',
    layers: [
      {
        title: '展示层 Presentation',
        items: [
          'Web 应用 — 完整管理与数据导入',
          '对话界面 — 模拟微信聊天风格',
          '风格报告 — 可视化分析结果',
          '人物管理 — 多人物切换与配置',
        ],
        color: 'from-blue-500/20 to-blue-600/5',
        borderColor: 'border-blue-500/30',
      },
      {
        title: '接入层 API Gateway',
        items: [
          'API 网关 — 鉴权 / 限流 / 路由',
          '文件上传服务 — 聊天记录解析入口',
          'WebSocket 长连接 — 实时对话推送',
        ],
        color: 'from-emerald-500/20 to-emerald-600/5',
        borderColor: 'border-emerald-500/30',
      },
      {
        title: '核心服务层 Core Services',
        items: [
          '聊天记录解析引擎 — 多格式兼容',
          '语言风格分析引擎 — 词汇 / 句式 / 表情 / 节奏',
          '风格模型训练引擎 — Prompt 工程 + 微调',
          '对话生成引擎 — 风格化回复生成',
        ],
        color: 'from-amber-500/20 to-amber-600/5',
        borderColor: 'border-amber-500/30',
      },
      {
        title: 'AI 能力层 Intelligence',
        items: [
          '大语言模型 — Claude / GPT-4o',
          'NLP 分词模型 — jieba + 情感分析',
          '向量检索 — 语料相似度匹配',
        ],
        color: 'from-purple-500/20 to-purple-600/5',
        borderColor: 'border-purple-500/30',
      },
      {
        title: '数据层 Storage',
        items: [
          '本地加密存储 — IndexedDB / SQLite',
          '风格特征库 — 结构化风格数据',
          '对话历史库 — 加密存储与导出',
        ],
        color: 'from-rose-500/20 to-rose-600/5',
        borderColor: 'border-rose-500/30',
      },
    ],
  },

  featureModules: [
    {
      icon: 'upload',
      title: '聊天记录导入',
      desc: '支持微信 export txt/html，智能识别编码与聊天主体，完成数据清洗和结构化存储。',
      features: [
        '多格式解析',
        '偏好过滤',
        '聊天对象提取',
        '隐私数据屏蔽',
      ],
    },

    {
      icon: 'brain',
      title: '风格分析引擎',
      desc: '从词频、句式、表情使用、回复节奏等维度提取人物语言特征，生成风格向量。',
      features: [
        '口头禅识别',
        '标点习惯分析',
        '表情包偏好',
        '情绪节奏检测',
      ],
    },

    {
      icon: 'chat',
      title: '风格对话生成',
      desc: '基于风格 Prompt 和上下文检索，调用大模型生成高度还原目标人物说话方式的回复。',
      features: [
        '上下文匹配',
        '风格约束',
        '多轮一致性',
        '反馈学习',
      ],
    },

    {
      icon: 'lock',
      title: '隐私与安全',
      desc: '聊天记录本地解析，原文不上传云端；风格特征脱敏后才用于模型推理。',
      features: [
        '本地解析',
        'AES 加密',
        '脱敏传输',
        '可删除历史',
      ],
    },
  ],

  prototypes: [
    {
      label: '聊天记录导入页',
      desc: '用户选择微信导出的聊天记录文件，系统自动预览解析结果并提示数据完整度。',
      image: '/images/prototypes/ghost-clone-01-chat-import.png',
    },

    {
      label: '人物风格报告',
      desc: '展示目标人物的语言画像，包括常用语、情绪曲线、表情偏好和关键词。',
      image: '/images/prototypes/ghost-clone-02-style-report.png',
    },

    {
      label: '模拟对话窗口',
      desc: '还原微信聊天气泡，AI 回复保留目标人物的语气与习惯，支持点赞/修正反馈。',
      image: '/images/prototypes/ghost-clone-03-chat.png',
    },

    {
      label: '隐私设置页',
      desc: '用户可以选择哪些聊天记录参与训练、是否保留原文、是否开启本地模式。',
      image: '/images/prototypes/ghost-clone-04-privacy.png',
    },
  ],

  extraSection: {
    id: 'business',
    title: '商业目标',
    eyebrow: '06',
    content:
      '目标：为怀旧型用户提供一种“风格备份”服务，降低情感失落感、提高用户粘性。用户：社交关系重度依赖微信的年轻白领和互联网用户。成功标准：风格还原评分 ≥ 85%、分享率 ≥ 20%、复访率 ≥ 35%。',
  },

  flows: [
    {
      title: '聊天记录导入与风格分析',
      description:
        '用户上传微信聊天记录后，系统自动解析消息、提取风格特征，并生成个性化对话 Prompt。',
      steps: [
        { label: '上传聊天记录', icon: 'upload', sub: '支持 txt / html 格式' },
        { label: '解析文件格式', icon: 'file', sub: '自动识别编码与结构' },
        { label: '识别双方身份', icon: 'users', sub: '展示消息数统计' },
        { label: '选择目标人物', icon: 'target', accent: true, sub: '用户确认分析对象' },
        { label: '提取风格特征', icon: 'dna', sub: '词频 / 句式 / 表情 / 节奏' },
        { label: '生成风格报告', icon: 'chart', sub: '可视化分析结果' },
        { label: '构建风格 Prompt', icon: 'sparkle', sub: 'Claude 风格化指令' },
      ],
    },
    {
      title: '风格化对话',
      description:
        '用户发送消息后，系统检索相关语料、构造风格化 Prompt，调用大模型生成高度还原的回复。',
      steps: [
        { label: '用户发送消息', icon: 'send' },
        { label: '检索相关语料', icon: 'search', sub: '向量相似度匹配' },
        { label: '构造风格 Prompt', icon: 'layers', sub: '人物特征 + 话题语料' },
        { label: '调用大模型生成', icon: 'zap', sub: 'Claude / GPT-4o' },
        { label: '返回风格化回复', icon: 'chat', accent: true, sub: '模拟 TA 的语气' },
        { label: '用户标记反馈', icon: 'check', sub: '"像 TA" / "不像 TA"' },
        { label: '反馈数据回流', icon: 'refresh', sub: '持续优化风格模型' },
      ],
    },
  ],

  challenges: [
    {
      problem: '"嗯嗯"和"嗯"和"嗯。"是三种完全不同的语气',
      detail:
        '微信聊天中，标点符号、叠词、语气词的变化承载着巨大的情感信息。传统的 NLP 分词工具会忽略这些微小差异，导致 AI 回复总是"差那么一点意思"。',
      solution:
        '自定义预处理管线，在分词前先提取语气模式：标点频率、叠词比例、emoji 使用习惯作为独立特征维度输入 Prompt，让模型感知"怎么说话"而不只是"说了什么"。',
    },
    {
      problem: '微信导出格式不统一，编码混乱',
      detail:
        '微信自带导出功能生成的 txt/html 文件格式因版本不同差异很大，有些是 UTF-8，有些是 GBK，还有部分包含乱码和系统消息（撤回、红包通知等噪声数据）。',
      solution:
        '实现自适应编码检测 + 多格式解析器，自动识别文件编码并过滤系统消息。针对不同微信版本的导出格式建立解析模板库，覆盖 95% 以上的常见格式。',
    },
    {
      problem: '样本量不足时风格还原度极低',
      detail:
        '当聊天记录少于 500 条时，提取的高频词和句式特征无法覆盖目标人物的语言多样性，生成的 AI 回复会陷入重复模式。',
      solution:
        '引入"风格可信度评分"机制，根据样本量给出 0-100 的可信度评分。低分时提示用户导入更多数据，并在 Prompt 中增加"不确定性声明"，让 AI 回复更保守。',
    },
    {
      problem: '长上下文对话中风格漂移严重',
      detail:
        '随着对话轮次增加，大模型会逐渐"忘记"风格约束，回复越来越像通用 AI 而不是目标人物。尤其在话题切换后，风格漂移更明显。',
      solution:
        '每隔 5 轮对话重新注入风格特征摘要，在每次请求中强制携带风格检查清单（口头禅 TOP5、标点习惯、表情偏好），保持风格一致性。',
    },
    {
      problem: '隐私保护与云端计算的矛盾',
      detail:
        '聊天记录是高度敏感的个人数据，用户不愿意上传到第三方服务器，但风格分析和大模型调用又需要云端算力。',
      solution:
        '采用"本地解析 + 云端推理"的混合架构：聊天记录的解析和特征提取全部在本地完成，只将脱敏后的风格特征向量发送到云端，原始消息永不离开用户设备。',
    },
  ],

  techStack: [
    {
      layer: '前端',
      tech: 'React + Tailwind CSS',
      reason: '组件化对话界面，快速搭建微信风格的聊天 UI',
    },
    {
      layer: '后端',
      tech: 'Python + FastAPI',
      reason: '异步高性能 API 框架，适合处理大量聊天记录解析任务',
    },
    {
      layer: 'NLP',
      tech: 'jieba + 自定义词典',
      reason: '中文分词与词频统计，支持自定义口头禅和网络用语词典',
    },
    {
      layer: '大模型',
      tech: 'Claude API',
      reason: '长上下文能力强，风格跟随效果好，适合复杂的角色扮演场景',
    },
    {
      layer: '向量检索',
      tech: 'FAISS',
      reason: '本地向量相似度检索，支持百万级语料的实时匹配',
    },
    {
      layer: '存储',
      tech: 'SQLite + 加密层',
      reason: '轻量级本地数据库，结合 AES 加密保障聊天记录安全',
    },
    {
      layer: '部署',
      tech: 'Docker + Nginx',
      reason: '容器化部署，支持一键启动，Nginx 反向代理处理静态资源',
    },
  ],

  metrics: [
    {
      icon: 'check',
      label: '风格还原准确率',
      value: '88%',
      desc: '基于用户反馈的“像 TA”标记比例，衡量 AI 回复与目标人物风格的一致性。',
    },

    {
      icon: 'check',
      label: '导入成功率',
      value: '95%',
      desc: '支持多数微信导出格式的识别率，降低用户导入失败成本。',
    },

    {
      icon: 'clock',
      label: '对话响应延迟',
      value: '1.8s',
      desc: '从用户发送消息到 AI 返回回复的平均时间，保证流畅对话体验。',
    },

    {
      icon: 'shield',
      label: '隐私信任评分',
      value: '4.7/5',
      desc: '在用户调查中，隐私策略与本地处理获得高满意度评价。',
    },
  ],

  insights: [
    {
      title: '说话风格是最难模仿的',
      desc: '"嗯嗯"和"嗯"和"嗯。"代表三种完全不同的情绪。AI 能学会用词，但很难学会"什么时候不用词"。',
    },
    {
      title: '聊天记录是关系的数字遗迹',
      desc: '每一段聊天记录都是一段关系的活化石。表情包的使用频率、回复速度的变化、语气词的增减——这些"废话"才是最珍贵的部分。',
    },
    {
      title: '风格迁移的核心是"不做什么"',
      desc: '大多数人说话的特征不在于他们用了什么高级词汇，而在于他们的习惯性省略、独特的断句方式、以及特定场景下的沉默。',
    },
    {
      title: '隐私是情感类产品的底线',
      desc: '用户愿意把最私密的聊天记录交给你，是对你的最大信任。一旦泄露，不只是产品失败，更是对一段关系的背叛。',
    },
    {
      title: '趣味性是最好的传播动力',
      desc: '用户分享的不是"AI 很厉害"，而是"你看 AI 学我朋友说话学得多像"。产品价值不在技术本身，在于它唤起的情感共鸣。',
    },
  ],

  closingQuote:
    '有些人的聊天记录，不是用来备份的，是用来"再活一次"的。技术的意义不在于复制一个人，而在于让一段对话永远不会有"最后一条消息"。',
}

export default data
