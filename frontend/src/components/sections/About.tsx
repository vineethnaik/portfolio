'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Code, Zap, Shield } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'

const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    school: 'KL University',
    year: '2023 - 2027',
    cgpa: '9.43/10',
  },
]

const coreValues = [
  { icon: Code, title: 'Systems Thinking', description: 'Building scalable architectures that stand the test of time' },
  { icon: Zap, title: 'Performance First', description: 'Optimizing for speed and efficiency at every level' },
  { icon: Shield, title: 'Ship It', description: 'Delivering robust solutions that solve real problems' },
]

const stats = [
  { value: 12, label: 'Projects', suffix: '+' },
  { value: 4, label: 'Certifications', suffix: '' },
  { value: 3, label: 'Hackathons', suffix: '' },
  { value: 800, label: 'GitHub Commits', suffix: '+' },
]

export function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--bg-off)]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <div className="section-eyebrow">about</div>
          <h2 className="section-title">The engineer behind the work</h2>
          <p className="section-sub mx-auto">
            Passionate about solving business and technology challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-[60%_40%] gap-12">
          <div className="space-y-8">
            <div className="reveal reveal-delay-1 space-y-6 text-[17px] text-[var(--muted)] leading-relaxed">
              <p>
                Computer Science undergraduate at KL University specializing in Technology Consulting,
                Data-Driven Solutions, and Software Engineering. Skilled in Java, Python, Full-Stack Development,
                Cloud Fundamentals, AI Automation, and Analytics.
              </p>
              <p>
                Passionate about solving business and technology challenges, improving processes, and
                delivering scalable digital solutions. Currently seeking an Advisory Associate role at PwC
                Acceleration Center while building innovative projects that demonstrate real-world impact.
              </p>
              <p>
                My technical journey includes developing AI-powered systems, full-stack marketplaces,
                and data management platforms.
              </p>
            </div>

            <div className="h-px bg-[var(--border)]" />

            <div className="reveal reveal-delay-2 space-y-6">
              <h3 className="font-display font-bold text-[var(--ink)] flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
                <GraduationCap className="w-6 h-6 text-[var(--violet)]" />
                Education
              </h3>
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  className="edu-card group relative bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius)] p-6 overflow-hidden"
                  style={{
                    transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(91,33,255,0.3)',
                    boxShadow: 'var(--shadow-md)',
                    y: -3,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
                    style={{
                      background: 'linear-gradient(180deg, var(--violet), var(--coral))',
                    }}
                  />
                  <h4 className="font-semibold text-[var(--ink)]">{item.degree}</h4>
                  <p className="text-[var(--violet)] font-semibold">{item.school}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[var(--muted)]">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span
                      className="px-2.5 py-0.5 rounded-[var(--radius-pill)] font-bold text-[var(--violet)]"
                      style={{ background: 'var(--violet-pale)' }}
                    >
                      CGPA: {item.cgpa}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="reveal reveal-delay-3">
              <h3 className="font-display font-bold text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Core Values
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {coreValues.map((value, i) => (
                  <motion.div
                    key={i}
                    className="value-card group bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius)] p-5"
                    style={{
                      transition: 'border-color 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s',
                    }}
                    whileHover={{
                      borderColor: 'rgba(91,33,255,0.3)',
                      y: -4,
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: i % 2 === 0 ? 'var(--violet-pale)' : 'var(--coral-pale)',
                      }}
                    >
                      <value.icon className="w-5 h-5" style={{ color: i % 2 === 0 ? 'var(--violet)' : 'var(--coral)' }} />
                    </div>
                    <h4 className="font-display font-bold text-sm text-[var(--ink)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {value.title}
                    </h4>
                    <p className="text-sm text-[var(--muted)]">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="reveal reveal-delay-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-[1.5px] border-[var(--border)] bg-white">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--violet-pale)] to-[var(--coral-pale)]">
                  <div
                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-4xl font-display font-extrabold"
                    style={{ background: 'linear-gradient(135deg, var(--violet), var(--coral))', fontFamily: 'var(--font-display)' }}
                  >
                    EVN
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal reveal-delay-3">
              {stats.map((stat, i) => {
                const { count, elementRef } = useCountUp({ end: stat.value, duration: 2000 })
                return (
                  <motion.div
                    key={i}
                    ref={elementRef}
                    className="p-6 bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius)] text-center"
                    style={{ transition: 'border-color 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s' }}
                    whileHover={{ borderColor: 'rgba(91,33,255,0.3)', y: -4, boxShadow: 'var(--shadow-md)' }}
                  >
                    <div className="font-display text-2xl font-extrabold text-[var(--ink)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {count}{stat.suffix}
                    </div>
                    <div className="text-sm text-[var(--muted)]">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            <div className="reveal reveal-delay-4 p-4 rounded-[var(--radius)] border-[1px] border-[rgba(91,33,255,0.15)] bg-gradient-to-br from-[var(--violet-pale)] to-[var(--coral-pale)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--violet)] animate-pulse" />
                <div>
                  <div className="font-semibold text-[var(--ink)]">Currently Building</div>
                  <div className="text-sm text-[var(--muted)]">AI-powered code review system</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
