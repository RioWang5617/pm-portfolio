import { works } from './works'

export const resume = {
  basics: {
    name: 'Wang Tianyang',
    nameZh: '王天阳',
    title: 'AI 产品经理',
    tagline: '3 年 AI 后端与大模型应用开发经验，从 0 到 1 主导多款 AI 产品落地',
    email: 'wy1833411196@gmail.com',
    location: '北京 / 成都',
    social: [],
  },

  summary: '计算机科班出身，技术型 AI 产品经理。精通 Dify/Coze Agent 工作流编排、RAG 知识库搭建、VibeCoding 模式开发。曾主导车企 AI 客服（月销售额 300 万）、AI CRM（自研 Copilot）、政务智能引擎（92.5% 召回率）、教育数字人等多款产品从 0 到 1 落地。',

  experience: [
    {
      company: '北京昆仑联通科技发展股份有限公司',
      role: 'AI 产品经理',
      period: '2025.09 - 至今',
      location: '北京',
      highlights: [
        '主导车企 AI 智能客服系统：从售前需求调研到产品架构设计，走访宝马、大众等头部车企售后场景，定义 6 大核心模块（维修知识库、AI Agent 编排、智能检索、报价生成、企微集成、数据看板）',
        '基于 Dify 构建专有维修知识库（10 万+ 条目结构化），实现故障诊断精准定位与车辆配置秒级检索',
        '推动公司成为 Dify 官方合作伙伴，助力实现月销售额 300 万的商业化目标',
        '主导自研 AI CRM（Copilot 方向）：设计智能填表引擎，从多源异构信息中自动提取关键字段一键写入，销售手动录入减少约 80%',
        '完成 8 大核心模块产品设计（客户画像、智能填表、销售流程、AI 销售助手、合同审查、翻译、看板、自动化工作流）',
        '设计爬虫监控 + 热点资讯推送系统，打通 Webhook/飞书/Outlook',
      ],
    },
    {
      company: '北京职此青绿科技有限公司',
      role: 'AI 产品经理（中台与应用方向）',
      period: '2024.08 - 2025.08',
      location: '北京',
      highlights: [
        '主导跨国新闻 AI 数据中台：设计"前端智能化处理 + 后端精细化管控"的 B 端 SaaS 产品',
        '设计多格式文档解析、AI 核心要点抽取、多国语言翻译与自动汇总工作流',
        '设计大模型动态路由机制，智能匹配最优模型',
        '独立完成 RBAC 角色权限管控与「子公司上传→母公司审核→自动归档」审批闭环',
        '搭建可视化 AI 资产管理控制台，支持模型 API 状态监控与限流策略',
        '沉淀通用 Prompt 模板，避免终端用户修改复杂 Prompt',
      ],
    },
    {
      company: '成都聚创新意智能科技有限公司',
      role: 'AI 应用产品经理',
      period: '2022.08 - 2024.08',
      location: '成都',
      highlights: [
        '主导政务智能引擎：为政务机关提供档案系统 AI 智能化升级方案',
        '将 10,000+ 份非结构化政务文本结构化梳理，构建高质量知识库底层数据',
        '基于 LlamaIndex 设计 RAG 检索增强策略，知识召回率提升至 92.5%',
        '结合 Qwen-32B 设计自动物料处理流水线，特征准确率 99.7%',
        '主导儿童教育 AI 数字人：从 0 到 1 规划 AI 虚拟数字人产品',
        '整合 ASR/TTS 语音识别合成与 Wav2Lip 唇形同步技术，实现多模态交互',
        '构建教育垂类 RAG 知识库，确保数字人互动内容的安全与准确性',
      ],
    },
  ],

  education: [
    {
      school: '河北工程大学科信学院',
      degree: '本科 · 计算机科学与技术',
      period: '2018 - 2022',
      notes: '',
    },
  ],

  skills: [
    { group: '产品', items: ['需求分析', '竞品调研', 'PRD 编写', 'Axure', 'Figma', 'Xmind', '产品架构'] },
    { group: 'AI', items: ['Agent 工作流', 'RAG 知识库', 'Prompt 工程', 'VibeCoding', 'Dify', 'Coze', 'LlamaIndex', 'Qwen'] },
    { group: '技术', items: ['Python', 'MySQL', 'RAGFlow', '多模态交互', 'ASR/TTS', 'Wav2Lip'] },
  ],

  awards: [],

  selectedProjects: works.slice(0, 3).map((w: { slug: string; title: string; year: string }) => ({
    slug: w.slug,
    title: w.title,
    year: w.year,
  })),
}

export type Resume = typeof resume
