import { Link } from 'react-router-dom'
import { works } from '../data/works'
import { CaseStudyCard } from '../components/CaseStudyCard'

export default function Works() {
  return (
    <div className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-24">
      <Link
        to="/"
        className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
      >
        ← Home
      </Link>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {works.map((w, i) => (
          <CaseStudyCard key={w.slug} work={w} featured={i === 0} />
        ))}
      </div>
    </div>
  )
}
