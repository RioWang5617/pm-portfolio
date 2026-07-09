import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      {pathname !== '/' && <Footer />}
    </div>
  )
}
