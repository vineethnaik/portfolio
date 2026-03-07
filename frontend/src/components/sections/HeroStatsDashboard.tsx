'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { BarChart3, Cpu, FolderGit2 } from 'lucide-react'
import { getHeroStats } from '@/lib/data/hero-stats'

function AnimatedBar({
  label,
  value,
  max,
  valueColor,
  delay,
}: {
  label: string
  value: number
  max: number
  valueColor: 'violet' | 'coral'
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setDisplayValue(Math.round(value * (1 - Math.pow(1 - p, 2))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  const fillPercent = max > 0 ? Math.min((value / max) * 100, 100) : 0

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay }}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-[var(--muted)]">{label}</span>
        <span
          className="font-display font-extrabold tabular-nums text-[22px]"
          style={{
            fontFamily: 'var(--font-display)',
            color: valueColor === 'violet' ? 'var(--violet)' : 'var(--coral)',
          }}
        >
          {displayValue}
        </span>
      </div>
      <div className="h-2 bg-[var(--bg-off)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: valueColor === 'violet' ? 'var(--violet)' : 'var(--coral)' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${fillPercent}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function HeroStatsDashboard() {
  const { bars, categoryStats } = getHeroStats()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className="stats-card min-h-[280px] animate-pulse"
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 28,
          boxShadow: 'var(--shadow-lg)',
        }}
      />
    )
  }

  const barColors: ('violet' | 'coral')[] = ['violet', 'coral', 'violet', 'coral']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative"
    >
      <div
        className="stats-card p-7"
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 font-mono text-xs text-[var(--muted)]">portfolio_stats</span>
          <div className="ml-auto flex items-center gap-1 text-[var(--muted)]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="text-[10px]">live data</span>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          {bars.map((bar, i) => (
            <AnimatedBar
              key={bar.id}
              label={bar.label}
              value={bar.value}
              max={bar.max}
              valueColor={barColors[i]}
              delay={i * 0.1}
            />
          ))}
        </div>

        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-1.5">
            <FolderGit2 className="w-3 h-3" />
            Projects by category
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryStats.map((stat, i) => (
              <span
                key={stat.category}
                className="px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-semibold border-[1.5px]"
                style={{
                  background: i % 2 === 0 ? 'var(--violet-pale)' : 'var(--coral-pale)',
                  color: i % 2 === 0 ? 'var(--violet)' : 'var(--coral)',
                  borderColor: i % 2 === 0 ? 'rgba(91,33,255,0.2)' : 'rgba(255,61,87,0.2)',
                }}
              >
                {stat.label}: {stat.count}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] text-[var(--muted)]">
          <Cpu className="w-3 h-3 text-[#22C55E]" />
          <span>Derived from portfolio data</span>
        </div>
      </div>

      {/* Floating tech tags */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 px-3.5 py-1.5 bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius-pill)] text-xs font-semibold text-[var(--ink-2)]"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        React
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/2 -left-8 px-3.5 py-1.5 bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius-pill)] text-xs font-semibold text-[var(--ink-2)]"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        Python
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-4 right-1/4 px-3.5 py-1.5 bg-white border-[1.5px] border-[var(--border)] rounded-[var(--radius-pill)] text-xs font-semibold text-[var(--ink-2)]"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        AWS
      </motion.div>
    </motion.div>
  )
}
