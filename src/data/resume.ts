import { works } from './works'

export const resume = {
  basics: {
    name: 'Lin Yue',
    nameZh: '林越',
    title: 'AI 产品经理',
    tagline: '把模糊需求变成可上线的产品。',
    email: 'linyue.pm@example.com',
    location: '上海',
    social: [
      { label: 'GitHub', href: 'https://github.com/your-handle' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
      { label: '小红书', href: 'https://xiaohongshu.com/user/your-handle' },
    ],
  },

  summary: '5 年产品经验，过去 2 年专注 AI 应用层。做过客服 Agent、销售 RAG、面试评测系统。现在在找一支认真做 AI 产品的团队。',

  experience: [
    {
      company: '某跨境电商 SaaS',
      role: 'AI 产品负责人',
      period: '2024 - 至今',
      location: '上海',
      highlights: [
        '上线 AI 客服 Agent，自动解决率 18% → 67%，月省 380 万',
        '建立 1000 条评测集，让所有 prompt/模型迭代靠数据而非感觉',
        '设计 12 个"立即转人工"触发条件，0 起涉及金钱的失误',
      ],
    },
    {
      company: '某消费金融公司',
      role: '高级产品经理',
      period: '2022 - 2024',
      location: '上海',
      highlights: [
        '从 0 到 1 做 AI 销售助手，DAU 翻倍',
        '跨 4 个团队协调：算法 / 工程 / 风控 / 业务',
      ],
    },
    {
      company: '某互联网公司',
      role: '产品经理',
      period: '2020 - 2022',
      location: '北京',
      highlights: [
        '负责核心 DAU 功能，NPS +15pt',
        '带 2 名产品助理',
      ],
    },
  ],

  education: [
    {
      school: '复旦大学',
      degree: '管理学学士',
      period: '2016 - 2020',
      notes: '辅修计算机科学',
    },
  ],

  skills: [
    { group: '产品', items: ['用户研究', '策略规划', '数据分析', 'PRD 撰写', '跨团队协作'] },
    { group: 'AI', items: ['RAG', 'Agent', 'Prompt 工程', 'Embedding', '评测集设计'] },
    { group: '工具', items: ['Figma', 'SQL', 'Python', 'Cursor', 'Vercel', 'Supabase'] },
  ],

  awards: [
    '2024 年公司年度优秀 PM（Top 5%）',
    '2023 年复旦校友 AI 产品黑客松一等奖',
  ],

  selectedProjects: works.map((w) => ({ slug: w.slug, title: w.title, year: w.year })),
}

export type Resume = typeof resume
