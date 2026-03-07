'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, GitBranch, GitPullRequest, GitMerge, Star, Eye, ExternalLink } from 'lucide-react'

const getContributionClass = (level: number) => {
  if (level === 0) return 'bg-[var(--border)]'
  return ''
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekDays = ['', 'Mon', '', 'Wed', '', 'Fri', '']

type ContributionDay = { date: string; contributions: number; level: number }
type Repo = { name: string; description: string; language: string; languageColor: string; stars: number; forks: number; lastUpdated: string; url?: string }
type LangBreakdown = { name: string; value: number; color: string }

type GitHubData = {
  contributions: ContributionDay[]
  stats: { totalCommits: number; currentStreak: number; longestStreak: number; totalStars: number; prsMerged: number; issuesClosed: number }
  repos: Repo[]
  languageBreakdown: LangBreakdown[]
}

export function GitHub() {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; contributions: number } | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github/stats')
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) {
          throw new Error(json.error || (res.status === 503 ? 'GitHub token not configured' : 'Failed to load'))
        }
        return json
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const contributionData = data?.contributions ?? []
  const githubStats = data?.stats ?? { totalCommits: 0, currentStreak: 0, longestStreak: 0, totalStars: 0, prsMerged: 0, issuesClosed: 0 }
  const topRepos = data?.repos ?? []
  const languageBreakdown = data?.languageBreakdown ?? []

  const weeks = (() => {
    const weekData: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []
    for (let i = 0; i < contributionData.length; i++) {
      currentWeek.push(contributionData[i])
      if (currentWeek.length === 7 || i === contributionData.length - 1) {
        weekData.push(currentWeek)
        currentWeek = []
      }
    }
    return weekData
  })()

  return (
    <section id="github" className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 reveal"
        >
          <div className="section-eyebrow">github activity</div>
          <h2 className="section-title mb-4">
            Open Source Contributions
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Active contributor to the open source community with consistent GitHub activity
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-border rounded-xl p-6"
          >
            {/* Contribution Activity */}
            {loading ? (
              <div className="h-64 flex items-center justify-center text-muted">
                <div className="text-center">
                  <Github className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
                  <p>Loading GitHub activity...</p>
                </div>
              </div>
            ) : error ? (
              <div className="h-64 flex items-center justify-center text-muted">
                <div className="text-center">
                  <Github className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-coral font-medium">{error}</p>
                  <p className="text-sm mt-2">Add GITHUB_TOKEN to .env.local</p>
                </div>
              </div>
            ) : (
              <>
            <h3 className="text-lg font-semibold text-ink mb-6">Contribution Activity</h3>
            
            {/* Month labels */}
            <div className="flex justify-between mb-2 px-8">
              {months.map((month, index) => (
                <div key={month} className="text-xs text-muted w-8 text-center">
                  {index % 2 === 0 ? month : ''}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-1">
              {/* Week day labels */}
              <div className="flex flex-col gap-1 mr-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="h-3 flex items-center justify-end pr-1">
                    <span className="text-xs text-muted">{day}</span>
                  </div>
                ))}
              </div>

              {/* Contribution cells */}
              <div className="flex gap-1 overflow-x-auto">
                {weeks.slice(-52).map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: (weekIndex * 7 + dayIndex) * 0.001,
                          duration: 0.3
                        }}
                        onMouseEnter={() => setHoveredCell({ date: typeof day.date === 'string' ? day.date : (day.date as unknown as Date).toISOString().split('T')[0], contributions: day.contributions })}
                        onMouseLeave={() => setHoveredCell(null)}
                        onMouseMove={handleMouseMove}
                        data-level={day.level}
                        className={`heatmap-cell w-3 h-3 rounded-[3px] cursor-pointer border border-border transition-transform hover:scale-125 ${getContributionClass(day.level)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs text-muted">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((level) => (
                  <div
                    key={level}
                    data-level={level}
                    className={`heatmap-cell w-3 h-3 rounded-[3px] border border-border ${level === 0 ? 'bg-[var(--border)]' : ''}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>

            {/* Tooltip */}
            {hoveredCell && (
              <div
                className="fixed z-50 px-3 py-2 bg-white border border-border rounded-lg text-sm pointer-events-none shadow-lg"
                style={{
                  left: mousePosition.x + 10,
                  top: mousePosition.y - 40
                }}
              >
                <div className="font-medium text-ink">
                  {hoveredCell.contributions} contributions
                </div>
                <div className="text-muted">
                  {new Date(hoveredCell.date).toLocaleDateString()}
                </div>
              </div>
            )}
              </>
            )}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <GitBranch className="github-stat-icon w-6 h-6 text-violet mx-auto block" />
              <div className="github-stat-val text-3xl">{githubStats.totalCommits}</div>
              <div className="github-stat-label">Total Commits</div>
            </div>
            
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <GitMerge className="github-stat-icon w-6 h-6 text-violet mx-auto block" />
              <div className="github-stat-val text-3xl text-coral">{githubStats.currentStreak}</div>
              <div className="github-stat-label">Current Streak</div>
            </div>
            
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <Star className="github-stat-icon w-6 h-6 text-gold mx-auto block" />
              <div className="github-stat-val text-3xl">{githubStats.longestStreak}</div>
              <div className="github-stat-label">Longest Streak</div>
            </div>
            
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <Star className="github-stat-icon w-6 h-6 text-violet mx-auto block" />
              <div className="github-stat-val text-3xl text-violet">{githubStats.totalStars}</div>
              <div className="github-stat-label">Total Stars</div>
            </div>
            
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <GitPullRequest className="github-stat-icon w-6 h-6 text-coral mx-auto block" />
              <div className="github-stat-val text-3xl">{githubStats.prsMerged}</div>
              <div className="github-stat-label">PRs Merged</div>
            </div>
            
            <div className="github-stat-card bg-white border border-border rounded-lg p-5 text-center transition-all">
              <Eye className="github-stat-icon w-6 h-6 text-violet mx-auto block" />
              <div className="github-stat-val text-3xl text-gold">{githubStats.issuesClosed}</div>
              <div className="github-stat-label">Issues Closed</div>
            </div>
          </motion.div>

          {/* Top Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-ink mb-6">Top Repositories</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {topRepos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.url || `https://github.com/vineethnaik/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="repo-item p-4 bg-bg-off border border-border rounded-lg hover:border-violet hover:bg-violet-pale hover:-translate-y-0.5 transition-all block"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="repo-name font-display font-bold text-[14px] text-violet flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                        <Github className="w-4 h-4" />
                        {repo.name}
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </h4>
                      <p className="repo-desc text-[13px] text-muted mt-1">{repo.description}</p>
                    </div>
                  </div>
                  
                  <div className="repo-meta flex items-center gap-4 text-xs text-muted mt-3">
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{repo.forks}</span>
                    </div>
                    <span>{repo.lastUpdated}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Language Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-ink mb-6">Language Breakdown</h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Donut chart visualization */}
              <div className="relative w-64 h-64 mx-auto">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {languageBreakdown.map((lang, index) => {
                    const percentage = lang.value
                    const strokeDasharray = `${percentage} ${100 - percentage}`
                    const rotation = index === 0 ? 0 : languageBreakdown.slice(0, index).reduce((sum, l) => sum + l.value, 0)
                    
                    return (
                      <circle
                        key={lang.name}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={lang.color}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-rotation}
                        className="transition-all duration-500"
                      />
                    )
                  })}
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform rotate-90">
                    <div className="text-2xl font-bold text-ink">{languageBreakdown.length}</div>
                    <div className="text-xs text-muted">Languages</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {languageBreakdown.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm font-medium text-ink">{lang.name}</span>
                    </div>
                    <div className="text-sm text-muted">{lang.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
