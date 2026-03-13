import { PageLoader } from '@/components/layout/PageLoader'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { AIShowcase } from '@/components/sections/AIShowcase'
import { Achievements } from '@/components/sections/Achievements'
import { GitHub } from '@/components/sections/GitHub'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function FullPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <PageLoader />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AIShowcase />
        <Achievements />
        <GitHub />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}
