'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import './minimal.css'

const NAME = 'Eslavath Vineeth Naik'
const FIRST_WORD = 'Eslavath'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'

const SKILL_CATEGORIES = ['Programming', 'Web & Backend', 'Databases', 'Cloud & DevOps', 'Data & Analytics']
const TOOLS = ['React', 'Node.js', 'Python', 'Java', 'MongoDB', 'MySQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'Spring Boot', 'Express.js']

const EXPERIENCE = [
  { index: '01', title: 'Networking Virtual Internship', company: 'Juniper Networks', tag: 'Internship', date: '2024' },
  { index: '02', title: 'B.Tech Computer Science', company: 'KL University', tag: 'Education', date: '2023 – Present' },
  { index: '03', title: 'Design Thinking & Innovation', company: 'KL University', tag: 'Leadership', date: '2024' },
]

const SERVICES = [
  { id: '01', title: 'Full Stack Development', desc: 'Building scalable web applications with React, Node.js, and modern cloud infrastructure. Focus on performance, accessibility, and maintainable architecture.' },
  { id: '02', title: 'AI & Data Solutions', desc: 'Designing and implementing AI-driven systems, data pipelines, and analytics solutions. Computer vision, ML automation, and data-driven decision support.' },
  { id: '03', title: 'Backend & APIs', desc: 'RESTful APIs, database design, and microservices. Strong experience with MongoDB, MySQL, Spring Boot, and real-time systems.' },
]

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let isInWindow = true

    const onLeave = () => {
      isInWindow = false
      cursor.classList.add('hidden')
    }

    const onEnter = () => {
      isInWindow = true
      cursor.classList.remove('hidden')
    }

    const checkHover = () => {
      const target = document.elementFromPoint(mx, my)
      const el = target?.closest('a, button, .minimal-service-card, .minimal-work-item, .minimal-skills-cell')
      cursor.classList.toggle('hover', !!el)
    }

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      checkHover()
    }

    const animate = () => {
      if (!isInWindow) {
        requestAnimationFrame(animate)
        return
      }
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      const dot = cursor.querySelector('.minimal-cursor-dot') as HTMLElement
      const ring = cursor.querySelector('.minimal-cursor-ring') as HTMLElement
      if (dot) {
        dot.style.left = `${mx}px`
        dot.style.top = `${my}px`
      }
      if (ring) {
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.minimal-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${(el.dataset.index ? parseInt(el.dataset.index) : 0) * 0.1}s`
            el.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el, i) => {
      (el as HTMLElement).dataset.index = String(i)
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cells = document.querySelectorAll('.minimal-stats-val[data-target]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.target || '0')
          const duration = 1400
          const steps = 40
          const stepVal = target / steps
          const interval = duration / steps
          let current = 0
          const timer = setInterval(() => {
            current += stepVal
            if (current >= target) {
              el.textContent = String(target)
              clearInterval(timer)
            } else {
              el.textContent = String(Math.round(current))
            }
          }, interval)
          observer.unobserve(el)
        })
      },
      { threshold: 0.3 }
    )
    cells.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = nameRef.current
    if (!container) return

    const chars = container.querySelectorAll('.char')
    const firstWordLen = FIRST_WORD.length

    const runScramble = (span: Element) => {
      const realChar = span.getAttribute('data-char') || span.textContent || ''
      let frame = 0
      const maxFrames = 8 + Math.floor(Math.random() * 7)
      const iv = setInterval(() => {
        frame++
        if (frame >= maxFrames) {
          span.textContent = realChar
          clearInterval(iv)
          return
        }
        span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }, 40)
    }

    const dropDuration = 70 * NAME.replace(/\s/g, '').length + firstWordLen * 70 + 500
    const t1 = setTimeout(() => {
      chars.forEach((span) => {
        setTimeout(() => runScramble(span), Math.random() * 200)
      })
    }, dropDuration)

    const triggerGlitch = () => {
      const idx = Math.floor(Math.random() * chars.length)
      const span = chars[idx] as HTMLElement
      span.classList.add('glitch')
      setTimeout(() => span.classList.remove('glitch'), 120 + Math.random() * 200)
      glitchTimer = window.setTimeout(triggerGlitch, 1800 + Math.random() * 3200)
    }
    let glitchTimer = window.setTimeout(triggerGlitch, 3000)

    const nameWrap = container.closest('.minimal-hero-name-wrap')
    if (nameWrap) {
      const onNameMove = (e: Event) => {
        const me = e as MouseEvent
        chars.forEach((span) => {
          const r = (span as HTMLElement).getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const dx = me.clientX - cx
          const dy = me.clientY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const pull = (1 - dist / 120) * 18
            const tx = (dx / dist) * pull
            const ty = (dy / dist) * pull
            ;(span as HTMLElement).style.transform = `translate(${tx}px, ${ty}px)`
          } else {
            ;(span as HTMLElement).style.transform = ''
          }
        })
      }
      const onNameLeave = () => {
        chars.forEach((s) => ((s as HTMLElement).style.transform = ''))
      }
      nameWrap.addEventListener('mousemove', onNameMove)
      nameWrap.addEventListener('mouseleave', onNameLeave)
      return () => {
        clearTimeout(t1)
        clearTimeout(glitchTimer)
        nameWrap.removeEventListener('mousemove', onNameMove)
        nameWrap.removeEventListener('mouseleave', onNameLeave)
      }
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(glitchTimer)
    }
  }, [])

  const handleCharHover = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const span = e.currentTarget
    const realChar = span.getAttribute('data-char') || span.textContent || ''
    let frame = 0
    const maxFrames = 8 + Math.floor(Math.random() * 7)
    const iv = setInterval(() => {
      frame++
      if (frame >= maxFrames) {
        span.textContent = realChar
        clearInterval(iv)
        return
      }
      span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    }, 40)
  }, [])

  useEffect(() => {
    const nav = document.querySelector('.minimal-nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="minimal-noise" aria-hidden>
        <svg>
          <filter id="minimal-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
          <rect width="100%" height="100%" filter="url(#minimal-noise)" />
        </svg>
      </div>

      <div ref={cursorRef} className="minimal-cursor" aria-hidden>
        <div className="minimal-cursor-dot" style={{ left: 0, top: 0 }} />
        <div className="minimal-cursor-ring" style={{ left: 0, top: 0 }} />
      </div>

      <nav className="minimal-nav">
        <Link href="/" className="minimal-nav-logo minimal-display">EVN</Link>
        <div className="minimal-nav-links">
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#contact">Contact</Link>
          <Link href="/full">Full</Link>
        </div>
      </nav>

      <section className="minimal-hero">
        <div className="minimal-hero-grid" />
        <div className="minimal-hero-accent" />
        <div className="minimal-hero-shine" />
        <div>
          <p className="minimal-hero-kicker minimal-reveal">Full Stack & AI Engineer · 2025</p>
          <div className="minimal-hero-name-wrap" ref={nameRef}>
            <div className="minimal-hero-name-ghost" aria-hidden>{NAME}</div>
            <h1 className="minimal-hero-name">
              {NAME.split('').map((char, i) => {
                const isSpace = char === ' '
                const charIndex = NAME.substring(0, i).replace(/\s/g, '').length
                const delay = charIndex < FIRST_WORD.length
                  ? charIndex * 70
                  : FIRST_WORD.length * 70 + (charIndex - FIRST_WORD.length) * 70
                if (isSpace) return <span key={i} className="char" style={{ width: '0.3em' }}> </span>
                return (
                  <span
                    key={i}
                    className="char"
                    data-char={char}
                    onMouseEnter={handleCharHover}
                    style={{ opacity: 0, animation: `minimalDrop 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards` }}
                  >
                    {char}
                  </span>
                )
              })}
            </h1>
          </div>
        </div>
        <div className="minimal-hero-bottom">
          <p className="minimal-hero-bio minimal-reveal" data-index={1}>
            Computer Science undergraduate specializing in Technology Consulting, Data-Driven Solutions,
            and Software Engineering.
          </p>
          <Link href="#work" className="minimal-hero-cta minimal-reveal" data-index={2}>View Work →</Link>
        </div>
        <div className="minimal-hero-scroll">Scroll</div>
      </section>

      <div className="minimal-marquee minimal-marquee-1">
        <div className="minimal-marquee-track">
          <div className="minimal-marquee-inner">{SKILL_CATEGORIES.map((s, i) => <span key={i}>{s}</span>)}</div>
          <div className="minimal-marquee-inner">{SKILL_CATEGORIES.map((s, i) => <span key={`2-${i}`}>{s}</span>)}</div>
        </div>
      </div>
      <div className="minimal-marquee minimal-marquee-2">
        <div className="minimal-marquee-track">
          <div className="minimal-marquee-inner">{TOOLS.map((t, i) => <span key={i}>{t}</span>)}</div>
          <div className="minimal-marquee-inner">{TOOLS.map((t, i) => <span key={`2-${i}`}>{t}</span>)}</div>
        </div>
      </div>

      <section className="minimal-stats minimal-reveal">
        <div className="minimal-stats-cell"><div className="minimal-stats-val" data-target="3">0</div><div className="minimal-stats-label">Years Experience</div></div>
        <div className="minimal-stats-cell"><div className="minimal-stats-val" data-target="5">0</div><div className="minimal-stats-label">Projects</div></div>
        <div className="minimal-stats-cell"><div className="minimal-stats-val" data-target="25">0</div><div className="minimal-stats-label">Technologies</div></div>
        <div className="minimal-stats-cell"><div className="minimal-stats-val" data-target="3">0</div><div className="minimal-stats-label">Companies</div></div>
      </section>

      <section id="about" className="minimal-about">
        <h2 className="minimal-about-heading minimal-reveal">
          Passionate about solving business and technology challenges through data-driven solutions and innovative engineering.
        </h2>
        <div className="minimal-reveal">
          <p className="minimal-about-bio">
            Building systems that think, scale, and ship. Full Stack Developer and AI Engineer with expertise in React, Node.js, Python, and cloud technologies.
          </p>
          <div className="minimal-skills-grid">
            {['Java', 'Python', 'React.js', 'Node.js', 'TypeScript', 'MongoDB', 'MySQL', 'Spring Boot', 'Express.js', 'AWS', 'Docker', 'Git', 'REST APIs', 'AI/ML'].map((skill) => (
              <div key={skill} className="minimal-skills-cell">{skill}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="minimal-work">
        <h2 className="minimal-work-title">Work</h2>
        {EXPERIENCE.map((job) => (
          <div key={job.index} className="minimal-work-item minimal-reveal">
            <div className="minimal-work-index">{job.index}</div>
            <div className="minimal-work-role">{job.title} · {job.company}</div>
            <div className="minimal-work-meta">
              <span className="minimal-work-tag">{job.tag}</span>
              <span className="minimal-work-date">{job.date}</span>
            </div>
          </div>
        ))}
      </section>

      <section id="skills" className="minimal-services">
        {SERVICES.map((svc) => (
          <div key={svc.id} className="minimal-service-card minimal-reveal">
            <div className="minimal-service-num">{svc.id} / Category</div>
            <h3 className="minimal-service-title">{svc.title}</h3>
            <p className="minimal-service-desc">{svc.desc}</p>
            <span className="minimal-service-arrow">↗</span>
          </div>
        ))}
      </section>

      <section id="contact" className="minimal-contact">
        <div className="minimal-contact-ghost">HELLO</div>
        <h2 className="minimal-contact-heading minimal-reveal">Have a project in mind?</h2>
        <a href="mailto:vineethnaikeslavath@gmail.com" className="minimal-contact-email minimal-reveal">
          vineethnaikeslavath@gmail.com
        </a>
      </section>

      <footer className="minimal-footer minimal-reveal">
        <div className="minimal-footer-name">Eslavath Vineeth Naik · © 2025</div>
        <div className="minimal-footer-links">
          <a href="https://linkedin.com/in/eslavath-vineeth-naik-a8ab16285" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/vineethnaik" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </>
  )
}
