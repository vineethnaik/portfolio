'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, BookOpen, Star, Calendar, Users } from 'lucide-react'
import { projects } from '@/lib/data/projects-simple'
import { cn } from '@/lib/utils'

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isClient, setIsClient] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'ai-ml', name: 'AI/ML' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'open-source', name: 'Open Source' }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProject = projects.find(p => p.featured) || projects[0]
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <>
      <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--bg-off)]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 reveal"
          >
            <div className="section-eyebrow">projects</div>
            <h2 className="section-title mb-4">
              Featured Projects
            </h2>
            <p className="section-sub mx-auto max-w-2xl">
              A selection of my work showcasing technical expertise and problem-solving skills
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {isClient ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  suppressHydrationWarning
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'filter-btn relative px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedCategory === category.id && 'active'
                  )}
                >
                  <span className="relative z-10">{category.name}</span>
                </button>
              ))
            ) : (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="filter-btn px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Featured Project */}
          <AnimatePresence mode="wait">
            {filteredProjects.some(p => p.featured) && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-16"
              >
                <div className="relative group">
                  <div className="relative bg-white border border-border rounded-2xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:border-violet/30 transition-all">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left - Content */}
                      <div className="flex-1 space-y-5">
                        {/* Status badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {featuredProject.status === 'production' && featuredProject.links?.live && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-white bg-[#22c55e]">
                              Live
                            </span>
                          )}
                          {featuredProject.status === 'in-progress' && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-ink bg-[var(--gold)]">
                              In Progress
                            </span>
                          )}
                          {featuredProject.status === 'archived' && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-ink bg-[var(--border)]">
                              Archived
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-white bg-[var(--violet)]">
                            Featured
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-ink leading-tight font-display" style={{ fontFamily: 'var(--font-display)' }}>
                          {featuredProject.title}
                        </h3>
                        <p className="text-muted text-base">
                          {featuredProject.tagline}
                        </p>
                        <p className="text-ink/90 text-[15px] leading-relaxed">
                          {featuredProject.description}
                        </p>

                        {/* Tech Stack - chips with colored dots */}
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.techStack.map((tech, i) => {
                            const dotColors = ['var(--violet)', 'var(--coral)', 'var(--gold)']
                            const dotColor = dotColors[i % 3]
                            return (
                              <div
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-ink bg-white border border-border"
                              >
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: dotColor }}
                                />
                                <span>{tech.name}</span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Key Impact */}
                        <div className="p-4 rounded-xl bg-[var(--violet-pale)]/60 border border-violet/10">
                          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Key Impact</div>
                          <div className="text-lg font-bold gradient-text">
                            {featuredProject.impact}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {featuredProject.links.live && (
                            <motion.a
                              href={featuredProject.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--violet)] text-white rounded-[var(--radius-pill)] font-semibold text-sm shadow-[var(--shadow-violet)] hover:opacity-90 transition-opacity"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </motion.a>
                          )}
                          {featuredProject.links.github && (
                            <motion.a
                              href={featuredProject.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-sm text-ink bg-white border border-border hover:bg-bg-off transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </motion.a>
                          )}
                          <motion.button
                            suppressHydrationWarning
                            onClick={() => setSelectedProject(featuredProject)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-sm text-ink bg-white border border-border hover:bg-bg-off transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <BookOpen className="w-4 h-4" />
                            Case Study
                          </motion.button>
                        </div>
                      </div>

                      {/* Right - Project Preview */}
                      <div className="lg:w-96 flex-shrink-0">
                        <div className="aspect-video rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[var(--violet-pale)] to-[var(--coral-pale)]/50 border border-border">
                          <div className="text-center p-6">
                            <div className="text-5xl mb-3 opacity-80">🚀</div>
                            <div className="text-sm text-muted">Project Preview</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Regular Projects - same UI as featured (image 2 style) */}
          <div className="space-y-8">
            {regularProjects.map((project, index) => {
              const categoryIcon = project.category === 'ai-ml' ? '🤖' : project.category === 'backend' ? '⚙️' : project.category === 'fullstack' ? '🌐' : '🔓'
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative bg-white border border-border rounded-2xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:border-violet/30 transition-all">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left - Content */}
                      <div className="flex-1 space-y-5">
                        {/* Status badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.status === 'production' && project.links?.live && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-white bg-[#22c55e]">
                              Live
                            </span>
                          )}
                          {project.status === 'production' && !project.links?.live && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-white bg-[var(--violet)]">
                              Production
                            </span>
                          )}
                          {project.status === 'in-progress' && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-ink bg-[var(--gold)]">
                              In Progress
                            </span>
                          )}
                          {project.status === 'archived' && (
                            <span className="px-3 py-1 rounded-[var(--radius-pill)] text-xs font-semibold uppercase tracking-wide text-ink bg-[var(--border)]">
                              Archived
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold text-ink leading-tight font-display" style={{ fontFamily: 'var(--font-display)' }}>
                          {project.title}
                        </h3>
                        <p className="text-muted text-base">
                          {project.tagline}
                        </p>
                        <p className="text-ink/90 text-[15px] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack - chips with colored dots */}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => {
                            const dotColors = ['var(--violet)', 'var(--coral)', 'var(--gold)']
                            const dotColor = dotColors[i % 3]
                            return (
                              <div
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-ink bg-white border border-border"
                              >
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: dotColor }}
                                />
                                <span>{tech.name}</span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Key Impact */}
                        <div className="p-4 rounded-xl bg-[var(--violet-pale)]/60 border border-violet/10">
                          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Key Impact</div>
                          <div className="text-lg font-bold gradient-text">
                            {project.impact}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {project.links.live && (
                            <motion.a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--violet)] text-white rounded-[var(--radius-pill)] font-semibold text-sm shadow-[var(--shadow-violet)] hover:opacity-90 transition-opacity"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </motion.a>
                          )}
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-sm text-ink bg-white border border-border hover:bg-bg-off transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </motion.a>
                          )}
                          <motion.button
                            suppressHydrationWarning
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-sm text-ink bg-white border border-border hover:bg-bg-off transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <BookOpen className="w-4 h-4" />
                            Case Study
                          </motion.button>
                        </div>
                      </div>

                      {/* Right - Project Preview */}
                      <div className="lg:w-96 flex-shrink-0">
                        <div className="aspect-video rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[var(--violet-pale)] to-[var(--coral-pale)]/50 border border-border">
                          <div className="text-center p-6">
                            <div className="text-5xl mb-3 opacity-80">{categoryIcon}</div>
                            <div className="text-sm text-muted">Project Preview</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-border p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-ink mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-violet font-medium">
                      {selectedProject.tagline}
                    </p>
                  </div>
                  <motion.button
                    suppressHydrationWarning
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-muted hover:text-ink transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-4">Problem Statement</h3>
                    <p className="text-muted">{selectedProject.details?.problem ?? selectedProject.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-4">Solution</h3>
                    <p className="text-muted">{selectedProject.details?.solution ?? selectedProject.description}</p>
                  </div>
                </div>

                {/* Architecture */}
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4">Architecture</h3>
                  <div className="p-4 bg-bg-off border border-border rounded-lg">
                    <p className="text-muted font-mono text-sm">{selectedProject.details?.architecture ?? selectedProject.description}</p>
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4">Technical Challenges</h3>
                  <div className="space-y-4">
                    {(selectedProject.details?.challenges ?? selectedProject.challenges).map((challenge, index) => (
                      <div key={index} className="p-4 bg-bg-off border border-border rounded-lg">
                        <h4 className="font-medium text-ink mb-2">{challenge.title}</h4>
                        <p className="text-muted text-sm">{challenge.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4">Results & Impact</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(selectedProject.details?.results ?? selectedProject.metrics.map(m => ({ value: m.value, label: m.label, improvement: m.improvement }))).map((result, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-violet-pale/50 to-coral-pale/30 border border-violet/20 rounded-lg">
                        <div className="text-2xl font-bold text-violet mb-1">{result.value}</div>
                        <div className="text-sm font-medium text-ink mb-1">{result.label}</div>
                        {result.improvement && (
                          <div className="text-xs text-muted">{result.improvement}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learnings */}
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4">Key Learnings</h3>
                  <ul className="space-y-2">
                    {(selectedProject.details?.learnings ?? []).map((learning, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-violet rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <div
                        key={tech.name}
                        className="px-3 py-2 bg-bg-off border border-border rounded-lg text-sm text-muted flex items-center gap-2"
                      >
                        <span>{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {selectedProject.links.live && (
                    <motion.a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-[var(--radius-pill)] font-semibold shadow-violet hover:bg-violet-2 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                  {selectedProject.links.github && (
                    <motion.a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-ink hover:bg-bg-off transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
