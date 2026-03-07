'use client'

import { CustomCursor } from '@/components/effects/CustomCursor'
import { useReveal } from '@/hooks/useReveal'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useReveal()
  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
