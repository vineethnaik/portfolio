'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Award, Code, BookOpen, ExternalLink, Calendar, Users, Star, Target, Copy, Check, BadgeCheck } from 'lucide-react'
import { achievements } from '@/lib/data/achievements'

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'hackathon':
      return Trophy
    case 'certification':
      return Award
    case 'coding':
      return Code
    case 'recognition':
      return BookOpen
    default:
      return Star
  }
}

const getCategoryBadge = (type: string) => {
  if (type === 'certification') {
    return { label: 'Certificate', Icon: BadgeCheck, className: 'text-coral bg-coral-pale border-coral/20' }
  }
  return { label: 'Achievement', Icon: Star, className: 'text-violet bg-violet-pale border-violet/20' }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'hackathon':
      return 'from-violet to-violet-2'
    case 'certification':
      return 'from-coral to-coral-2'
    case 'coding':
      return 'from-violet-2 to-coral'
    case 'recognition':
      return 'from-gold to-coral'
    default:
      return 'from-violet to-violet-2'
  }
}

export function Achievements() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyCredential = useCallback(async (id: string, credentialId: string) => {
    try {
      await navigator.clipboard.writeText(credentialId)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback for older browsers
      setCopiedId(null)
    }
  }, [])

  const hackathons = achievements.filter(a => a.type === 'hackathon')
  const certifications = achievements.filter(a => a.type === 'certification')
  const coding = achievements.filter(a => a.type === 'coding')
  const recognition = achievements.filter(a => a.type === 'recognition')

  return (
    <section id="achievements" className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--bg-off)]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 reveal"
        >
          <div className="section-eyebrow">achievements</div>
          <h2 className="section-title mb-4">
            Achievements & Certifications
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Recognition for technical excellence and continuous learning
          </p>
        </motion.div>

        {/* Grid layout - rows align, cards equal height per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Hackathon Cards */}
          {hackathons.map((achievement, index) => {
            const Icon = getTypeIcon(achievement.type)
            const gradientColor = getTypeColor(achievement.type)
            const badge = getCategoryBadge(achievement.type)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <div className={`cert-card h-full flex flex-col ${achievement.placement?.toLowerCase().includes('1st') ? 'award-card' : ''}`}>
                  <div className="relative flex flex-col gap-4 flex-1">
                    <div className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                      <badge.Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${gradientColor} rounded-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className={`font-display font-extrabold text-[16px] text-ink ${achievement.placement?.toLowerCase().includes('1st') ? 'gradient-text' : ''}`} style={{ fontFamily: 'var(--font-display)' }}>{achievement.title}</h3>
                          <p className="text-[14px] font-semibold text-violet">{achievement.organization}</p>
                        </div>
                      </div>
                      {achievement.placement && (
                        <div className="px-2 py-1 bg-violet-pale border border-violet/20 rounded text-xs font-medium text-violet">
                          {achievement.placement}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {achievement.description && (
                      <p className="text-sm text-muted">{achievement.description}</p>
                    )}

                    {/* Meta info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar className="w-3 h-3" />
                        <span>{achievement.date}</span>
                      </div>
                      {achievement.teamSize && (
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Users className="w-3 h-3" />
                          <span>{achievement.teamSize}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Link */}
                    {achievement.projectLink && (
                      <a
                        href={achievement.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-violet hover:text-violet-2 transition-colors"
                      >
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Certification Cards */}
          {certifications.map((achievement, index) => {
            const Icon = getTypeIcon(achievement.type)
            const gradientColor = getTypeColor(achievement.type)
            const badge = getCategoryBadge(achievement.type)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (hackathons.length + index) * 0.1 }}
                className="group h-full"
              >
                <div className={`cert-card h-full flex flex-col ${achievement.placement?.toLowerCase().includes('1st') ? 'award-card' : ''}`}>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                      <badge.Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${gradientColor} rounded-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display font-extrabold text-[16px] text-ink" style={{ fontFamily: 'var(--font-display)' }}>{achievement.title}</h3>
                          <p className="text-[14px] font-semibold text-violet">{achievement.organization}</p>
                        </div>
                      </div>
                    </div>

                    {/* Credential ID */}
                    {achievement.credentialId && (
                      <div className="credential-box relative">
                        <div className="credential-label">Credential ID</div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="credential-id">{achievement.credentialId}</div>
                          <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => handleCopyCredential(achievement.id, achievement.credentialId!)}
                            className="flex-shrink-0 p-2 rounded-lg text-muted hover:bg-violet-pale hover:text-violet transition-colors"
                            aria-label="Copy credential ID"
                          >
                            {copiedId === achievement.id ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <AnimatePresence>
                          {copiedId === achievement.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 4, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute -top-8 left-0 right-0 flex justify-center"
                            >
                              <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold shadow-lg">
                                Copied!
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-muted">
                      <Calendar className="w-3 h-3" />
                      <span>{achievement.date}</span>
                    </div>

                    {/* Verify Link */}
                    {achievement.verifyLink && (
                      <a
                        href={achievement.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="verify-cert-btn inline-flex items-center gap-2 px-[18px] py-[9px] rounded-[var(--radius-pill)] font-semibold text-[13px] text-ink-2 bg-bg-off border border-border hover:bg-violet hover:text-white hover:border-violet hover:shadow-[var(--shadow-violet)] hover:-translate-y-0.5 transition-all"
                      >
                        Verify Certificate
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Competitive Coding Cards */}
          {coding.map((achievement, index) => {
            const Icon = getTypeIcon(achievement.type)
            const gradientColor = getTypeColor(achievement.type)
            const badge = getCategoryBadge(achievement.type)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (hackathons.length + certifications.length + index) * 0.1 }}
                className="group h-full"
              >
                <div className="cert-card h-full flex flex-col">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                      <badge.Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${gradientColor} rounded-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink">{achievement.title}</h3>
                          <p className="text-sm text-violet">{achievement.platform}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-violet">{achievement.rating}</div>
                        <div className="text-xs text-muted">{achievement.rank}</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-bg-off border border-border rounded-lg">
                        <div className="text-lg font-semibold text-ink">{achievement.problemsSolved}</div>
                        <div className="text-xs text-muted">Problems Solved</div>
                      </div>
                      <div className="text-center p-3 bg-bg-off border border-border rounded-lg">
                        <div className="text-lg font-semibold text-violet">{achievement.percentile}</div>
                        <div className="text-xs text-muted">Percentile</div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Target className="w-3 h-3" />
                      <span>Last updated: {achievement.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Recognition Cards */}
          {recognition.map((achievement, index) => {
            const Icon = getTypeIcon(achievement.type)
            const gradientColor = getTypeColor(achievement.type)
            const badge = getCategoryBadge(achievement.type)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (hackathons.length + certifications.length + coding.length + index) * 0.1 }}
                className="group h-full"
              >
                <div className="cert-card h-full flex flex-col">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                      <badge.Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </div>
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${gradientColor} rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-ink">{achievement.title}</h3>
                          <p className="text-sm text-violet">{achievement.organization}</p>
                      </div>
                    </div>

                    {/* Description */}
                    {achievement.description && (
                      <p className="text-sm text-muted">{achievement.description}</p>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Star className="w-3 h-3" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
