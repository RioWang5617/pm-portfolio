import { Link, useParams } from 'react-router-dom'
import { demos } from '../data/vibecoding'

export default function Demo() {
  const { slug } = useParams()
  const d = demos.find((x) => x.slug === slug)

  if (!d) {
    return (
      <div className="mx-auto max-w-prose px-6 md:px-10 py-32 text-center">
        <p className="font-display text-[2rem] italic">Demo 不存在</p>
        <Link to="/vibecoding" className="mt-8 inline-block underline">返回 →</Link>
      </div>
    )
  }

  return (
    <article>
      <header className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Link to="/vibecoding" className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors">
              ← Vibecoding
            </Link>
          </div>
          <div className="md:col-span-10">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-6 num">
              Demo · {d.year} · {d.effort}
            </p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest text-balance">
              {d.title}
            </h1>
            <p className="mt-8 text-[1.18rem] md:text-[1.32rem] text-muted leading-[1.5] max-w-prose text-pretty">
              {d.subtitle}
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              <Meta label="用时" value={d.effort} />
              <Meta label="年份" value={d.year} />
              <Meta label="标签" value={d.tags[0]} />
              <Meta label="源码" value={d.sourceUrl ? (
                <a href={d.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                  GitHub →
                </a>
              ) : '—'} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {d.stack.map((s) => (
                <span key={s} className="text-[0.78rem] px-2.5 py-1 border border-line rounded-full text-muted font-mono">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className="mx-auto max-w-wide px-6 md:px-10 mb-16 reveal">
        {d.embed ? (
          <div className="aspect-[16/9] w-full rounded-sm overflow-hidden border border-line">
            <iframe src={d.embed} className="w-full h-full" title={d.title} />
          </div>
        ) : (
          <div className={`aspect-[16/9] w-full rounded-sm bg-gradient-to-br ${d.cover} flex items-center justify-center`}>
            <p className="font-display italic text-cream/85 text-[1.4rem] md:text-[2rem] tracking-tightest">{d.title}</p>
          </div>
        )}
      </div>

      <Section title="为什么做" eyebrow="01">
        <p>{d.motivation}</p>
      </Section>

      <Section title="怎么做的" eyebrow="02">
        <p>{d.build}</p>
      </Section>

      <Section title="学到的" eyebrow="03">
        <p>{d.whatILearned}</p>
      </Section>

      {/* CTA — prominent demo button */}
      {d.liveUrl && (
        <section className="mx-auto max-w-wide px-6 md:px-10 py-16 border-t border-line/60">
          <div className="flex justify-center">
            <a
              href={d.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-ink text-cream text-[1.1rem] rounded-full hover:bg-vermilion transition-colors shadow-lg"
            >
              打开 demo
              <span className="text-[1.3rem]">→</span>
            </a>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-wide px-6 md:px-10 py-20 border-t border-line/60">
        <Link to="/vibecoding" className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all">
          ← 返回所有 demo
        </Link>
      </section>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted mb-1">{label}</p>
      <p className="text-[0.98rem]">{value}</p>
    </div>
  )
}

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10 py-14 md:py-20 border-t border-line/60">
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
