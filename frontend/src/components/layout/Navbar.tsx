'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollDirection, scrollY } = useScrollDirection()

  useEffect(() => {
    const sections = navItems.map((item) => item.href.slice(1))
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px',
    })
    sections.forEach((section) => {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const navbarHidden = scrollDirection === 'down' && scrollY > 100

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navbarHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Eslavath VINEETH Naik */}
          <motion.a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="font-display font-extrabold text-lg uppercase tracking-[0.08em] text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Eslavath <span className="text-[var(--violet)]">Vineeth</span> Naik
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    activeSection === item.href.slice(1)
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contact')
              }}
              className="shrink-0 px-[22px] py-[9px] rounded-[var(--radius-pill)] font-semibold text-sm text-white"
              style={{
                background: 'var(--violet)',
                boxShadow: 'var(--shadow-violet)',
                transition: 'background 0.18s, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              whileHover={{
                background: 'var(--violet-2)',
                scale: 1.05,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-[var(--ink)] hover:text-[var(--violet)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[var(--ink)]/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-white border-l border-[var(--border)] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display font-bold text-[var(--ink)]">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[var(--muted)] hover:text-[var(--ink)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="block text-lg font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="absolute bottom-6 left-6 right-6">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="block w-full py-3 text-center font-semibold text-white rounded-[var(--radius-pill)]"
                  style={{ background: 'var(--violet)', boxShadow: 'var(--shadow-violet)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
