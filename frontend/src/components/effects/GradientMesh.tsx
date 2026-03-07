'use client'

import { motion } from 'framer-motion'

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs - theme-aware via CSS variables */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-[900px] h-[900px] rounded-full opacity-25 dark:opacity-30 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[700px] h-[700px] rounded-full opacity-20 dark:opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent-violet) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-15 blur-2xl"
          style={{
            background: 'radial-gradient(circle, var(--accent-emerald) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Dot grid overlay */}
      <div 
        className="absolute inset-0 dot-grid opacity-60 dark:opacity-40"
        aria-hidden="true"
      />
    </div>
  )
}
