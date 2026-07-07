import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line/60 mt-32">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="font-display text-[2rem] md:text-[2.6rem] leading-[1.05] tracking-tightest">
            <em>一起做点</em>
            <br />
            <em>有意思的产品？</em>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block mt-7 text-[1rem] underline decoration-line underline-offset-[6px] hover:decoration-ink transition-colors"
          >
            {profile.email} →
          </a>
        </div>
        <div className="md:col-span-3">
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.75rem] uppercase tracking-[0.18em] text-muted mb-4">
            © 2025
          </p>
          <p className="text-[0.92rem] text-muted leading-relaxed">
            本站用 Vite + React + Tailwind 编写。
            <br />
            风格参考 Stripe Press。
          </p>
        </div>
      </div>
    </footer>
  )
}
