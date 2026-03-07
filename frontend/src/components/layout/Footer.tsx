'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [showSignature, setShowSignature] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= scrollHeight * 0.8) setShowSignature(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'var(--ink)',
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      <div
        className="block h-0.5"
        style={{
          background: 'linear-gradient(90deg, var(--violet), var(--coral), var(--gold))',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Eslavath <span style={{ color: 'var(--violet-2)' }}>V</span>ineeth Naik
              </span>
            </div>
            <p className="text-sm">
              Building scalable AI-powered systems that think, scale, and ship.
            </p>
            <div className="text-xs opacity-70">© {currentYear} Eslavath Vineeth Naik.</div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#experience', label: 'Experience' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-[var(--violet-pale)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/vineethnaik', Icon: Github },
                { href: 'https://linkedin.com/in/eslavath-vineeth-naik-a8ab16285', Icon: Linkedin },
                { href: 'https://twitter.com', Icon: Twitter },
                { href: 'mailto:vineethnaikeslavath@gmail.com', Icon: Mail },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link w-12 h-12 rounded-[var(--radius-pill)] border-[1.5px] border-[rgba(255,255,255,0.2)] bg-white/5 flex items-center justify-center text-white"
                  style={{
                    transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  whileHover={{
                    background: 'var(--violet-pale)',
                    borderColor: 'var(--violet)',
                    color: 'var(--violet)',
                    y: -3,
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="text-sm">Built with Next.js, Tailwind & ☕</div>
          <motion.a
            href="https://github.com/vineethnaik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[var(--violet-pale)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View source →
          </motion.a>
        </div>

        <AnimatePresence>
          {showSignature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 pt-8 text-center"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="gradient-text text-lg font-medium">
                "Systems that scale begin with engineers who think."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
