export type Demo = {
  slug: string
  title: string
  subtitle: string
  year: string
  stack: string[]
  effort: string
  tags: string[]
  cover: string
  image?: string
  motivation: string
  build: string
  whatILearned: string
  liveUrl?: string
  sourceUrl?: string
  embed?: string
}

export const demos: Demo[] = [
  {
    slug: 'prd-reviewer',
    title: 'AI 合同审查助手',
    subtitle: '上传一份合同，AI 自动识别风险条款并提出修改建议',
    year: '2025',
    stack: ['Dify', 'Claude', 'Python'],
    effort: '周末 2 天',
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
  },
  {
    slug: 'interview-cluster',
    title: '爬虫状态监控 + 热点资讯推送',
    subtitle: '打通 Webhook/飞书/Outlook 的实时监控与自动化触达系统',
    year: '2025',
    stack: ['Python', 'Webhook', '飞书', 'Outlook'],
    effort: '3 个晚上',
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
  },
]
