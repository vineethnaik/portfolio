import { projects } from './projects'
import { skillCategories } from './skills'

export interface StatBar {
  id: string
  label: string
  value: number
  max: number
  unit?: string
  color: 'blue' | 'violet' | 'cyan' | 'success'
}

export interface CategoryStat {
  category: string
  count: number
  label: string
}

export function getHeroStats() {
  // Projects by category
  const categoryCounts = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const productionCount = projects.filter(p => p.status === 'production').length
  const totalSkills = skillCategories.flatMap(c => c.skills).length
  const totalProjectCount = skillCategories.flatMap(c => c.skills).reduce((sum, s) => sum + s.projects, 0)

  const bars: StatBar[] = [
    {
      id: 'projects',
      label: 'Projects',
      value: projects.length,
      max: Math.max(projects.length + 2, 8),
      color: 'blue'
    },
    {
      id: 'production',
      label: 'In Production',
      value: productionCount,
      max: projects.length || 1,
      color: 'success'
    },
    {
      id: 'skills',
      label: 'Tech Skills',
      value: totalSkills,
      max: Math.max(totalSkills + 5, 25),
      color: 'violet'
    },
    {
      id: 'contributions',
      label: 'Skill Projects',
      value: totalProjectCount,
      max: Math.max(Math.ceil(totalProjectCount * 1.2), 50),
      unit: ' uses',
      color: 'cyan'
    }
  ]

  const categoryStats: CategoryStat[] = [
    { category: 'ai-ml', count: categoryCounts['ai-ml'] || 0, label: 'AI/ML' },
    { category: 'fullstack', count: categoryCounts['fullstack'] || 0, label: 'Full Stack' },
    { category: 'backend', count: categoryCounts['backend'] || 0, label: 'Backend' },
    { category: 'open-source', count: categoryCounts['open-source'] || 0, label: 'Open Source' }
  ]

  return { bars, categoryStats }
}
