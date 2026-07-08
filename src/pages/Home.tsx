import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative">
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
    </div>
  )
}
