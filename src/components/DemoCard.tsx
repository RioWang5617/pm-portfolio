import { Link } from 'react-router-dom'
import type { Demo } from '../data/vibecoding'
import { useInView } from '../hooks/useInView'

interface Props {
  demo: Demo
  index: number
}

export function DemoCard({ demo, index }: Props) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.12)
  const isEven = index % 2 === 0

  return (
    <Link
      ref={ref}
      to={`/vibecoding/${demo.slug}`}
      className="group block"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'none'
          : `translateY(40px)`,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${index * 0.08}s, transform 0.7s cubic-bezier(.2,.7,.2,1) ${index * 0.08}s`,
      }}
    >
      <div
        className={`
          flex flex-col md:flex-row
          ${isEven ? '' : 'md:flex-row-reverse'}
          gap-0 rounded-2xl overflow-hidden
          border border-line hover:border-ink
          transition-all duration-500
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]
          group
        `}
      >
        {/* 图片区域 */}
        <div className="md:w-[45%] relative overflow-hidden">
          <div
            className={`
              aspect-[16/9] md:aspect-auto md:h-full relative overflow-hidden
              ${demo.image ? '' : `bg-gradient-to-br ${demo.cover}`}
            `}
          >
            {demo.image ? (
              <img
                src={demo.image}
                alt={demo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.cover}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.15em] font-mono bg-black/30 text-white/80 backdrop-blur-sm">
                {demo.tags[0]}
              </span>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="md:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.7rem] font-mono text-muted num">{demo.year}</span>
            <span className="w-4 h-px bg-line" />
            <span className="text-[0.7rem] font-mono text-muted num">{demo.effort}</span>
          </div>

          <h3 className="font-display text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] leading-[1.1] tracking-tight group-hover:text-vermilion transition-colors duration-300">
            {demo.title}
          </h3>

          <p className="mt-3 text-[0.95rem] md:text-[1.05rem] text-muted leading-[1.6] max-w-lg">
            {demo.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {demo.stack.map((s) => (
              <span
                key={s}
                className="text-[0.68rem] px-2.5 py-1 border border-line rounded-full text-muted font-mono
                  group-hover:border-ink/30 transition-colors duration-300"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-[0.8rem] text-muted group-hover:text-vermilion transition-colors duration-300">
            <span>查看详情</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
