import { useEffect, useState } from 'react'

export interface SidebarSection {
  id: string
  label: string
}

interface Props {
  sections: SidebarSection[]
}

export function SidebarNav({ sections }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActive(s.id)
            }
          })
        },
        { rootMargin: '-20% 0px -60% 0px' },
      )
      io.observe(el)
      observers.push(io)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (sections.length === 0) return null

  return (
    <aside className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
      <nav className="flex flex-col gap-3">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3 text-left"
          >
            <span
              className={`block w-[3px] rounded-full transition-all duration-300 ${
                active === s.id
                  ? 'h-6 bg-ink'
                  : 'h-3 bg-line group-hover:h-4 group-hover:bg-ink/40'
              }`}
            />
            <span
              className={`text-[0.72rem] uppercase tracking-[0.15em] transition-colors duration-300 ${
                active === s.id ? 'text-ink' : 'text-transparent group-hover:text-muted'
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
