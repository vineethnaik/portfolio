'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Download, Github, Eye } from 'lucide-react'
import Link from 'next/link'
import { HeroStatsDashboard } from './HeroStatsDashboard'
import ResumeViewer from '@/components/ResumeViewer'

const roles = [
  'Full Stack Developer',
  'AI Engineer',
  'Technology Consultant',
  'Data-Driven Solutions Developer',
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(() => setCurrentRole((p) => (p + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [isClient])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Hero blobs */}
      <div className="hero-blob blob-1" aria-hidden="true" />
      <div className="hero-blob blob-2" aria-hidden="true" />
      <div className="hero-blob blob-3" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="hero-badge hero-badge-anim">
              <div className="dot" />
              <span>Open to opportunities</span>
            </div>

            <h1
              className="hero-title-anim font-display font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--ink)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 6vw, 72px)',
              }}
            >
              Full Stack <span className="gradient-text">& AI</span>{' '}
              <span className="underline-word">Engineer</span>
            </h1>

            <p className="hero-sub-anim text-lg text-[var(--muted)]">
              Building systems that think, scale, and ship.
            </p>

            <p className="hero-sub-anim text-[var(--muted)] max-w-lg">
              Computer Science undergraduate specializing in Technology Consulting, Data-Driven Solutions,
              and Software Engineering. Passionate about solving business and technology challenges.
            </p>

            <div className="hero-actions-anim flex flex-wrap items-center gap-4">
              <Link href="#projects">
                <motion.div
                  className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[var(--radius-pill)] font-semibold text-[15px] text-white"
                  style={{
                    background: 'var(--violet)',
                    boxShadow: 'var(--shadow-violet)',
                    transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s',
                  }}
                  whileHover={{ y: -3, scale: 1.02, boxShadow: '0 8px 32px rgba(91, 33, 255, 0.45)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>

              <div className="inline-flex items-center gap-1.5">
                <a href="/Eslavath_Vineeth_Naik_Resume.pdf" download="Eslavath_Vineeth_Naik_Resume.pdf">
                  <motion.div
                    className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[var(--radius-pill)] font-semibold text-[15px] text-[var(--ink)] border-[1.5px] border-[var(--border)] bg-transparent"
                    style={{
                      transition: 'border-color 0.2s, background 0.2s, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    whileHover={{
                      borderColor: 'var(--violet)',
                      background: 'var(--violet-pale)',
                      y: -3,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </motion.div>
                </a>
                <motion.button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="btn-rainbow inline-flex items-center justify-center transition-shadow"
                  style={{ transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View Resume"
                >
                  <Eye className="w-5 h-5 eye-blink" strokeWidth={2.5} />
                </motion.button>
              </div>

              <motion.a
                href="https://github.com/vineethnaik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[50px] h-[50px] rounded-[var(--radius-pill)] border-[1.5px] border-[var(--border)] bg-white flex items-center justify-center text-[var(--ink)]"
                style={{ transition: 'border-color 0.2s, background 0.2s, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                whileHover={{
                  borderColor: 'var(--coral)',
                  background: 'var(--coral-pale)',
                  y: -3,
                  rotate: 5,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>

            <ResumeViewer open={resumeOpen} onOpenChange={setResumeOpen} triggerButton={false} />

            <div className="hero-ticker-anim flex flex-wrap gap-6 text-sm text-[var(--muted)]">
              <span>5 projects in production</span>
              <span>•</span>
              <span>2 open source libs</span>
              <span>•</span>
              <span>AWS certified</span>
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="hero-card-anim relative">
            <HeroStatsDashboard />
          </div>
        </div>
      </div>
    </section>
  )
}
