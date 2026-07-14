// 个人资料
export const profile = {
  name: 'Wang Tianyang',
  nameZh: '王天阳',
  title: 'AI 产品经理',
  tagline: '技术型 AI 产品经理 — 计算机科班出身，能无缝衔接业务需求与技术实现。',
  subtitle: '用 AI 拆解伪需求，把每一个"拍脑袋"的冲动，转化为经得起市场检验的现实。',
  location: '成都',
  email: 'wy1833411196@gmail.com',
  phone: '18603313359',
  social: [],
  // 顶部能力标签
  capabilities: [
    'AI Agent 工作流',
    'RAG 知识库',
    'Prompt 工程',
    'Dify / Coze 编排',
    'VibeCoding',
    'B 端 SaaS 服务',
    '多模态交互',
    '从 0 到 1',
  ],
  // 一句话自我介绍
  pitch:
    '计算机科班出身，4 年经验（2 年 Python 后端 + 2 年 AI 产品经理）。从 0 到 1 主导过头部车企 AI Agent 售后智能化方案（商业化月销 300 万）、AI CRM 替代微软 Copilot（覆盖销售/商务/法务 3 条业务线）、国际新闻 AI 协同中台（跨国定稿效率提升 80%+）、AI 数字人大屏（首批百台设备落地）等多款 B 端产品。精通 Dify/Coze 编排、RAG 知识库搭建与 VibeCoding 模式开发。',
  // 工作经历
  experience: [
    {
      company: '北京昆仑联通科技发展股份有限公司',
      role: 'AI 产品经理',
      period: '2025.08 - 2026.07',
      highlights: [
        '主导头部车企（宝马、大众）AI Agent 售后智能化方案，基于 Dify 编排企业级 AI Agent，涵盖知识库管理与 RAG 智能检索、系统集成与 Tools 工具调用、报价管理与业务闭环设计、自动化营销与数据看板',
        '从 0 到 1 规划自研 AI-CRM 替代微软 Copilot，覆盖销售/商务/法务 3 条业务线，智能填表引擎支持多源数据解析（OCR/NLP/ASR），一键反填 CRM 档案',
        '设计客户 360 度画像与智能标签体系，规划 AI 销售助手（跟进摘要生成/最佳联系时机推荐/商机赢单概率预测），集成 AI 合同/标书审查模块',
        '设计爬虫状态自动化监控与热点商机推送系统，打通飞书/Outlook 接口实现外部线索与内部数据实时联动',
      ],
    },
    {
      company: '北京职此青绿科技有限公司',
      role: 'AI 产品经理（AI 中台与应用方向）',
      period: '2024.08 - 2025.08',
      highlights: [
        '搭建全球新闻 AI 协同中台，主导 Prompt 模板设计与多轮迭代，跨国定稿耗时从数小时压缩至分钟级，效率提升逾 80%，初稿采纳率由 60% 提升至 90%',
        '主导 AI 数字人大屏产品，为北京伊顿善育定制软硬一体方案，采用私有化 DeepSeek 大模型 + ASR/TTS + 数字人面部驱动，首批百余台设备完成验收与全国园区部署',
        '负责 RAG 知识库搭建与 Prompt 底层配置，确保数字人既能应对家长业务咨询，又能安全生动陪伴儿童互动',
      ],
    },
    {
      company: '成都聚创新意智能科技有限公司',
      role: 'Python 后端开发工程师',
      period: '2022.06 - 2024.08',
      highlights: [
        '从 0 到 1 搭建"心仪租房"C2C 房屋直租微信小程序，基于 FastAPI + MySQL + Redis 架构，累计注册用户 2,000+，流转 350+ 套真实房源',
        '负责房源中心、交易与合同中心、用户与权限中心、事务与消息中心等核心模块开发',
      ],
    },
  ],
  // 专业技能
  skills: {
    'AI 技术': ['Prompt Engineering', 'Dify / Coze / LangChain Agent 编排', 'RAGFlow 知识库搭建', 'DeepSeek / 大模型微调'],
    '产品能力': ['需求分析与竞品调研', 'PRD 文档撰写', '高保真原型（Figma / Axure）', '数据驱动迭代'],
    '技术基础': ['Python / FastAPI', 'MySQL / Redis', 'API 设计与对接', 'Codex / Claude Code / VibeCoding'],
  },
  // 教育经历
  education: {
    school: '河北工程大学科信学院',
    degree: '本科',
    major: '计算机科学与技术',
    period: '2018 - 2022',
  },
}
