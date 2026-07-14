import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { works } from '../data/works'
import { SidebarNav } from '../components/SidebarNav'

export default function CaseStudy() {
  const { slug } = useParams()
  const w = works.find((x) => x.slug === slug)

  if (!w) {
    return (
      <div className="mx-auto max-w-prose px-6 md:px-10 py-32 text-center">
        <p className="font-display text-[2rem] italic">案例不存在</p>
        <Link to="/works" className="mt-8 inline-block underline">
          返回作品集 →
        </Link>
      </div>
    )
  }

  const sidebarSections = [
    { id: 'overview', label: '概述' },
    { id: 'context', label: '背景' },
    { id: 'problem', label: '问题' },
    { id: 'approach', label: '过程' },
    { id: 'outcome', label: '结果' },
    { id: 'reflection', label: '反思' },
  ]

  return (
    <article>
      <SidebarNav sections={sidebarSections} />
      {/* HERO */}
      <header id="overview" className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/works"
              className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
            >
              ← Works
            </Link>
          </div>
          <div className="md:col-span-10">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-8 num">
              Case · {w.year} · {w.role}
            </p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest text-balance">
              {w.title}
            </h1>
            <p className="mt-8 text-[1.18rem] md:text-[1.32rem] text-muted leading-[1.5] max-w-prose text-pretty">
              {w.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
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
        </div>
      </header>

      {/* COVER / CAROUSEL */}
      <div className="mx-auto max-w-wide px-6 md:px-10 mb-20 md:mb-28 reveal">
        {w.images && w.images.length > 0 ? (
          <Carousel images={w.images} />
        ) : (
          <div className={`aspect-[21/9] w-full rounded-sm relative overflow-hidden ${w.image ? '' : `bg-gradient-to-br ${w.cover}`}`}>
            {w.image ? (
              <img src={w.image} alt={w.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${w.cover}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
              <p className="font-display italic text-cream/90 text-[1.2rem] md:text-[1.8rem] leading-snug max-w-prose text-center px-8">
                「{w.intro}」
              </p>
            </div>
          </div>
        )}
      </div>

      {/* INTRO */}
      <section className="mx-auto max-w-prose px-6 md:px-10">
        <p className="font-display text-[1.4rem] md:text-[1.7rem] leading-[1.4] tracking-tight text-balance reveal">
          {w.intro}
        </p>
      </section>

      {/* CONTEXT */}
      <Section id="context" title="背景" eyebrow="01">
        <p>{w.context}</p>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" title="问题" eyebrow="02">
        <p>{w.problem}</p>
      </Section>

      {/* APPROACH */}
      <Section id="approach" title="过程" eyebrow="03">
        <div className="space-y-12">
          {w.approach.map((a, i) => (
            <div key={a.title} className="reveal">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-[0.78rem] text-muted num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[1.5rem] md:text-[1.8rem] tracking-tightest">
                  {a.title}
                </h3>
              </div>
              <p className="text-muted leading-[1.7] pl-10">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OUTCOME */}
      <Section id="outcome" title="结果" eyebrow="04">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {w.outcome.map((o) => (
            <div key={o.label} className="reveal">
              <p className="font-display text-[2.4rem] md:text-[3rem] leading-none tracking-tightest">
                {o.metric}
              </p>
              <p className="mt-3 text-[0.85rem] text-muted leading-snug">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* REFLECTION */}
      <Section id="reflection" title="如果重来" eyebrow="05">
        <p className="text-pretty">{w.reflection}</p>
      </Section>

      {/* NEXT */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-20 md:py-28">
        <Link
          to="/works"
          className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all"
        >
          ← 返回所有作品
        </Link>
      </section>
    </article>
  )
}

/* ─── Carousel ─── */
function Carousel({ images }: { images: { src: string; alt: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next, paused])

  return (
    <div
      className="relative rounded-sm overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image */}
      <div className="aspect-[21/9] w-full relative">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-16">
        <p className="font-display italic text-cream/90 text-[1.1rem] md:text-[1.4rem] leading-snug max-w-prose">
          {images[current].caption}
        </p>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-cream w-6' : 'bg-cream/40 hover:bg-cream/60'}`}
          />
        ))}
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-wide px-6 md:px-10 py-14 md:py-20">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <p className="font-mono text-[0.78rem] text-muted num">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.8rem] md:text-[2.2rem] tracking-tightest leading-none">
            <em>{title}</em>
          </h2>
        </div>
        <div className="md:col-span-10 max-w-prose text-[1.05rem] md:text-[1.1rem] leading-[1.75] text-ink/90">
          {children}
        </div>
      </div>
    </section>
  )
}
