import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line/30 mt-32 bg-surface/50">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-[2.5rem] md:text-[3.5rem] leading-[1.05] tracking-tightest text-ink mb-10">
            <em>一起做点</em>
            <br />
            <em>有意思的产品？</em>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream rounded-full text-[1.05rem] font-medium tracking-wide hover-lift"
          >
            {profile.email}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-12 text-[0.7rem] uppercase tracking-[0.2em] text-muted font-medium">
            © 2025 {profile.nameZh}
          </p>
        </div>
      </div>
    </footer>
  )
}
