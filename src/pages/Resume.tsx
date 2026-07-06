import { profile } from '../data/profile'

const experience = [
  {
    period: '2023 — Now',
    role: 'AI 产品负责人',
    company: '某跨境电商 SaaS',
    points: [
      '从 0 到 1 主导 AI 客服 Agent，覆盖日均 12 万通对话',
      '建立 AI 产品评测体系，被 4 个产品线复用',
      '带 1 名算法工程师 + 2 名全栈，跨 6 个团队协作',
    ],
  },
  {
    period: '2021 — 2023',
    role: '高级产品经理',
    company: '内容社区 App',
    points: [
      '0 到 1 上线"AI 创作工具"，90 天日活破 30 万',
      '主导用户增长实验 23 个，沉淀 3 个可持续获客模型',
      '与算法团队共建内容冷启动机制',
    ],
  },
  {
    period: '2020 — 2021',
    role: '产品经理',
    company: '企业服务公司',
    points: [
      '负责 RAG 知识库项目，准确率从 78% 提升至 92%',
      '搭建内部产品研发流程，需求评审周期缩短 40%',
      '作为 PM 代表参与 3 个客户深度共创',
    ],
  },
  {
    period: '2019 — 2020',
    role: '产品助理 → 产品经理',
    company: '互联网金融',
    points: [
      '负责 C 端投资工具从 0 到 1',
      '主导用户研究项目 12 个，输出 3 份关键报告',
    ],
  },
]

const skills = {
  产品: ['用户研究', 'PRD / BRD', '数据驱动决策', 'A/B 测试', 'Roadmap'],
  AI: ['Prompt 工程', 'RAG 架构', 'Agent 设计', '评测体系', 'LangChain / Dify'],
  工程: ['React / Next.js', 'SQL', 'Python', 'Cursor / Claude Code', 'Vercel / Supabase'],
  协作: ['跨团队协调', 'Scrum', 'OKR', 'Figma / 原型'],
}

export default function Resume() {
  return (
    <div>
      <section className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Resume
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="font-display text-[3rem] md:text-[5rem] leading-[0.95] tracking-tightest text-balance">
              <em>一份</em>
              <br />
              <em>诚实的简历。</em>
            </h1>
            <p className="mt-10 max-w-prose text-[1.08rem] text-muted leading-[1.65]">
              不夸大、不堆砌形容词。事实、角色、数字、复盘，全部白纸黑字。
            </p>

            {/* Top meta grid */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl border-t border-line pt-8">
              <Meta label="经验" value="5 年" />
              <Meta label="所在地" value={profile.location} />
              <Meta label="方向" value="AI 产品" />
              <Meta label="状态" value="看机会" />
            </div>

            <div className="mt-10">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full text-[0.95rem] hover:bg-accent transition-colors"
              >
                下载 PDF 简历
                <span>↓</span>
              </a>
              <p className="mt-3 text-[0.85rem] text-muted">
                提示：把简历 PDF 放在 <code className="font-mono">public/resume.pdf</code>，
                并把上面按钮的链接改成 <code className="font-mono">/resume.pdf</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20 border-t border-line/60">
        <h2 className="font-display text-[2.2rem] md:text-[3rem] tracking-tightest mb-14">
          <em>经历</em>
        </h2>
        <div className="space-y-14">
          {experience.map((e) => (
            <div key={e.period} className="grid md:grid-cols-12 gap-8 border-t border-line/60 pt-10 reveal">
              <div className="md:col-span-3">
                <p className="font-mono text-[0.85rem] text-muted num">{e.period}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-[1.5rem] md:text-[1.8rem] tracking-tightest">
                  {e.role}
                </h3>
                <p className="text-[1rem] text-muted mt-1">{e.company}</p>
                <ul className="mt-5 space-y-2 text-[1.02rem] leading-[1.7]">
                  {e.points.map((p) => (
                    <li key={p} className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-muted">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20 border-t border-line/60">
        <h2 className="font-display text-[2.2rem] md:text-[3rem] tracking-tightest mb-14">
          <em>技能</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="reveal">
              <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-4">
                {cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="text-[0.92rem] px-3 py-1.5 border border-line rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20 border-t border-line/60">
        <h2 className="font-display text-[2.2rem] md:text-[3rem] tracking-tightest mb-14">
          <em>教育</em>
        </h2>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="font-mono text-[0.85rem] text-muted num">2015 — 2019</p>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-display text-[1.5rem] md:text-[1.8rem] tracking-tightest">
              某 985 · 信息管理与信息系统
            </h3>
            <p className="text-[1rem] text-muted mt-1">本科</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted mb-1">
        {label}
      </p>
      <p className="font-display text-[1.4rem] tracking-tightest">{value}</p>
    </div>
  )
}
