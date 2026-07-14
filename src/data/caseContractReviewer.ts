import type { CaseStudyData } from '../pages/CaseStudyPage'

const data: CaseStudyData = {
  slug: 'contract-reviewer',
  title: 'AI 合同审查助手',
  subtitle: '上传合同文档，AI 逐条审查风险并生成可视化报告',
  description: '通过 AI 自动识别合同类型、拆分条款、逐条审查风险，将原本数小时的人工审查压缩到分钟级。',
  year: '2025',
  stack: ['Python', 'Claude', 'Dify', 'FastAPI'],
  coverImage: '/images/prototypes/01-home.png',
  coverQuote: '「合同审查的价值不在"读完"，在"发现问题"——AI 最大的优势不是速度快，是它不会遗漏任何一条风险。」',

  motivation: {
    paragraphs: [
      '帮朋友审一份租房合同的时候发现一个扎心的事实：<strong>大多数人签合同根本不看条款</strong>。不是不想看，是看不懂——法律术语堆砌、条款之间交叉引用、免责条款藏在犄角旮旯，普通人读完一份合同至少要两三个小时，还不一定找得到关键风险点。',
      '企业法务同样痛苦。一份供应商合同动辄 50-80 页，人工逐条审查需要<strong>半天到一天</strong>。更麻烦的是，不同法务的审查标准不统一——张三觉得没问题的条款，李四可能觉得有风险。<strong>审查质量完全依赖个人经验</strong>，没有标准化、没有可追溯性。',
      '于是我做了一个工具：上传合同（PDF/Word/图片），AI 自动识别合同类型、拆分条款、逐条审查风险点，并与企业标准模板进行合规比对。最终生成一份<strong>可视化的风险审查报告</strong>——哪些条款有问题、风险等级多高、建议怎么改，一目了然。不是替代法务，是帮法务把"大海捞针"变成"精准定位"。',
    ],
    highlights: [
      {
        icon: 'shield',
        title: '逐条审查',
        desc: 'AI 自动拆分条款并逐条分析风险点，标注高/中/低风险等级，不遗漏任何细节',
      },
      {
        icon: 'search',
        title: '智能识别',
        desc: '支持 PDF/Word/图片多格式上传，自动识别合同类型（租房/劳动/借贷/招投标等）',
      },
      {
        icon: 'clipboard',
        title: '合规比对',
        desc: '支持上传企业标准模板，自动逐条对比差异，偏离部分高亮标注',
      },
    ],
  },

  architecture: {
    description:
      '系统采用<strong>五层架构</strong>：展示层提供 Web 应用和 OA 集成入口，接入层处理鉴权和文件上传，核心服务层驱动文档解析、条款拆分、风险审查和合规比对，AI 能力层基于 Claude 和法律知识库完成语义理解和风险判断，数据层存储文档、审查记录和向量检索数据。数据流从展示层向下经过核心服务层处理后返回可视化报告。',
    layers: [
      {
        title: '展示层',
        items: ['Web 应用 · 独立部署入口', 'OA 集成模块 · 嵌入企业审批流程', '模型配置页 · 自定义 AI 模型管理'],
        color: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
      },
      {
        title: '核心服务层',
        items: ['文档解析引擎 · PDF/Word/OCR', '合同类型识别 · 自动分类模型', '条款拆分引擎 · 结构化提取', '风险审查引擎 · 逐条分析+评分', '合规比对引擎 · 企业标准差异检测'],
        color: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30',
      },
      {
        title: 'AI 能力层',
        items: ['Claude 大模型 · 语义理解/条款解读', '法律知识库 · 法规条文/司法解释', 'OCR 识别模型 · 图片文字提取', '合同模板库 · 标准条款/行业模板'],
        color: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
      },
      {
        title: '数据层',
        items: ['文档存储 · OSS/MinIO', '结构化数据库 · 审查记录/用户配置', '向量数据库 · 法律知识检索 RAG', '缓存层 · Redis 热点数据'],
        color: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
      },
    ],
  },

  featureModules: [
    {
      icon: 'upload',
      title: '文档上传与解析',
      desc: '支持多格式合同文档上传，AI 自动完成文本提取和结构化处理',
      features: [
        'PDF（含扫描件 OCR）/ Word / 图片格式全支持',
        '单文件最大 50MB，企业版支持批量上传（最多 20 份）',
        '合同类型自动识别（招投标/租房/劳动/借贷/其他）',
        '条款智能拆分，输出结构化条款列表',
      ],
    },
    {
      icon: 'shield',
      title: '风险审查引擎',
      desc: '逐条分析合同条款，从法律视角识别风险并生成修改建议',
      features: [
        '不合理免责条款检测（如"甲方不承担任何责任"）',
        '模糊表述识别（如"合理的""适当的"等未定义术语）',
        '权利义务失衡分析（单方面免责、违约金比例过高）',
        '签章与日期验证（电子章有效性、合同期限、时效性）',
        '风险等级划分（高/中/低），按优先级排序',
      ],
    },
    {
      icon: 'git-compare',
      title: '企业合规比对',
      desc: '上传企业标准模板，自动逐条对比差异并高亮偏离内容',
      features: [
        '企业标准条款库自动构建',
        '逐条语义匹配（完全一致/部分偏离/严重不符/未覆盖）',
        '偏离内容高亮标注，提供偏离程度汇总统计',
        '适用于供应商合同、招投标文件等标准化审查场景',
      ],
    },
    {
      icon: 'file-text',
      title: '可视化审查报告',
      desc: '生成结构化的风险审查报告，支持导出和集成',
      features: [
        '首页展示总体风险评分（0-100）和一句话建议',
        '逐条风险点与原文段落定位关联',
        '每个风险点附带具体修改建议文本',
        '一键导出 PDF，支持打印和归档',
        'RESTful API 接口，支持 OA 系统 Webhook 集成',
      ],
    },
  ],

  flows: [
    {
      title: '合同审查主流程',
      description: '从用户上传合同到生成审查报告的端到端流程',
      steps: [
        { label: '上传合同', icon: 'upload' },
        { label: '格式识别', icon: 'file-text', sub: 'PDF / Word / 图片' },
        { label: '文本提取', icon: 'type', sub: 'OCR / 解析引擎' },
        { label: '类型识别', icon: 'search', sub: '自动分类合同类型' },
        { label: '条款拆分', icon: 'list', sub: '结构化提取条款' },
        { label: '风险审查', icon: 'shield', sub: '逐条分析风险', accent: true },
        { label: '合规比对', icon: 'git-compare', sub: '企业标准对比' },
        { label: '生成报告', icon: 'file-text', sub: '风险评分+修改建议' },
      ],
    },
    {
      title: '多轮追问对话流程',
      description: 'AI 通过结构化追问帮助用户理清合同审查需求',
      steps: [
        { label: '选择合同类型', icon: 'tag' },
        { label: '上传文档', icon: 'upload' },
        { label: 'AI 识别拆分', icon: 'cpu' },
        { label: '风险分析', icon: 'shield', accent: true },
        { label: '输出报告', icon: 'check' },
      ],
    },
  ],

  prototypes: [
    {
      label: '合同上传页',
      desc: '支持拖拽上传和点击选择，展示支持的文件格式和大小限制',
      image: '/images/prototypes/02-upload.png',
    },
    {
      label: '风险审查报告页',
      desc: '首页展示总体风险评分和一句话建议，逐条展示风险点与修改建议',
      image: '/images/prototypes/04-report-risk.png',
    },
    {
      label: '条款对比视图',
      desc: '左侧原始条款，右侧风险分析和修改建议，支持定位跳转',
      image: '/images/prototypes/04-report-risk.png',
    },
    {
      label: '合规比对结果页',
      desc: '逐条展示与企业标准的匹配结果，偏离内容高亮标注',
      image: '/images/prototypes/04-report-risk.png',
    },
  ],

  challenges: [
    {
      problem: '法律术语语义理解难度高',
      detail: '合同条款中充满专业法律术语、交叉引用和条件嵌套，通用大模型容易误判风险等级或遗漏隐含风险。',
      solution: '构建法律知识 RAG 系统，将法规条文、司法解释和行业标准合同作为检索源，为 Claude 提供专业上下文，确保风险判断有据可依。',
    },
    {
      problem: '多格式文档解析一致性',
      detail: 'PDF 扫描件、Word 文档、图片的文本提取质量差异大，扫描件 OCR 可能产生识别错误，影响后续条款拆分和风险分析的准确性。',
      solution: '采用多引擎并行策略：PDF 优先用文本层提取，降级走 OCR；Word 保留格式结构；图片走高精度 OCR 并标注置信度，低于阈值时提示用户确认。',
    },
    {
      problem: '企业标准模板的灵活性与规范性平衡',
      detail: '不同企业的合同标准差异巨大，有的企业条款非常详细，有的只有框架性要求。一刀切的比对规则会导致误报。',
      solution: '设计可配置的比对规则引擎：支持完全一致/宽松匹配/自定义阈值三档，企业可根据自身需求调整，平衡覆盖率和误报率。',
    },
  ],

  techStack: [
    { layer: 'AI 引擎', tech: 'Claude 3.5 Sonnet', reason: '长文本理解能力强，适合合同全文分析和结构化输出' },
    { layer: '工作流编排', tech: 'Dify', reason: '可视化编排多步 AI 工作流，支持条件分支和循环调用' },
    { layer: 'API 层', tech: 'FastAPI', reason: '高性能异步框架，适合文件上传和异步审查任务' },
    { layer: '向量检索', tech: 'ChromaDB', reason: '轻量级向量数据库，适合法律知识库 RAG 检索' },
    { layer: '文档解析', tech: 'PyMuPDF + python-docx', reason: '成熟的 PDF/Word 解析库，支持文本提取和结构化' },
    { layer: '前端', tech: 'React + Tailwind CSS', reason: '快速构建审查报告可视化界面' },
  ],

  metrics: [
    { icon: 'clock', label: '审查耗时', value: '≤ 2 分钟', desc: '常规合同文档从上传到出报告的平均时间' },
    { icon: 'target', label: '风险识别率', value: '≥ 90%', desc: '高风险条款的识别准确率（人工评估）' },
    { icon: 'zap', label: '效率提升', value: '10-30x', desc: '对比人工审查的速度提升倍数' },
    { icon: 'check', label: '用户满意度', value: '≥ 85%', desc: '审查结果"准确/有误"反馈中的准确率' },
  ],

  insights: [
    {
      title: '合同审查的核心不是"读完"，是"发现问题"',
      desc: '很多人以为合同审查就是"逐字阅读"，但真正的价值在于从数百条条款中精准定位风险点。AI 最大的优势不是速度快，是不会遗漏。',
    },
    {
      title: '企业合规比对是真正的刚需',
      desc: '个人用户的合同审查需求是偶发的，但企业法务每周要审查几十份合同。标准化的合规比对功能才是企业版的核心付费点。',
    },
    {
      title: '法律 AI 需要"有据可依"',
      desc: '纯粹靠大模型"自由发挥"做法律判断是危险的。必须结合法律知识库 RAG，让每个风险判断都引用具体法条，才能建立用户信任。',
    },
    {
      title: '可配置性决定企业落地',
      desc: '不同企业的合同标准差异巨大，一套固定的审查规则无法满足所有客户。可配置的比对规则和阈值是企业版成功落地的关键。',
    },
  ],

  closingQuote: '「AI 合同审查不是替代法务，是帮法务把"大海捞针"变成"精准定位"——让每一个风险点都有据可查、有据可依。」',
}

export default data
