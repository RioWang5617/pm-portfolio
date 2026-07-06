import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { works } from '../data/works'
import { demos } from '../data/vibecoding'

export default function Home() {
  const featured = works[0]
  const featuredDemo = demos[0]

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-wide px-6 md:px-10 pt-24 md:pt-36 pb-24 md:pb-40">
          <div className="grid md:grid-cols-12 gap-y-12 gap-x-8">
            <div className="md:col-span-2">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                Portfolio
                <br />
                2025
              </p>
            </div>
            <div className="md:col-span-10">
              <h1 className="font-display font-light text-[2.8rem] sm:text-[4rem] md:text-[5.6rem] lg:text-[7rem] leading-[0.95] tracking-tightest text-balance">
                <span className="italic">把模糊的需求，</span>
                <br />
                <span>变成</span>{' '}
                <span className="italic">可上线</span>
                <span>的产品。</span>
              </h1>
              <p className="mt-10 md:mt-14 max-w-prose text-[1.08rem] md:text-[1.18rem] leading-[1.65] text-muted text-pretty">
                {profile.subtitle}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  to="/works"
                  className="group inline-flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full text-[0.95rem] hover:bg-accent transition-colors"
                >
                  查看作品集
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-[0.95rem] text-ink underline decoration-line underline-offset-[6px] hover:decoration-ink transition-colors"
                >
                  下载简历
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap gap-2">
                {profile.capabilities.map((c, i) => (
                  <span
                    key={c}
                    className="text-[0.85rem] px-3 py-1.5 border border-line rounded-full text-muted num"
                  >
                    {String(i + 1).padStart(2, '0')} · {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                Featured
                <br />
                Case
              </p>
            </div>
            <div className="md:col-span-10">
              <Link to={`/works/${featured.slug}`} className="group block reveal">
                <div className="aspect-[16/9] w-full rounded-sm bg-gradient-to-br overflow-hidden mb-8 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${featured.cover}`} />
                  <div className="absolute inset-0 flex items-end p-8 md:p-12">
                    <p className="font-display italic text-cream/90 text-[1.1rem] md:text-[1.4rem] leading-snug max-w-prose">
                      「让 AI 替客服回答 60% 的重复问题」——一次把 AI Agent 从概念推到日均 12 万通对话的过程。
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-6 flex-wrap">
                  <h2 className="font-display text-[1.8rem] md:text-[2.6rem] leading-[1.05] tracking-tightest group-hover:italic transition-all">
                    {featured.title}
                  </h2>
                  <span className="text-[0.9rem] text-muted num">{featured.year} · {featured.role}</span>
                </div>
                <p className="mt-3 text-[1.05rem] text-muted max-w-prose">{featured.subtitle}</p>
                <span className="mt-6 inline-block text-[0.95rem] underline decoration-line underline-offset-[6px] group-hover:decoration-ink">
                  读完整案例 →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VIBECODING TEASER */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">Vibecoding</p>
            </div>
            <div className="md:col-span-10">
              <h2 className="font-display text-[2.4rem] md:text-[3.6rem] leading-[1.0] tracking-tightest mb-10">
                <em>不只写 PRD，</em>
                <br />
                <em>也写代码。</em>
              </h2>
              <p className="max-w-prose text-[1.08rem] text-muted mb-12 text-pretty">
                过去 12 个月，我用 Cursor + Claude 做了 6 个小工具。下面挑了一个最实用的——PRD 评审助手。
              </p>
              <Link to={`/vibecoding/${featuredDemo.slug}`} className="group block reveal">
                <div className="border border-line rounded-sm p-8 md:p-12 hover:border-ink transition-colors">
                  <div className="flex items-baseline justify-between gap-6 flex-wrap mb-4">
                    <h3 className="font-display text-[1.6rem] md:text-[2.2rem] tracking-tightest group-hover:italic transition-all">
                      {featuredDemo.title}
                    </h3>
                    <span className="text-[0.9rem] text-muted num">{featuredDemo.effort}</span>
                  </div>
                  <p className="text-[1.05rem] text-muted mb-6">{featuredDemo.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredDemo.stack.map((s) => (
                      <span key={s} className="text-[0.78rem] px-2.5 py-1 border border-line rounded-full text-muted font-mono">{s}</span>
                    ))}
                  </div>
                  <span className="text-[0.95rem] underline decoration-line underline-offset-[6px] group-hover:decoration-ink">
                    看看怎么做的 →
                  </span>
                </div>
              </Link>
              <div className="mt-10">
                <Link to="/vibecoding" className="text-[0.95rem] text-muted hover:text-ink transition-colors">
                  查看全部 {demos.length} 个 demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI ASSISTANT TEASER */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                Interactive
              </p>
            </div>
            <div className="md:col-span-10">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                className="group block w-full text-left border border-line rounded-sm p-8 md:p-12 hover:border-ink transition-colors"
              >
                <div className="flex items-baseline justify-between gap-6 flex-wrap mb-4">
                  <h2 className="font-display text-[1.6rem] md:text-[2.2rem] tracking-tightest group-hover:italic transition-all">
                    跟我聊聊
                  </h2>
                  <span className="text-[0.9rem] text-muted">AI</span>
                </div>
                <p className="text-[1.05rem] text-muted max-w-prose mb-6">
                  让 AI 替身基于林越的真实作品回答你关于他经历、想法、案例的任意问题。
                </p>
                <span className="text-[0.95rem] underline decoration-line underline-offset-[6px] group-hover:decoration-ink">
                  打开聊天 →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">About</p>
            </div>
            <div className="md:col-span-10">
              <p className="font-display text-[1.6rem] md:text-[2.2rem] leading-[1.35] tracking-tightest max-w-prose text-pretty">
                <em>{profile.pitch}</em>
              </p>
              <Link to="/about" className="inline-block mt-10 text-[0.95rem] underline decoration-line underline-offset-[6px] hover:decoration-ink">
                了解更多 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
