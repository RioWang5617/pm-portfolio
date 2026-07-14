import { Link } from 'react-router-dom'
import { useState } from 'react'
import { SidebarNav } from '../components/SidebarNav'
import {
  Section,
  HighlightCard,
  ArchLayer,
  ArchArrow,
  FlowDiagram,
  ChallengeCard,
  Insight,
} from '../components/CaseStudy'
import MonoIcon, { type IconName } from '../components/MonoIcon'

/* ─── Types ─── */
export interface CaseStudyData {
  slug: string
  title: string
  subtitle: string
  description: string
  year: string
  stack: string[]
  coverImage?: string
  coverQuote: string
  motivation: {
    paragraphs: string[]
    highlights: { icon: string; title: string; desc: string }[]
  }
  architecture: {
    description: string
    layers: { title: string; items: string[]; color: string; borderColor: string }[]
  }
  featureModules: {
    icon: string
    title: string
    desc: string
    features: string[]
  }[]
  flows: {
    title: string
    description: string
    steps: { label: string; icon: string; sub?: string; accent?: boolean }[]
  }[]
  prototypes: {
    label: string
    desc: string
    image?: string
  }[]
  challenges: { problem: string; detail: string; solution: string }[]
  techStack: { layer: string; tech: string; reason: string }[]
  metrics: { icon: string; label: string; value: string; desc: string }[]
  insights: { title: string; desc: string }[]
  closingQuote: string
  /** Optional extra section between flows and challenges */
  extraSection?: {
    id: string
    title: string
    eyebrow: string
    content: React.ReactNode
  }
}

const sidebarSections = [
  { id: 'overview', label: '概述' },
  { id: 'motivation', label: '为什么做' },
  { id: 'architecture', label: '架构设计' },
  { id: 'features', label: '功能模块' },
  { id: 'flow', label: '核心流程' },
  { id: 'prototypes', label: '原型设计' },
  { id: 'challenges', label: '踩坑与解决' },
  { id: 'tech', label: '技术选型' },
  { id: 'metrics', label: '运营指标' },
  { id: 'learned', label: '复盘总结' },
]

export default function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const sections = data.extraSection
    ? [
        ...sidebarSections.slice(0, 6),
        { id: data.extraSection.id, label: data.extraSection.title },
        ...sidebarSections.slice(6),
      ]
    : sidebarSections

  return (
    <article>
      <SidebarNav sections={sections} />

      {/* HERO */}
      <header id="overview" className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Link to="/vibecoding" className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors">
              ← Vibecoding
            </Link>
          </div>
          <div className="md:col-span-10">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-6 num">
              Case Study · {data.year}
            </p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest text-balance">
              {data.title}
            </h1>
            <p className="mt-8 text-[1.18rem] md:text-[1.32rem] text-muted leading-[1.5] max-w-prose text-pretty">
              {data.subtitle}
            </p>
            <p className="mt-6 text-[0.98rem] md:text-[1.05rem] text-muted/80 leading-[1.7] max-w-prose">
              {data.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {data.stack.map((s) => (
                <span key={s} className="text-[0.78rem] px-2.5 py-1 border border-line rounded-full text-muted font-mono">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className="mx-auto max-w-wide px-6 md:px-10 mb-20 md:mb-28 reveal">
        {data.coverImage ? (
          <div className="aspect-[21/9] w-full rounded-sm overflow-hidden bg-gradient-to-br from-[#1A1A18] to-[#0F0F0E] relative">
            <img
              src={data.coverImage}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[21/9] w-full rounded-sm bg-gradient-to-br from-[#1A1A18] to-[#0F0F0E] flex items-center justify-center">
            <p className="font-display italic text-cream/90 text-[1.2rem] md:text-[1.8rem] leading-snug max-w-prose text-center px-8">
              {data.coverQuote}
            </p>
          </div>
        )}
      </div>

      {/* WHY */}
      <Section id="motivation" title="为什么做" eyebrow="01">
        <div className="space-y-6">
          {data.motivation.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.motivation.highlights.map((h) => (
              <HighlightCard key={h.title} {...h} />
            ))}
          </div>
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section id="architecture" title="架构设计" eyebrow="02">
        <div className="space-y-8">
          <p dangerouslySetInnerHTML={{ __html: data.architecture.description }} />
          <div className="space-y-4">
            {data.architecture.layers.map((layer, i) => (
              <div key={layer.title}>
                {i === data.architecture.layers.length - 2 && i > 0 && <ArchArrow />}
                <ArchLayer {...layer} />
                {i < data.architecture.layers.length - 1 && <ArchArrow />}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURE MODULES */}
      <Section id="features" title="功能模块" eyebrow="03">
        <div className="space-y-8">
          <p>本产品包含以下核心功能模块，每个模块独立设计、可单独迭代：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.featureModules.map((m) => (
              <div key={m.title} className="p-6 border border-line rounded-lg hover:border-ink/30 transition-colors">
                <div className="text-[1.8rem] mb-3"><MonoIcon name={m.icon as IconName} className="w-8 h-8" /></div>
                <h4 className="font-display text-[1.1rem] tracking-tight mb-2">{m.title}</h4>
                <p className="text-[0.92rem] text-muted leading-[1.6] mb-4">{m.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.features.map((f) => (
                    <span key={f} className="text-[0.78rem] px-2.5 py-1 bg-ink/5 rounded-md text-ink/70">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CORE FLOW */}
      <Section id="flow" title="核心流程" eyebrow="04">
        <div className="space-y-12">
          {data.flows.map((flow) => (
            <div key={flow.title}>
              <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">{flow.title}</h3>
              <p className="text-muted leading-[1.7] mb-8">{flow.description}</p>
              <FlowDiagram steps={flow.steps} />
            </div>
          ))}
        </div>
      </Section>

      {/* PROTOTYPES */}
      <Section id="prototypes" title="原型设计" eyebrow={data.extraSection ? '05' : '05'}>
        <div className="space-y-8">
          <p>以下是产品的核心页面设计，展示关键交互流程和信息架构：</p>
          <div className="space-y-10">
            {data.prototypes.map((p) => (
              <PrototypeCard key={p.label} prototype={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* EXTRA SECTION (optional) */}
      {data.extraSection && (
        <Section id={data.extraSection.id} title={data.extraSection.title} eyebrow={data.extraSection.eyebrow}>
          {data.extraSection.content}
        </Section>
      )}

      {/* CHALLENGES */}
      <Section id="challenges" title="踩坑与解决" eyebrow={data.extraSection ? '07' : '06'}>
        <div className="space-y-8">
          <p>做这个项目踩了不少坑，以下是最关键的 {data.challenges.length} 个问题和对应的解法：</p>
          <div className="space-y-8 mt-8">
            {data.challenges.map((c, i) => (
              <ChallengeCard key={c.problem} {...c} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* TECH STACK */}
      <Section id="tech" title="技术选型" eyebrow={data.extraSection ? '08' : '07'}>
        <div className="space-y-6">
          <p>以下是本项目的技术选型及理由：</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 pr-6 font-mono text-[0.78rem] text-muted uppercase tracking-wider">层级</th>
                  <th className="text-left py-3 pr-6 font-mono text-[0.78rem] text-muted uppercase tracking-wider">技术选型</th>
                  <th className="text-left py-3 font-mono text-[0.78rem] text-muted uppercase tracking-wider">选型理由</th>
                </tr>
              </thead>
              <tbody>
                {data.techStack.map((t) => (
                  <tr key={t.layer} className="border-b border-line/50">
                    <td className="py-4 pr-6 font-display">{t.layer}</td>
                    <td className="py-4 pr-6 font-mono text-[0.88rem]">{t.tech}</td>
                    <td className="py-4 text-muted">{t.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* METRICS */}
      <Section id="metrics" title="运营指标" eyebrow={data.extraSection ? '09' : '08'}>
        <div className="space-y-8">
          <p>以下是本项目的核心运营指标和成功标准：</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {data.metrics.map((m) => (
              <div key={m.label} className="p-5 border border-line rounded-lg text-center">
                <div className="text-[1.8rem] mb-2"><MonoIcon name={m.icon as IconName} className="w-8 h-8" /></div>
                <p className="font-display text-[1.6rem] md:text-[2rem] tracking-tight text-ink">{m.value}</p>
                <p className="font-display text-[0.95rem] tracking-tight mt-1">{m.label}</p>
                <p className="text-[0.78rem] text-muted mt-2 leading-[1.5]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LEARNED */}
      <Section id="learned" title="复盘总结" eyebrow={data.extraSection ? '10' : '09'}>
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight">关键认知</h3>
            <div className="space-y-4">
              {data.insights.map((ins) => (
                <Insight key={ins.title} {...ins} />
              ))}
            </div>
          </div>
          <div className="mt-10 p-8 border-l-2 border-ink/30 pl-6">
            <p className="font-display italic text-[1.2rem] md:text-[1.4rem] tracking-tight leading-[1.5] text-ink/80">
              {data.closingQuote}
            </p>
          </div>
        </div>
      </Section>

      {/* BACK */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-20">
        <Link to="/vibecoding" className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all">
          ← 返回所有 demo
        </Link>
      </section>
    </article>
  )
}

/* ─── Prototype Card with Lightbox ─── */
function PrototypeCard({ prototype }: { prototype: { label: string; desc: string; image?: string } }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="border border-line rounded-lg overflow-hidden hover:border-ink/30 transition-colors">
        {prototype.image ? (
          <div
            className="aspect-[16/10] bg-gradient-to-br from-[#1A1A18] to-[#0F0F0E] cursor-zoom-in group/img relative"
            onClick={() => setOpen(true)}
          >
            <img src={prototype.image} alt={prototype.label} className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.02]" />
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/50 text-white text-[0.8rem] px-3 py-1.5 rounded-full backdrop-blur-sm">
                点击查看大图
              </span>
            </div>
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-[#1A1A18] to-[#0F0F0E] flex items-center justify-center">
            <div className="text-center px-6">
              <div className="mb-2"><MonoIcon name="file" className="w-12 h-12 text-cream/40" /></div>
              <p className="text-cream/60 text-[0.85rem] font-mono">{prototype.label}</p>
            </div>
          </div>
        )}
        <div className="p-5">
          <h4 className="font-display text-[1.05rem] tracking-tight mb-2">{prototype.label}</h4>
          <p className="text-[0.88rem] text-muted leading-[1.6]">{prototype.desc}</p>
        </div>
      </div>

      {/* Lightbox */}
      {open && prototype.image && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img src={prototype.image} alt={prototype.label} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" />
            <p className="text-center text-white/80 text-[0.9rem] mt-4 font-display">{prototype.label}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/20 transition-colors text-xl"
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}
