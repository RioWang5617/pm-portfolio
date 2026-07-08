import { Link, useParams } from 'react-router-dom'
import { works } from '../data/works'
import { SidebarNav } from '../components/SidebarNav'

export default function CaseStudy() {
  const { slug } = useParams()
  const w = works.find((x) => x.slug === slug)

  if (!w) {
    return (
      <div className="mx-auto max-w-prose px-6 md:px-10 py-32 text-center">
        <p className="font-display text-[2rem] italic">案例不存在</p>
        <Link to="/works" className="mt-8 inline-block underline">
          返回作品集 →
        </Link>
      </div>
    )
  }

  const sidebarSections = [
    { id: 'overview', label: '概述' },
    { id: 'context', label: '背景' },
    { id: 'problem', label: '问题' },
    { id: 'approach', label: '过程' },
    { id: 'outcome', label: '结果' },
    { id: 'reflection', label: '反思' },
  ]

  return (
    <article>
      <SidebarNav sections={sidebarSections} />
      {/* HERO */}
      <header id="overview" className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/works"
              className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
            >
              ← Works
            </Link>
          </div>
          <div className="md:col-span-10">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-8 num">
              Case · {w.year} · {w.role}
            </p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest text-balance">
              {w.title}
            </h1>
            <p className="mt-8 text-[1.18rem] md:text-[1.32rem] text-muted leading-[1.5] max-w-prose text-pretty">
              {w.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {w.tags.map((t) => (
                <span
                  key={t}
                  className="text-[0.78rem] px-2.5 py-1 border border-line rounded-full text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className="mx-auto max-w-wide px-6 md:px-10 mb-20 md:mb-28 reveal">
        <div
          className={`aspect-[21/9] w-full rounded-sm bg-gradient-to-br ${w.cover} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display italic text-cream/85 text-[1.2rem] md:text-[1.8rem] leading-snug max-w-prose text-center px-8">
              「{w.intro}」
            </p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <section className="mx-auto max-w-prose px-6 md:px-10">
        <p className="font-display text-[1.4rem] md:text-[1.7rem] leading-[1.4] tracking-tight text-balance reveal">
          {w.intro}
        </p>
      </section>

      {/* CONTEXT */}
      <Section id="context" title="背景" eyebrow="01">
        <p>{w.context}</p>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" title="问题" eyebrow="02">
        <p>{w.problem}</p>
      </Section>

      {/* APPROACH */}
      <Section id="approach" title="过程" eyebrow="03">
        <div className="space-y-12">
          {w.approach.map((a, i) => (
            <div key={a.title} className="reveal">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-[0.78rem] text-muted num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[1.5rem] md:text-[1.8rem] tracking-tightest">
                  {a.title}
                </h3>
              </div>
              <p className="text-muted leading-[1.7] pl-10">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OUTCOME */}
      <Section id="outcome" title="结果" eyebrow="04">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {w.outcome.map((o) => (
            <div key={o.label} className="reveal">
              <p className="font-display text-[2.4rem] md:text-[3rem] leading-none tracking-tightest">
                {o.metric}
              </p>
              <p className="mt-3 text-[0.85rem] text-muted leading-snug">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* REFLECTION */}
      <Section id="reflection" title="如果重来" eyebrow="05">
        <p className="text-pretty">{w.reflection}</p>
      </Section>

      {/* NEXT */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-20 md:py-28 border-t border-line/60">
        <Link
          to="/works"
          className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all"
        >
          ← 返回所有作品
        </Link>
      </section>
    </article>
  )
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-wide px-6 md:px-10 py-14 md:py-20 border-t border-line/60">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <p className="font-mono text-[0.78rem] text-muted num">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.8rem] md:text-[2.2rem] tracking-tightest leading-none">
            <em>{title}</em>
          </h2>
        </div>
        <div className="md:col-span-10 max-w-prose text-[1.05rem] md:text-[1.1rem] leading-[1.75] text-ink/90">
          {children}
        </div>
      </div>
    </section>
  )
}
