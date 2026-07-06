import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/works', label: '作品集' },
  { to: '/vibecoding', label: 'Vibecoding' },
  { to: '/resume', label: '简历' },
  { to: '/about', label: '关于' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/85 backdrop-blur border-b border-line/60' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-wide px-6 md:px-10 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-[1.4rem] md:text-[1.55rem] tracking-tightest leading-none italic"
        >
          Lin&nbsp;Yue<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[0.92rem] tracking-wide transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
