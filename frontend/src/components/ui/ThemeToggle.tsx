'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'system', icon: Monitor, label: 'System' },
    { name: 'dark', icon: Moon, label: 'Dark' },
  ] as const

  if (!isClient) {
    return (
      <div className="flex items-center gap-1 p-1 bg-bg-elevated rounded-lg border border-border-subtle">
        <div className="w-8 h-8 bg-bg-hover rounded-md border border-border-default" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-bg-elevated rounded-lg border border-border-subtle">
      {themes.map(({ name, icon: Icon, label }) => (
        <motion.button
          key={name}
          onClick={() => setTheme(name)}
          className={`relative p-2 rounded-md transition-colors ${
            theme === name
              ? 'text-text-primary'
              : 'text-text-muted hover:text-text-secondary'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="sr-only">{label}</span>
          {theme === name && (
            <motion.div
              layoutId="active-theme"
              className="absolute inset-0 bg-bg-hover rounded-md border border-border-default"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
