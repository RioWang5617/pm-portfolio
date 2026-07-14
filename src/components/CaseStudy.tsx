import { Link } from 'react-router-dom'
import { SidebarNav } from './SidebarNav'
import MonoIcon, { type IconName } from './MonoIcon'

/* ─── Sidebar Nav Config ─── */
export type SidebarSection = { id: string; label: string }

/* ─── Section ─── */
export function Section({ id, title, eyebrow, children }: { id?: string; title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-wide px-6 md:px-10 py-14 md:py-20">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <p className="font-mono text-[0.78rem] text-muted num">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.8rem] md:text-[2.2rem] tracking-tightest leading-none">
            <em>{title}</em>
          </h2>
        </div>
        <div className="md:col-span-10 max-w-[52rem] text-[1.05rem] md:text-[1.1rem] leading-[1.75] text-ink/90">
          {children}
        </div>
      </div>
    </section>
  )
}

/* ─── Highlight Card ─── */
export function HighlightCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 border border-line rounded-lg hover:border-ink/30 transition-colors">
      <div className="text-[2rem] mb-3"><MonoIcon name={icon as IconName} className="w-10 h-10" /></div>
      <h4 className="font-display text-[1.1rem] tracking-tight mb-2">{title}</h4>
      <p className="text-[0.92rem] text-muted leading-[1.6]">{desc}</p>
    </div>
  )
}

/* ─── Architecture Layer ─── */
export function ArchLayer({ title, items, color, borderColor }: { title: string; items: string[]; color: string; borderColor: string }) {
  return (
    <div className={`p-5 rounded-lg border ${borderColor} bg-gradient-to-br ${color}`}>
      <h4 className="font-display text-[1rem] tracking-tight mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="text-[0.82rem] px-3 py-1.5 bg-ink/5 rounded-md text-ink/80">{item}</span>
        ))}
      </div>
    </div>
  )
}

export function ArchArrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted/50">
        <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ─── Flow Diagram ─── */
export function FlowDiagram({ steps }: { steps: { label: string; icon: string; sub?: string; accent?: boolean }[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.accent ? 'bg-vermilion/20 border-2 border-vermilion/50' : 'bg-ink/5 border border-line'}`}>
              <MonoIcon name={step.icon as IconName} className="w-5 h-5" />
            </div>
            {i < steps.length - 1 && <div className="w-px h-8 bg-line/60 my-1" />}
          </div>
          <div className="pt-2 pb-4">
            <p className={`font-display text-[1rem] ${step.accent ? 'text-vermilion' : ''}`}>{step.label}</p>
            {step.sub && <p className="text-[0.85rem] text-muted mt-0.5">{step.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Challenge Card ─── */
export function ChallengeCard({ problem, detail, solution, index }: { problem: string; detail: string; solution: string; index: number }) {
  return (
    <div className="p-6 md:p-8 border border-line rounded-lg hover:border-ink/20 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <span className="font-mono text-[0.78rem] text-muted num mt-1">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-display text-[1.2rem] md:text-[1.4rem] tracking-tight">{problem}</h3>
      </div>
      <div className="pl-10 space-y-4">
        <div>
          <p className="text-[0.78rem] uppercase tracking-[0.15em] text-muted mb-2 font-mono">问题</p>
          <p className="text-[0.98rem] text-ink/80 leading-[1.7]">{detail}</p>
        </div>
        <div>
          <p className="text-[0.78rem] uppercase tracking-[0.15em] text-vermilion mb-2 font-mono">解法</p>
          <p className="text-[0.98rem] text-ink/80 leading-[1.7]">{solution}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Insight ─── */
export function Insight({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-5 border border-line rounded-lg hover:border-ink/20 transition-colors">
      <span className="text-muted mt-0.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 7l-5-5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <div>
        <h4 className="font-display text-[1.05rem] tracking-tight mb-1.5">{title}</h4>
        <p className="text-[0.92rem] text-muted leading-[1.7]">{desc}</p>
      </div>
    </div>
  )
}

/* ─── Risk Level Card ─── */
export function RiskLevelCard({ level, desc, action, color }: { level: string; desc: string; action: string; color: string }) {
  return (
    <div className={`p-5 rounded-lg border-l-4 ${color}`}>
      <h4 className="font-display text-[1.1rem] tracking-tight mb-2">{level}</h4>
      <p className="text-[0.92rem] text-muted leading-[1.6] mb-3">{desc}</p>
      <span className="text-[0.82rem] font-mono px-2.5 py-1 rounded-full border border-line">{action}</span>
    </div>
  )
}

/* ─── Defense Layer ─── */
export function DefenseLayer({ layer, title, items, color }: { layer: string; title: string; items: string[]; color: string }) {
  return (
    <div className={`p-6 rounded-lg border ${color}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[0.78rem] text-muted">{layer}</span>
        <h4 className="font-display text-[1.1rem] tracking-tight">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-[0.92rem] text-ink/80">
            <span className="text-muted mt-1">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Prototype Card ─── */
export function PrototypeCard({ src, label, desc, index }: { src: string; label: string; desc: string; index: number }) {
  return (
    <div className="reveal">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-[0.78rem] text-muted num">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tightest">{label}</h3>
      </div>
      <p className="text-muted leading-[1.7] mb-6 pl-10">{desc}</p>
      <div className="rounded-lg overflow-hidden border border-line hover:border-ink/30 transition-colors">
        <img src={src} alt={label} className="w-full" loading="lazy" />
      </div>
    </div>
  )
}

/* ─── Case Study Layout ─── */
export function CaseStudyLayout({ children, sidebarSections }: { children: React.ReactNode; sidebarSections: SidebarSection[] }) {
  return (
    <article>
      <SidebarNav sections={sidebarSections} />
      {children}
    </article>
  )
}

/* ─── Back Link ─── */
export function BackLink() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10 py-20 border-t border-line/60">
      <Link to="/vibecoding" className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all">
        ← 返回所有 demo
      </Link>
    </section>
  )
}
