import { Link } from 'react-router-dom'
import type { CaseStudy } from '../data/works'
import { useInView } from '../hooks/useInView'

interface Props {
  work: CaseStudy
  index: number
}

export function CaseStudyCard({ work, index }: Props) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.1)
  const fromLeft = index % 2 === 0

  return (
    <Link
      ref={ref}
      to={`/works/${work.slug}`}
      className="group block"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${fromLeft ? '-50px' : '50px'})`,
        transition: `opacity 0.8s cubic-bezier(.2,.7,.2,1) ${index * 0.1}s, transform 0.8s cubic-bezier(.2,.7,.2,1) ${index * 0.1}s`,
      }}
    >
      <div className={`aspect-[21/9] rounded-xl mb-6 relative overflow-hidden ${work.image ? '' : `bg-gradient-to-br ${work.cover}`}`}>
        {work.image ? (
          <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${work.cover}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="text-cream/90">
            <div className="text-[0.7rem] uppercase tracking-[0.18em] opacity-70 mb-2 num">
              {work.year} · {work.role}
            </div>
            <h3 className="font-display text-[1.5rem] md:text-[2rem] leading-[1.05] text-balance">
              {work.title}
            </h3>
          </div>
        </div>
      </div>
      <p className="text-[1rem] md:text-[1.1rem] text-muted leading-[1.5] max-w-prose group-hover:text-ink transition-colors">
        {work.subtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {work.tags.map((t) => (
          <span key={t} className="text-[0.7rem] px-2 py-0.5 border border-line rounded-full text-muted font-mono">{t}</span>
        ))}
      </div>
    </Link>
  )
}
