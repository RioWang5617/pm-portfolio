import { Link } from 'react-router-dom'
import { resume } from '../data/resume'

export function ResumeHeader() {
  const { basics } = resume
  return (
    <header className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-12 relative">
      <Link
        to="/"
        className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
      >
        ← Home
      </Link>

      <div className="mt-12 flex items-start justify-between gap-8 flex-wrap">
        <div>
          <h1 className="font-display text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.95] tracking-tightest text-balance">
            {basics.nameZh}
            <span className="block text-muted text-[0.5em] mt-2 font-sans">
              {basics.name}
            </span>
          </h1>
          <p className="mt-6 text-[1.1rem] md:text-[1.3rem] text-muted leading-[1.4]">
            {basics.title} · {basics.location}
          </p>
          <p className="mt-2 text-[0.95rem] text-ink/70 max-w-prose">
            {basics.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem]">
            <a href={`mailto:${basics.email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
              {basics.email}
            </a>
            {basics.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <a
          href="/resume.pdf"
          download
          className="px-5 py-2.5 border border-ink rounded-full text-[0.85rem] hover:bg-ink hover:text-cream transition-colors"
        >
          下载 PDF ↓
        </a>
      </div>
    </header>
  )
}
