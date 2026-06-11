import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'

const navLinks = [
  { to: '/', label: 'Start' },
  { to: '/uslugi', label: 'Usługi' },
  { to: '/rezerwacja', label: 'Rezerwacja' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/zespol', label: 'Zespół' },
  { to: '/kontakt', label: 'Kontakt' },
]

const routeLabels: Record<string, string> = {
  '/uslugi': 'Usługi',
  '/rezerwacja': 'Rezerwacja',
  '/galeria': 'Galeria',
  '/zespol': 'Zespół',
  '/kontakt': 'Kontakt',
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useUiStore()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const routeLabel = routeLabels[location.pathname]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg)]/80 backdrop-blur-md shadow-md border-b border-[var(--color-taupe)]/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Główna nawigacja">
          <Link to="/" className="text-xl font-serif font-semibold text-[var(--color-espresso)] dark:text-[var(--color-cream)] tracking-widest uppercase">
            Salon
          </Link>

          {!isHome && routeLabel && (
            <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-[var(--color-taupe)]">
              <Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Start</Link>
              <span>/</span>
              <span className="text-[var(--color-espresso)] dark:text-[var(--color-cream)]">{routeLabel}</span>
            </nav>
          )}

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-gold)] ${
                  location.pathname === to
                    ? 'text-[var(--color-gold)]'
                    : (scrolled || !isHome)
                    ? 'text-[var(--color-espresso)] dark:text-[var(--color-cream)]'
                    : 'text-white/90'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[var(--color-taupe)]/20 transition-colors"
              aria-label={darkMode ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
            >
              {darkMode ? (
                <Sun size={18} className="text-[var(--color-gold)]" />
              ) : (
                <Moon size={18} className="text-[var(--color-espresso)]" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[var(--color-taupe)]/20 transition-colors"
              aria-label={darkMode ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
            >
              {darkMode ? (
                <Sun size={18} className="text-[var(--color-gold)]" />
              ) : (
                <Moon size={18} className="text-[var(--color-espresso)]" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2"
              aria-label="Otwórz menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} className="text-[var(--color-espresso)] dark:text-[var(--color-cream)]" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--color-espresso)] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-taupe)]/30">
              <span className="text-xl font-serif text-[var(--color-cream)] tracking-widest uppercase">Salon</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Zamknij menu"
                className="p-2 text-[var(--color-cream)]"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={to}
                    className={`text-2xl font-light transition-colors hover:text-[var(--color-gold)] ${
                      location.pathname === to ? 'text-[var(--color-gold)]' : 'text-[var(--color-cream)]'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
