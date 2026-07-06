import { Link } from 'react-router-dom'
import { demos } from '../data/vibecoding'

export default function Vibecoding() {
  return (
    <div>
      <section className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Vibecoding
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="font-display text-[3rem] md:text-[5rem] leading-[0.95] tracking-tightest text-balance">
              <em>PRD 写完了，</em>
              <br />
              <em>顺手把代码也写了。</em>
            </h1>
            <p className="mt-10 max-w-prose text-[1.08rem] text-muted leading-[1.65]">
              AI 时代的产品经理，最被低估的能力是"自己把东西做出来"。
              过去 12 个月我做了 6 个工具，挑了 {demos.length} 个最实用的放在这里。
              每个都标注了：用时、栈、学到的东西。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            {demos.map((d) => (
              <Link
                key={d.slug}
                to={`/vibecoding/${d.slug}`}
                className="group block reveal"
              >
                <div className="border border-line rounded-sm p-8 h-full hover:border-ink transition-colors">
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <span className="font-mono text-[0.78rem] text-muted num">
                      {d.year}
                    </span>
                    <span className="text-[0.78rem] text-muted">{d.effort}</span>
                  </div>
                  <div
                    className={`aspect-[5/3] rounded-sm bg-gradient-to-br ${d.cover} mb-6`}
                  />
                  <h2 className="font-display text-[1.6rem] md:text-[1.9rem] leading-[1.1] tracking-tightest group-hover:italic transition-all text-balance">
                    {d.title}
                  </h2>
                  <p className="mt-3 text-[1rem] text-muted">{d.subtitle}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {d.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[0.74rem] px-2 py-0.5 border border-line rounded-full text-muted font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-block text-[0.92rem] underline decoration-line underline-offset-[6px] group-hover:decoration-ink">
                    看实现细节 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
