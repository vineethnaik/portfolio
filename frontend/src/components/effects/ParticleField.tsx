'use client'

import { useEffect, useRef } from 'react'

type ThemeKey = 'dark' | 'light'
const PARTICLE_COLORS: Record<ThemeKey, { fill: string; stroke: string }> = {
  dark: { fill: 'rgba(59, 130, 246, 0.4)', stroke: 'rgba(59, 130, 246, 0.15)' },
  light: { fill: 'rgba(37, 99, 235, 0.5)', stroke: 'rgba(124, 58, 237, 0.2)' },
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 40
    const connectionDistance = 120

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      })
    }

    const getTheme = (): ThemeKey =>
      document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'

    let theme: ThemeKey = getTheme()
    let animationId: number

    const animate = () => {
      theme = getTheme()
      const colors = PARTICLE_COLORS[theme]
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = colors.fill
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
          )

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            const alpha = 0.15 * (1 - distance / connectionDistance)
            ctx.strokeStyle = theme === 'dark' ? `rgba(59, 130, 246, ${alpha})` : `rgba(124, 58, 237, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  )
}
