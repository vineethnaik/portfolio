'use client'

import { useState, useEffect, useRef } from 'react'

interface UseCountUpProps {
  end: number
  duration?: number
  startOnView?: boolean
}

export function useCountUp<T extends HTMLElement = HTMLDivElement>({ 
  end, 
  duration = 2000, 
  startOnView = true 
}: UseCountUpProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!startOnView) {
      startCounting()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            startCounting()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [startOnView, hasStarted])

  const startCounting = () => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const remaining = Math.max((endTime - now) / duration, 0)
      const current = Math.round(end - end * remaining)
      
      setCount(current)

      if (remaining > 0) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return { count, elementRef }
}
