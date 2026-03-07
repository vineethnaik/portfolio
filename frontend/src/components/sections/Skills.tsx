'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { skillCategories, radarData } from '@/lib/data/skills'
import { cn } from '@/lib/utils'

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('languages')
  const [viewMode, setViewMode] = useState<'cards' | 'radar'>('cards')

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]

  const getLevelClass = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return 'level-expert'
      case 'proficient': return 'level-proficient'
      case 'familiar': return 'level-familiar'
      default: return 'text-[var(--muted)]'
    }
  }

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-eyebrow">skills</div>
          <h2 className="section-title">Skill Constellation</h2>
          <p className="section-sub mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        <div className="reveal reveal-delay-1 flex justify-center mb-12">
          <div className="inline-flex gap-2">
            <button
              suppressHydrationWarning
              onClick={() => setViewMode('cards')}
              className={cn('skill-tab', viewMode === 'cards' && 'active')}
            >
              Grid View
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setViewMode('radar')}
              className={cn('skill-tab', viewMode === 'radar' && 'active')}
            >
              Radar View
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'cards' ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    suppressHydrationWarning
                    onClick={() => setActiveCategory(category.id)}
                    className={cn('skill-tab', activeCategory === category.id && 'active')}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="skill-card group relative bg-[var(--bg-off)] border-[1.5px] border-[var(--border)] rounded-[var(--radius)] p-7 text-center overflow-hidden"
                    style={{
                      transition: 'border-color 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s, background 0.25s',
                    }}
                    whileHover={{
                      borderColor: 'rgba(91,33,255,0.4)',
                      y: -6,
                      scale: 1.02,
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, var(--violet-pale), transparent)',
                      }}
                    />
                    <div
                      className="skill-icon relative z-10 w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3.5 bg-white border-[1.5px] border-[var(--border)] group-hover:scale-110 group-hover:-rotate-6"
                      style={{ transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold text-[var(--ink)] text-center mb-2 relative z-10">{skill.name}</h3>
                    <div className="text-center relative z-10">
                      <span className={getLevelClass(skill.proficiency)}>{skill.proficiency}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center w-full"
            >
              <div className="w-full max-w-2xl min-h-[400px]">
                <div className="bg-[var(--bg-off)] border-[1.5px] border-[var(--border)] rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-[var(--ink)] text-center mb-6">
                    Technical Domains Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid 
                        stroke="var(--border)" 
                        strokeDasharray="3 3"
                      />
                      <PolarAngleAxis 
                        dataKey="domain" 
                        tick={{ fill: 'var(--muted)', fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: 'var(--muted)', fontSize: 10 }}
                      />
                      <Radar
                        name="Skill Level"
                        dataKey="level"
                        stroke="var(--violet)"
                        fill="var(--violet)"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    {radarData.map((item, index) => (
                      <div key={`${item.domain}-${index}`} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `hsl(${210 + index * 15}, 70%, 50%)` }}
                        />
                        <span className="text-sm text-[var(--muted)]">{item.domain}</span>
                        <span className="text-sm text-[var(--muted)] ml-auto">{item.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
