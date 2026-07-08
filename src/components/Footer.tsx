import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line/60 mt-32">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-[2.2rem] md:text-[3.2rem] leading-[1.1] tracking-tightest">
            <em>一起做点</em>
            <br />
            <em>有意思的产品？</em>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-ink text-cream rounded-full text-[1rem] hover:bg-accent transition-colors"
          >
            {profile.email}
            <span>→</span>
          </a>
          <p className="mt-10 text-[0.75rem] uppercase tracking-[0.18em] text-muted">
            © 2025 {profile.nameZh}
          </p>
        </div>
      </div>
    </footer>
  )
}
