import { Link } from 'react-router-dom'
import type { Demo } from '../data/vibecoding'

interface Props {
  demo: Demo
}

export function DemoCard({ demo }: Props) {
  return (
    <Link
      to={`/vibecoding/${demo.slug}`}
      className="group block border border-line rounded-xl overflow-hidden hover:border-ink transition-colors"
    >
      <div className={`aspect-[16/9] bg-gradient-to-br ${demo.cover} relative`}>
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-mono text-[0.7rem] text-cream/70 uppercase tracking-[0.18em]">
            {demo.tags[0]}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[1.3rem] md:text-[1.5rem] leading-[1.1] group-hover:text-vermilion transition-colors">
          {demo.title}
        </h3>
        <p className="mt-2 text-[0.9rem] text-muted leading-[1.45] line-clamp-2">
          {demo.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {demo.stack.slice(0, 3).map((s) => (
            <span key={s} className="text-[0.7rem] px-2 py-0.5 border border-line rounded-full text-muted font-mono">{s}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[0.75rem] text-muted num">
          <span>{demo.effort}</span>
          <span>{demo.year}</span>
        </div>
      </div>
    </Link>
  )
}
