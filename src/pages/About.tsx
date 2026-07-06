import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

const timeline = [
  { year: '2024', title: 'AI 产品负责人', body: '在跨境电商 SaaS 把 AI Agent 推到日均 12 万通对话。' },
  { year: '2022', title: '高级 PM', body: '内容社区从 0 到 1 上线 AI 创作工具，90 天 30 万日活。' },
  { year: '2020', title: 'PM', body: '企业服务 RAG 项目，把幻觉问题做成产品机制解决。' },
  { year: '2019', title: '入行', body: '互联网金融，做 C 端投资工具。' },
  { year: '2015', title: '大学', body: '某 985 · 信息管理与信息系统。' },
]

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              About
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="font-display text-[3rem] md:text-[5rem] leading-[0.95] tracking-tightest text-balance">
              <em>我是 {profile.nameZh}。</em>
            </h1>
            <p className="mt-12 max-w-prose text-[1.18rem] md:text-[1.32rem] leading-[1.6] text-pretty">
              <em>{profile.pitch}</em>
            </p>
          </div>
        </div>
      </section>

      {/* BELIEF */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20 border-t border-line/60">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Belief
            </p>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-[2.2rem] md:text-[3rem] tracking-tightest leading-[1.1] text-balance mb-12">
              <em>我相信的事。</em>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
              <Belief
                num="01"
                title="产品经理不是功能经理"
                body="把功能堆上线很容易。把功能做对、让用户用得起来、让公司赚到钱，是另一件事。"
              />
              <Belief
                num="02"
                title="AI 是放大器，不是替代品"
                body="AI 替我做不了判断。它能做的是把判断的吞吐量放大 100 倍，然后让我专注在最该判断的事上。"
              />
              <Belief
                num="03"
                title="不写代码的 PM，会被时代甩开"
                body="不是说必须写生产代码，而是必须能 prototype、能和工程师同频、能用 AI 工具自己把想法跑通。"
              />
              <Belief
                num="04"
                title="诚实比优秀重要"
                body="招我的人会看到我没做成的事，比看到我做成了的事更重要。"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20 border-t border-line/60">
        <h2 className="font-display text-[2.2rem] md:text-[3rem] tracking-tightest mb-14">
          <em>时间线</em>
        </h2>
        <div className="space-y-10">
          {timeline.map((t) => (
            <div key={t.year} className="grid md:grid-cols-12 gap-8 border-t border-line/60 pt-8 reveal">
              <div className="md:col-span-2">
                <p className="font-mono text-[0.85rem] text-muted num">{t.year}</p>
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display text-[1.4rem] md:text-[1.7rem] tracking-tightest">
                  {t.title}
                </h3>
                <p className="text-muted mt-2 text-[1.02rem] leading-[1.65] max-w-prose">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32 border-t border-line/60 text-center">
        <p className="font-display text-[2.4rem] md:text-[3.6rem] leading-[1.0] tracking-tightest text-balance">
          <em>如果你的团队正在认真做 AI 产品，</em>
          <br />
          <em>我想聊聊。</em>
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-block mt-12 bg-ink text-cream px-7 py-4 rounded-full text-[1rem] hover:bg-accent transition-colors"
        >
          {profile.email} →
        </a>
      </section>
    </div>
  )
}

function Belief({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[0.78rem] text-muted num mb-3">{num}</p>
      <h3 className="font-display text-[1.4rem] md:text-[1.6rem] tracking-tightest leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-muted text-[1.02rem] leading-[1.7]">{body}</p>
    </div>
  )
}
