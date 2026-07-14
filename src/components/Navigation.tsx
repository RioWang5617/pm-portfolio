import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme, type Theme } from '../hooks/useTheme'
import MonoIcon, { type IconName } from './MonoIcon'

const links = [
  { to: '/works', label: 'Works' },
  { to: '/vibecoding', label: 'Vibecoding' },
  { to: '/about', label: 'About' },
]

const themeOptions: { key: Theme; label: string; icon: string }[] = [
  { key: 'warm', label: '森系', icon: 'leaf' },
  { key: 'light', label: '白色', icon: 'sun' },
  { key: 'dark', label: '暗夜', icon: 'moon' },
]

export default function Navigation() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-page/80 backdrop-blur-md border-b border-line/30 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-wide px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-[1.3rem] md:text-[1.55rem] tracking-tightest leading-none italic hover:text-accent transition-colors"
        >
          Tianyang<span className="text-accent">.</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
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
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
            className="text-[0.92rem] tracking-wide text-muted hover:text-accent transition-colors"
          >
            跟我聊
          </button>
          <div className="flex items-center gap-1 ml-2 border border-line rounded-full p-1">
            {themeOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setTheme(opt.key)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  theme === opt.key
                    ? 'bg-ink text-cream scale-110'
                    : 'text-muted hover:text-ink hover:bg-line/50'
                }`}
                title={opt.label}
              >
                <MonoIcon name={opt.icon as IconName} className="w-4 h-4 !bg-transparent !border-0 !backdrop-blur-none" />
              </button>
            ))}
          </div>
        </nav>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-center"
          aria-label="菜单"
        >
          <span className={`block w-5 h-px bg-ink transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-page/95 border-line/60 backdrop-blur px-6 pb-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-[1rem] tracking-wide transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent('open-chat')) }}
            className="block py-3 text-[1rem] tracking-wide text-muted hover:text-accent transition-colors"
          >
            跟我聊
          </button>
          <div className="flex items-center gap-2 pt-4 mt-2 border-t border-line/40">
            <span className="text-[0.82rem] text-muted mr-2">主题</span>
            {themeOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setTheme(opt.key)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  theme === opt.key
                    ? 'bg-ink text-cream scale-110'
                    : 'text-muted hover:text-ink hover:bg-line/50'
                }`}
                title={opt.label}
              >
                <MonoIcon name={opt.icon as IconName} className="w-4 h-4 !bg-transparent !border-0 !backdrop-blur-none" />
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
