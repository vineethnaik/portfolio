'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return { scrollDirection, scrollY }
}
