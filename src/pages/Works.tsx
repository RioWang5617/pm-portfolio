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
      <h1 className="mt-12 font-display text-[2.2rem] md:text-[3rem] tracking-tightest leading-[1.1]">
        成功落地案例经验分析
      </h1>
      <div className="mt-16">
        {works.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[1.1rem] text-muted font-medium">暂无案例，正在精心准备中...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {works.map((w, i) => (
              <CaseStudyCard key={w.slug} work={w} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
