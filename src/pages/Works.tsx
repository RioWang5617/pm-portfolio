import { Link } from 'react-router-dom'
import { works } from '../data/works'

export default function Works() {
  return (
    <div>
      <section className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Works
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="font-display text-[3rem] md:text-[5rem] leading-[0.95] tracking-tightest text-balance">
              <em>做过的事。</em>
              <br />
              <em>踩过的坑。</em>
            </h1>
            <p className="mt-10 max-w-prose text-[1.08rem] text-muted leading-[1.65]">
              挑了 {works.length} 个能讲透的项目。每个案例都按"背景 → 问题 → 过程 → 结果 → 复盘"写，
              强迫自己结构化思考。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          {works.map((w, i) => (
            <Link
              key={w.slug}
              to={`/works/${w.slug}`}
              className="group block border-b border-line/60 py-14 md:py-20 reveal"
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-2">
                  <span className="font-mono text-[0.85rem] text-muted num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-muted">
                    {w.year}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-display text-[1.8rem] md:text-[2.6rem] leading-[1.05] tracking-tightest group-hover:italic transition-all text-balance">
                    {w.title}
                  </h2>
                  <p className="mt-4 text-[1.05rem] text-muted max-w-prose">
                    {w.subtitle}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
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
                <div className="md:col-span-3 md:text-right">
                  <p className="text-[0.95rem] text-ink">{w.role}</p>
                  <p className="text-[0.85rem] text-muted mt-1">{w.team}</p>
                  <span className="mt-5 inline-block text-[0.9rem] underline decoration-line underline-offset-[6px] group-hover:decoration-ink">
                    读案例 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
