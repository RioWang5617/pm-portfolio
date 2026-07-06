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
        用 AI 工具在周末/业余时间做的小东西。每个都是完整可用的工具。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demos.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
    </div>
  )
}
