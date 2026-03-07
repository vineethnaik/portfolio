'use client'

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mx = 0, my = 0, rx = 0, ry = 0
    let isHover = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (dot) dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      if (ring) {
        ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)${isHover ? ' scale(1.8)' : ''}`
      }
      requestAnimationFrame(animate)
    }
    animate()

    const hoverEls = document.querySelectorAll('a, button, [data-cursor]')
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => { isHover = true; if (ring) { ring.style.borderColor = 'var(--coral)'; ring.style.opacity = '0.7' } })
      el.addEventListener('mouseleave', () => { isHover = false; if (ring) { ring.style.borderColor = 'var(--violet)'; ring.style.opacity = '0.4' } })
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div id="cursor-dot" className="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" className="cursor-ring" aria-hidden="true" />
    </>
  )
}
