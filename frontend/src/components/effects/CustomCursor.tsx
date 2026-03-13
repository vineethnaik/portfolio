'use client'

import { useEffect, useRef, useCallback } from 'react'

const LERP_FACTOR = 0.2
const MAIN_BASE_SIZE = 28
const SATELLITE_SIZES = [13, 10, 8, 6]
const SATELLITE_SPRINGS = [0.09, 0.07, 0.05, 0.04]
const SATELLITE_DAMPING = [0.72, 0.75, 0.78, 0.8]
const SATELLITE_RADII = [38, 26, 52, 18]
const SATELLITE_SPEEDS = [0.9, -1.3, 0.55, -0.7]
const SATELLITE_PHASES = [0, 2.1, 4.2, 1.05]

type CursorState = 'default' | 'link' | 'project' | 'drag'

interface CursorConfig {
  color: string
  mainSize: number
  labelColor: 'white' | 'dark'
}

const CURSOR_CONFIGS: Record<CursorState, CursorConfig> = {
  default: { color: '#E8E4DD', mainSize: 28, labelColor: 'dark' },
  link: { color: '#FF3C00', mainSize: 44, labelColor: 'white' },
  project: { color: '#00FFCC', mainSize: 56, labelColor: 'dark' },
  drag: { color: '#FFE500', mainSize: 36, labelColor: 'dark' },
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function CustomCursor() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const mxRef = useRef(0)
  const myRef = useRef(0)
  const rxRef = useRef(0)
  const ryRef = useRef(0)
  const vxRef = useRef(0)
  const vyRef = useRef(0)
  const speedRef = useRef(0)
  const angleRef = useRef(0)
  const scaleXRef = useRef(1)
  const scaleYRef = useRef(1)
  const mainSizeRef = useRef(28)
  const colorRef = useRef('#E8E4DD')
  const labelRefVal = useRef('')
  const labelVisibleRef = useRef(false)
  const cursorStateRef = useRef<CursorState>('default')
  const isInWindowRef = useRef(true)
  const isMouseDownRef = useRef(false)
  const mainScaleRef = useRef(1)

  const satellitesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>(
    SATELLITE_SIZES.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  )
  const particlesRef = useRef<Particle[]>([])

  const updateCursorState = useCallback(() => {
    const target = document.elementFromPoint(mxRef.current, myRef.current)
    let el: Element | null = target
    let cursor: CursorState = 'default'
    let label = ''

    while (el && el !== document.body) {
      const c = el.getAttribute('data-cursor') as CursorState | null
      const l = el.getAttribute('data-label')
      if (c && ['link', 'project', 'drag'].includes(c)) {
        cursor = c
        if (l) label = l
        break
      }
      el = el.parentElement
    }

    cursorStateRef.current = cursor
    labelRefVal.current = label
    labelVisibleRef.current = label.length > 0
    const cfg = CURSOR_CONFIGS[cursor]
    mainSizeRef.current = cfg.mainSize
    colorRef.current = cfg.color
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const labelEl = labelRef.current
    if (!overlay) return

    let prevX = 0
    let prevY = 0
    let lastTime = performance.now()
    let initialized = false

    const handleMove = (e: MouseEvent) => {
      mxRef.current = e.clientX
      myRef.current = e.clientY
      if (!initialized) {
        initialized = true
        prevX = e.clientX
        prevY = e.clientY
        rxRef.current = e.clientX
        ryRef.current = e.clientY
      }
      updateCursorState()
      updateVelocity()
    }

    const onLeave = () => {
      isInWindowRef.current = false
      overlay.style.opacity = '0'
    }

    const onEnter = () => {
      isInWindowRef.current = true
      overlay.style.opacity = '1'
    }

    const onMouseDown = () => {
      isMouseDownRef.current = true
      mainScaleRef.current = 0.7
      setTimeout(() => {
        mainScaleRef.current = 1
      }, 120)

      // Spawn particles
      const angleOffset = Math.random() * Math.PI * 2
      const color = colorRef.current
      for (let i = 0; i < 10; i++) {
        const angle = (2 * Math.PI / 10) * i + angleOffset + (Math.random() - 0.5)
        const speed = 4 + Math.random() * 8
        particlesRef.current.push({
          x: mxRef.current,
          y: myRef.current,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 6,
          opacity: 1,
          color,
        })
      }
    }

    const onMouseUp = () => {
      isMouseDownRef.current = false
    }

    const updateVelocity = () => {
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 16.67, 3)
      lastTime = now
      const mx = mxRef.current
      const my = myRef.current
      if (dt > 0) {
        vxRef.current = (mx - prevX) / dt
        vyRef.current = (my - prevY) / dt
        speedRef.current = Math.sqrt(vxRef.current ** 2 + vyRef.current ** 2) / 10
        if (speedRef.current > 0.01) {
          angleRef.current = Math.atan2(vyRef.current, vxRef.current)
        }
      }
      prevX = mx
      prevY = my
    }

    document.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    const animate = () => {
      const mx = mxRef.current
      const my = myRef.current
      const rx = rxRef.current
      const ry = ryRef.current
      const speed = speedRef.current
      const angle = angleRef.current
      const color = colorRef.current

      // Main blob lerp
      rxRef.current += (mx - rx) * LERP_FACTOR
      ryRef.current += (my - ry) * LERP_FACTOR

      // Main blob stretch
      const stretch = Math.min(speed * 0.05, 0.9)
      scaleXRef.current = 1 + stretch
      scaleYRef.current = Math.max(0.5, 1 / scaleXRef.current)
      if (speed < 1) {
        scaleXRef.current += (1 - scaleXRef.current) * 0.15
        scaleYRef.current = Math.max(0.5, 1 / scaleXRef.current)
      }

      const mainScale = mainScaleRef.current
      const scaleX = scaleXRef.current
      const scaleY = scaleYRef.current
      const mainSize = mainSizeRef.current

      // Update satellites with spring physics
      const radiusMult = Math.max(0.3, 1 - speed * 0.01)
      const satellites = satellitesRef.current
      const time = performance.now() * 0.001

      SATELLITE_SIZES.forEach((size, i) => {
        const rad = SATELLITE_RADII[i] * radiusMult
        const spd = SATELLITE_SPEEDS[i]
        const phase = SATELLITE_PHASES[i]
        const targetX = mx + Math.cos(time * spd + phase * Math.PI) * rad
        const targetY = my + Math.sin(time * spd + phase * Math.PI) * rad

        const s = satellites[i]
        const spring = SATELLITE_SPRINGS[i]
        const damp = SATELLITE_DAMPING[i]
        s.vx += (targetX - s.x) * spring
        s.vy += (targetY - s.y) * spring
        s.vx *= damp
        s.vy *= damp
        s.x += s.vx
        s.y += s.vy
      })

      // Update particles
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += 0.25
        p.vx *= 0.93
        p.vy *= 0.93
        p.x += p.vx
        p.y += p.vy
        p.opacity -= 0.04 + Math.random() * 0.04
        if (p.opacity <= 0) particles.splice(i, 1)
      }

      // Apply transforms to blobs
      const main = overlay.querySelector('.cursor-main')
      const sats = overlay.querySelectorAll('.cursor-sat')
      const particleContainer = overlay.querySelector('.cursor-particles')

      if (main) {
        const x = rxRef.current
        const y = ryRef.current
        const deg = (angle * 180) / Math.PI
        const w = MAIN_BASE_SIZE * (mainSize / MAIN_BASE_SIZE) * scaleX * mainScale
        const h = MAIN_BASE_SIZE * (mainSize / MAIN_BASE_SIZE) * scaleY * mainScale
        ;(main as HTMLElement).style.cssText = `
          left: ${x}px; top: ${y}px;
          width: ${w}px; height: ${h}px;
          transform: translate(-50%,-50%) rotate(${deg}deg);
          background: ${color};
        `
      }

      sats.forEach((el, i) => {
        const s = satellites[i]
        const size = SATELLITE_SIZES[i]
        ;(el as HTMLElement).style.cssText = `
          left: ${s.x}px; top: ${s.y}px;
          width: ${size}px; height: ${size}px;
          transform: translate(-50%,-50%);
          background: ${color};
        `
      })

      if (particleContainer) {
        particleContainer.innerHTML = particles
          .map(
            (p) =>
              `<div style="position:fixed;left:${p.x}px;top:${p.y}px;width:${p.size}px;height:${p.size}px;border-radius:50%;background:${p.color};transform:translate(-50%,-50%);opacity:${p.opacity};pointer-events:none" aria-hidden="true"></div>`
          )
          .join('')
      }

      // Label
      if (labelEl) {
        labelEl.style.left = `${mx}px`
        labelEl.style.top = `${my}px`
        labelEl.textContent = labelRefVal.current
        labelEl.style.opacity = labelVisibleRef.current ? '1' : '0'
        const cfg = CURSOR_CONFIGS[cursorStateRef.current]
        labelEl.style.color = cfg.labelColor === 'white' ? '#fff' : '#0A0812'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateCursorState])

  return (
    <>
      <div
        ref={overlayRef}
        className="cursor-metaball-overlay"
        aria-hidden="true"
      >
        <svg className="cursor-svg-filter" width="0" height="0">
          <defs>
            <filter id="cursor-goo" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className="cursor-blobs" style={{ filter: 'url(#cursor-goo)' }}>
          <div className="cursor-main" />
          {SATELLITE_SIZES.map((_, i) => (
            <div key={i} className="cursor-sat" />
          ))}
        </div>
        <div className="cursor-particles" aria-hidden="true" />
      </div>
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  )
}
