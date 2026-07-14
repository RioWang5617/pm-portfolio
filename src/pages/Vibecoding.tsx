import { Link } from 'react-router-dom'
import { demos } from '../data/vibecoding'
import { DemoCard } from '../components/DemoCard'

export default function Vibecoding() {
  return (
    <div className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-24">
      <Link
        to="/"
        className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
      >
        ← Home
      </Link>
      <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest mt-12 mb-4">
        Vibecoding
      </h1>
      <p className="text-[1rem] md:text-[1.1rem] text-muted max-w-prose mb-12">
        因服务器资源有限，无法承载作品，本页面只做展示。
      </p>
      <div className="mt-12">
        {demos.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[1.1rem] text-muted font-medium">暂无演示，正在打磨中...</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {demos.map((d, i) => (
              <DemoCard key={d.slug} demo={d} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
