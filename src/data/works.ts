export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  team: string
  tags: string[]
  cover: string
  image?: string
  images?: { src: string; alt: string; caption: string }[]
  intro: string
  context: string
  problem: string
  approach: { title: string; body: string }[]
  outcome: { metric: string; label: string }[]
  reflection: string
}

export const works: CaseStudy[] = [
  {
    slug: 'ai-digital-human',
    title: 'AI 语音互动大屏数字人',
    subtitle: '软硬一体的 AI 虚拟数字人大屏，为连锁幼教门店提供双角色情感化对话体验',
    year: '2025',
    role: 'AI 产品经理',
    team: '产品1人 + 开发3人 + 硬件1人',
    tags: ['B2B2C', '数字人', 'RAG 知识库', '软硬一体'],
    cover: 'from-sky-700/90 via-blue-600/70 to-cyan-500/50',
    image: '/images/prototypes/ai-digital-human-01-parent.png',
    images: [
      { src: '/images/prototypes/ai-digital-human-01-parent.png', alt: '家长咨询界面', caption: '家长端：AI 课程顾问，实时回答课程/师资/报价咨询' },
      { src: '/images/prototypes/ai-digital-human-02-child.png', alt: '儿童互动界面', caption: '儿童端：古诗、故事、情感互动，安全边界严格把控' },
      { src: '/images/prototypes/ai-digital-human-03-admin.png', alt: '运营管理后台', caption: '总部运营后台：知识库管理、设备监控、数据统计' },
    ],
    intro: '为某头部全国连锁幼儿教育机构打造 AI 数字人大屏——家长候场时咨询课程、师资、报价，儿童候场时听古诗、听故事、情感陪伴。软硬一体交付，门店开箱即用，首批百余台设备已全部落地。',
    context: '客户是头部连锁幼教机构，覆盖多地线下门店。每家门店大厅承担两类用户的接待场景：家长（B 端付费方）需要咨询课程、师资、报价等业务问题；儿童（3-8 岁，C 端互动方）候场时容易焦躁，影响门店咨询氛围。传统方案是纯文字问答屏+客服接待，文字屏对低龄儿童不友好，纯客服约 70% 的问题属于重复性咨询，挤占服务产能，难规模化。',
    problem: '核心矛盾在于：家长需要准确的业务咨询（课程产品、价格、师资资质），儿童需要趣味互动（古诗、故事、闲聊），两类用户的需求完全不同但共享同一个大屏入口。系统需要自动判断当前对话者是家长还是儿童，并切换对应的回答风格和知识库——这要求 AI 具备"双角色路由"能力。同时，作为面向儿童的产品，安全边界必须严格把控。',
    approach: [
      {
        title: '双角色智能路由设计',
        body: '基于对话内容自动判断当前交互对象：家长问题走业务咨询分支（RAG 知识库匹配课程/价格/师资），儿童输入走互动分支（古诗/故事/闲聊）。两块知识库独立维护、互不污染。通过意图识别模型实现毫秒级路由切换，确保对话体验自然流畅。',
      },
      {
        title: 'RAG 知识库搭建与运营',
        body: '搭建四类知识库（品牌/课程/古诗/故事），支持总部运营人员在后台通过富文本编辑器自主维护，变更不需要发版。采用向量检索+关键词混合策略，RAG 命中率优化到 90% 以上。家长业务咨询的回复必须引用原文出处，确保信息准确性。',
      },
      {
        title: '安全边界与兜底机制',
        body: '为儿童互动设置安全边界词库，遇到敏感词拦截并转家长话题。数字人回答不确定时（置信度低于阈值）自动提示"我帮你转接顾问"，可记录家长手机号。非营业时段大屏进入待机态，显示运营素材。',
      },
      {
        title: '情感化交互设计',
        body: 'TTS 注入情感参数，数字人面部表情和肢体动作与语音同步。迎宾场景根据时间段（早/午/晚）使用不同问候模板。儿童可以触发"笑一笑""跳舞"等情感互动指令，增强陪伴感。',
      },
    ],
    outcome: [
      { metric: '100+', label: '首批交付设备数（台）' },
      { metric: '7×24', label: '业务咨询覆盖时段' },
      { metric: '~70%', label: '重复咨询拦截率' },
      { metric: '90%+', label: '知识库命中率' },
    ],
    reflection: '这个项目让我深刻理解了"软硬一体"产品的复杂度——不只是 AI 模型的能力问题，还涉及硬件选型、门店网络环境、设备运维、知识库持续运营等全链路挑战。最大的教训是：技术上能跑通 demo 和在 100 家门店稳定运行是两回事，必须在 MVP 阶段就考虑规模化部署的运维成本。',
  },
  {
    slug: 'global-news-ai',
    title: '全球新闻 AI 协同中台',
    subtitle: '跨国新闻机构的 AI 协同中台，子公司端/总公司端/管理端三端协同',
    year: '2025',
    role: 'AI 产品经理（AI 中台方向）',
    team: '产品1人 + 开发4人 + 测试1人',
    tags: ['B端', '跨国协同', 'AI 中台', 'Prompt 工程'],
    cover: 'from-indigo-700/90 via-violet-600/70 to-purple-500/50',
    image: '/images/prototypes/global-news-ai-01-submit.png',    images: [
      { src: '/images/prototypes/global-news-ai-01-submit.png', alt: '子公司提报端', caption: '子公司端：多格式上传，AI 自动翻译润色并按总部模板格式重排' },
      { src: '/images/prototypes/global-news-ai-02-review.png', alt: '总公司审核端', caption: '总公司端：双栏工作台，左侧待审稿件列表，右侧定稿编辑区' },
      { src: '/images/prototypes/global-news-ai-03-admin.png', alt: '管理端', caption: '管理端：组织架构、模板管理、术语库、数据看板' },
    ],    intro: '为北京中税广经国际新闻搭建从"子公司内容生产"到"总部审批定稿"的全链路 AI 协同中台——多国子公司母语写稿，AI 翻译润色，总部审核定稿，跨国业务数据化流转与移动化敏捷协同。',
    context: '客户是全球多国子公司布局的新闻机构。每家子公司每日向上提报本地新闻素材，总部需要汇总、翻译、润色、定稿后发布。原有流程跨 3-5 个时区、5-7 个人协作，单次定稿耗时数小时到数天。通用大模型不懂垂直业务术语，错译率高；子公司提报模板五花八门，AI 重排成本高。',
    problem: '核心挑战有三个：一是跨地域跨语言的协同效率极低，海外编辑母语写稿→翻译成中文→总部审稿→修改→定稿，流程冗长；二是垂直术语翻译质量差，通用大模型无法准确处理新闻行业的专业术语；三是格式不统一，子公司提报模板各异，AI 重排成本高。需要一个能串联三端（子公司/总公司/管理端）的 AI 协同平台。',
    approach: [
      {
        title: '三端产品架构设计',
        body: '设计子公司端（提报员）、总公司端（审核员）、管理端（管理员）三端协同架构。子公司端支持 Word/PDF/图片多格式上传，AI 自动按总部模板格式重排；总公司端提供双栏聚合工作台，左侧原稿列表右侧定稿区；管理端管理组织架构、模板和语料库。',
      },
      {
        title: '垂直行业 Prompt 工程',
        body: '针对新闻行业的垂直术语问题，构建业务术语库并嵌入 Prompt 工程。将客户历年的定稿作为高质量语料持续回流，迭代优化翻译和润色 Prompt。跨国协同效率对比未加 Prompt 的通用 LLM 方案提升逾 80%。',
      },
      {
        title: '模板标准化与 AI 重排',
        body: '设计总部模板管理中心，支持上传/编辑模板并预设段落结构与占位符。子公司提报时选择总部下发的模板，AI 自动按模板格式重排内容，大幅降低格式不一致带来的整理成本。',
      },
      {
        title: '报表自动化与资产沉淀',
        body: '支持一键生成周度简报/季度大事记/年度汇总，报表模板+一键生成+预览+导出 PDF/Word。跑通周期性报表自动归档+高质量语料持续回流的数据闭环。',
      },
    ],
    outcome: [
      { metric: '80%+', label: '跨国协同效率提升' },
      { metric: '分钟级', label: '总部定稿耗时（原数小时）' },
      { metric: '3端', label: '子公司/总公司/管理端协同' },
      { metric: '持续', label: '高质量语料数据闭环' },
    ],
    reflection: '这个项目让我理解了"AI 中台"不只是一个模型接口——它需要串联业务流程、组织架构、权限管理和数据闭环。最大的收获是 Prompt 工程不是"写一段提示词"，而是"用高质量语料持续迭代"的过程。同时也认识到跨国产品需要考虑时区、语言、文化差异等非技术因素。',
  },
  {
    slug: 'ai-crm',
    title: '企业自研 AI-CRM 系统',
    subtitle: '完整替代 Microsoft Dynamics 365 + Copilot，八大模块主导 0 到 1 产品架构',
    year: '2024-2025',
    role: 'AI 产品经理',
    team: '产品1人 + 开发5人 + 测试1人',
    tags: ['B端', 'CRM', '智能填表', 'AI 审查', '系统集成'],
    cover: 'from-emerald-700/90 via-green-600/70 to-teal-500/50',
    image: '/images/prototypes/ai-crm-01-dashboard.png',    images: [
      { src: '/images/prototypes/ai-crm-01-dashboard.png', alt: '销售工作台', caption: '销售工作台：商机管道、AI 智能录入、数据看板' },
      { src: '/images/prototypes/ai-crm-02-smartfill.png', alt: '智能填表引擎', caption: '智能填表引擎：微信/PDF/邮件多源异构抽取，AI 自动写入 CRM' },
      { src: '/images/prototypes/ai-crm-03-review.png', alt: 'AI 审查', caption: 'AI 审查：自动检测合同/招投标风险，12秒生成审查报告' },
    ],    intro: '主导从 0 到 1 搭建企业自研 AI-CRM 系统，完整替代微软 Dynamics 365 + Copilot。核心创新是"智能填表引擎"——销售录入工作量骤降约 80%，打通飞书/Outlook/ERP 数据互通，节约数十万美元/年的 Copilot 授权成本。',
    context: '公司是系统集成商，B 端销售链路长（线索→商机→合同→回款）。原采买 Microsoft Dynamics 365 + Copilot，但 Copilot 授权成本过高（数十万美元/年），且无法与内部异构系统（飞书/Outlook/ERP）深度打通。销售每天在多工具间切换（微信聊天/PDF合同/邮件/CRM），录入工作占工作日 30-40%。核心矛盾是：系统需要结构化数据，但销售的生产力工具是碎片化的。',
    problem: '需要解决三个核心问题：一是替代高成本的微软方案，实现核心链路自主可控；二是打破数据孤岛，打通飞书/Outlook/ERP等异构系统；三是用 AI 能力大幅降低销售的数据录入负担。AI 的关键作用不是让 CRM 更好看，是让数据流从"人填"变成"AI 自动填"。',
    approach: [
      {
        title: '八大模块产品架构设计',
        body: '主导设计八大核心模块：客户档案管理（智能标签+画像）、销售流程管理（L2C全链路）、智能填表引擎（多源异构抽取）、AI 销售助手（预测+推荐）、智能审查（招投标/合同风控）、智能翻译（垂直场景）、数据分析看板、自动化工作流。每个模块独立可演进。',
      },
      {
        title: '智能填表引擎——核心创新',
        body: '设计"多源异构抽取"引擎：销售接收的微信截图/PDF合同/邮件正文/语音转写 → OCR+文本解析 → LLM 抽取客户名/联系人/需求/金额 → 匹配档案+商机 → 人工预览确认 → 一键写入 CRM。关键 PM 决策：对用户的"偷懒妥协"是 AI CRM 的核心哲学——不做更好的录入界面，而是让 AI 替你录入。',
      },
      {
        title: '异构系统数据互通',
        body: '打通飞书（消息穿透）、Outlook（邮件同步）、ERP（订单数据）三大异构系统。通过 Webhook 事件驱动架构实现线索智能路由和关键业务节点实时消息通知。爬虫自动化监控与热点资讯推送作为 M8 模块的子系统。',
      },
      {
        title: 'AI 审查+翻译深度集成',
        body: '智能审查模块集成招投标和合同场景：自动审查废标条款/账期风险/违约金比例，业务风控前置。智能翻译模块针对集成商海外软硬件代理业务，提供中英合同与产品手册的垂直场景翻译。',
      },
    ],
    outcome: [
      { metric: '~80%', label: '销售录入工作量骤降' },
      { metric: '数十万$/年', label: '节约 Copilot 授权成本' },
      { metric: '8大模块', label: '主导 0 到 1 产品架构' },
      { metric: '30-40%', label: '销售生产力释放' },
    ],
    reflection: '这是职业生涯中最复杂的项目——同时涉及产品架构设计、AI 能力规划、异构系统集成和组织变革管理。最大的认知突破是：AI CRM 的核心不是"让 CRM 更智能"，而是"让销售更懒"——对用户的偷懒妥协才是 AI 产品的真正价值。但也认识到，一期完成后二期未参与的遗憾——产品价值需要持续迭代才能真正兑现。',
  },
  {
    slug: 'auto-ai-agent',
    title: '头部车企 AI Agent 售后智能化',
    subtitle: '基于 Dify 企业版构建车企售后 AI Agent，故障定位+报价全链路分钟级完成',
    year: '2024-2025',
    role: 'AI 产品经理（解决方案）',
    team: '产品1人 + 开发2人 + 部署2人',
    tags: ['B端', '车企', 'Dify', 'Agent', 'RAG'],
    cover: 'from-rose-700/90 via-pink-600/70 to-red-500/50',
    image: '/images/prototypes/auto-ai-agent-01-kb.png',
    images: [
      { src: '/images/prototypes/auto-ai-agent-01-kb.png', alt: '知识库检索', caption: '维修手册知识库：10万+页跨年份跨车型三维检索，精准匹配' },
      { src: '/images/prototypes/auto-ai-agent-02-diagnose.png', alt: '故障诊断工作流', caption: 'Dify 工作流：故障码→知识库→Tools→报价单，分钟级完成' },
      { src: '/images/prototypes/auto-ai-agent-03-marketing.png', alt: '自动化营销看板', caption: '自动化营销：里程触发维保提醒，数据看板追踪全链路效果' },
    ],
    intro: '作为 Dify 官方合作伙伴，为头部车企（宝马、大众等）售后部门定制化构建 AI Agent 解决方案。将故障定位+报价全链路耗时从 2-3 小时压缩到分钟级，月销 300 万。',
    context: '公司是 Dify 官方合作伙伴，主营 Dify 企业版销售+部署+培训。目标客户是头部车企售后部门。车企技师面临的核心痛点：维修手册分散在 10 万+页 PDF 中，人工翻阅平均 15-20 分钟/次；故障诊断→配件查询→工时计算→客户沟通，多环节易错；4S 店客户维保触达率低，客户流失严重。Dify 企业版售价 30-60 万/套，月销 300 万。',
    problem: '核心挑战是将 Dify 通用平台能力转化为车企售后场景的垂直解决方案：需要处理 10 万+页跨年份跨车型的维修手册知识库检索、与车企官方 App 的系统集成、故障诊断到报价的业务闭环、以及自动化营销触达。通用的 RAG 方案无法满足"车型+年款+系统"三维检索的精度要求。',
    approach: [
      {
        title: 'Dify 工作流编排四大能力',
        body: '基于 Dify 企业版定制化构建四大核心能力：知识库+RAG 智能检索（多格式跨年份维修手册）、Agent 工作流+Tools 工具调用（与车企官方 App 集成，调用车辆档案）、报价管理（故障诊断→维修清单→自动生成标准报价单）、自动化营销+数据看板（行驶里程触发推送+维保提醒）。',
      },
      {
        title: '知识库切片策略设计',
        body: '针对 10 万+页跨年份跨车型维修手册，设计"车型+年款+系统"三维检索切片策略。切片粒度不能过细（丢失上下文）也不能过粗（检索不准）。文档预处理包括 OCR 和非结构化→结构化字段转换。通过意图识别路由精准匹配维修类别。',
      },
      {
        title: 'Tools 工具调用封装',
        body: '把车企 App/工单系统/报价系统的 API 统一封装为 Dify Tools。Token 安全由 Dify 后台管理，前端不暴露。所有 Tool 调用进入审计日志。报价系统集成：Dify 工作流在维修清单生成后自动调用报价 API，一键生成标准报价单。',
      },
      {
        title: '自动化营销与数据闭环',
        body: '行驶里程触发维保提醒（微信/短信双通道），联动全平台矩阵下发推送。数据看板统计 Agent 调用量/检索准确率/工单转化率/客户唤醒率。打通"用户画像识别→工具调用→自动化营销"全链路。',
      },
    ],
    outcome: [
      { metric: '10-30x', label: '故障诊断+报价提速倍数' },
      { metric: '300万/月', label: 'Dify 企业版月销售额' },
      { metric: '30-60万/套', label: 'Dify 企业版单价' },
      { metric: '10万+页', label: '维修手册知识库规模' },
    ],
    reflection: '这个项目让我理解了"平台+应用层定制+服务"的 B 端 AI 商业化模式。Dify 作为通用平台，真正的商业价值在于针对垂直场景的定制化能力。最大的收获是学会了"把外部系统封装为 Agent 工具"的架构思维——AI Agent 不是一个独立系统，而是需要与企业现有系统深度集成的"连接器"。',
  },
]
