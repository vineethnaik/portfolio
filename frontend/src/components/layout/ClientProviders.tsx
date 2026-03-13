'use client'

import { usePathname } from 'next/navigation'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { useReveal } from '@/hooks/useReveal'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useReveal()
  const showGooeyCursor = pathname === '/full'
  return (
    <>
      {showGooeyCursor && <CustomCursor />}
      {children}
    </>
  )
}
