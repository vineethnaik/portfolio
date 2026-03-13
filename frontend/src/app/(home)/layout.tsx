'use client'

import { useEffect } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'minimal'
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@300&display=swap"
        rel="stylesheet"
      />
      <div className="minimal-portfolio">{children}</div>
    </>
  )
}
