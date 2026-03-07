'use client'

import { motion } from 'framer-motion'
import { Building, Users, Briefcase, GraduationCap, Trophy, Github, MapPin, Wifi } from 'lucide-react'
import { experience } from '@/lib/data/experience'

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'full-time':
    case 'internship':
      return Building
    case 'freelance':
      return Briefcase
    case 'open-source':
      return Github
    case 'education':
      return GraduationCap
    case 'leadership':
      return Trophy
    default:
      return Building
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'text-violet border-violet'
    case 'internship':
      return 'text-coral border-coral'
    case 'freelance':
      return 'text-violet-2 border-violet-2'
    case 'open-source':
      return 'text-violet border-violet'
    case 'education':
      return 'text-gold border-gold'
    case 'leadership':
      return 'text-coral border-coral'
    default:
      return 'text-muted border-border'
  }
}

const getWorkTypeIcon = (workType: string) => {
  switch (workType) {
    case 'remote':
      return Wifi
    case 'on-site':
      return MapPin
    case 'hybrid':
      return Users
    default:
      return MapPin
  }
}

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 reveal"
        >
          <div className="section-eyebrow">experience</div>
          <h2 className="section-title mb-4">
            Professional Journey
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            My career path and key milestones in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline">
          {experience.map((item, index) => {
            const Icon = getTypeIcon(item.type)
            const WorkTypeIcon = getWorkTypeIcon(item.workType)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08 }}
                className="relative group"
              >
                {/* Timeline icon */}
                <div className="timeline-icon" style={{ color: 'var(--violet)' }}>
                  <Icon className="w-5 h-5" />
                </div>
                {/* Card */}
                <motion.div
                  className="timeline-card"
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-extrabold text-[20px] text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.title}
                      </h3>
                      <a
                        href={item.companyUrl || '#'}
                        target={item.companyUrl ? "_blank" : undefined}
                        rel={item.companyUrl ? "noopener noreferrer" : undefined}
                        className="text-[15px] font-semibold text-violet hover:text-coral transition-colors"
                      >
                        {item.company}
                      </a>
                    </div>
                    <div className="flex flex-col items-end gap-2 sm:flex-shrink-0">
                      <div className="font-display font-bold text-[14px] text-muted" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.dateRange}
                      </div>
                      <div className="location-pill">
                        <WorkTypeIcon className="w-3.5 h-3.5" />
                        <span>{item.workType === 'remote' ? 'Virtual' : item.workType === 'on-site' ? 'On-site' : item.workType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="mb-4">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="exp-item">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="px-2 py-1 bg-bg-off border border-border rounded-lg text-xs text-muted font-medium"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  {/* Project Link */}
                  {item.projectLink && (
                    <a
                      href={item.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[14px] font-semibold text-violet hover:text-coral hover:gap-[10px] transition-all"
                    >
                      View Project →
                    </a>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
