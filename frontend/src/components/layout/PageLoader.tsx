'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('portfolio-visited')
    if (visited) {
      setHasVisited(true)
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem('portfolio-visited', 'true')
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (hasVisited || !isLoading) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <div className="relative">
            {/* SVG Monogram Animation */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="relative z-10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.2
              }}
            >
              {/* JD Monogram */}
              <motion.path
                d="M30 30 L30 90 L50 90 L50 50 L70 50 L70 30 Z"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                d="M70 50 L90 90 M70 70 L90 70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2f81f7" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Progress Line */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, #5B21FF, #FF3D57)',
                width: '120px',
                transformOrigin: 'left center'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.3
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
