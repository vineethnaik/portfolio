export interface Skill {
  name: string
  icon: string
  proficiency: 'expert' | 'proficient' | 'familiar'
  projects: number
  years: number
}

export interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    skills: [
      { name: 'Java', icon: '☕', proficiency: 'expert', projects: 8, years: 3 },
      { name: 'Python', icon: '🐍', proficiency: 'expert', projects: 6, years: 3 },
      { name: 'C', icon: '⚙️', proficiency: 'proficient', projects: 4, years: 2 },
      { name: 'TypeScript', icon: '⚡', proficiency: 'proficient', projects: 5, years: 2 },
      { name: 'JavaScript', icon: '🟨', proficiency: 'proficient', projects: 5, years: 2 },
    ]
  },
  {
    id: 'web-backend',
    name: 'Web & Backend',
    skills: [
      { name: 'React.js', icon: '⚛️', proficiency: 'expert', projects: 6, years: 2 },
      { name: 'Node.js', icon: '🟢', proficiency: 'expert', projects: 5, years: 2 },
      { name: 'Spring Boot', icon: '🍃', proficiency: 'proficient', projects: 3, years: 1 },
      { name: 'REST APIs', icon: '🔌', proficiency: 'expert', projects: 8, years: 2 },
      { name: 'Express.js', icon: '📦', proficiency: 'proficient', projects: 4, years: 1 },
    ]
  },
  {
    id: 'databases',
    name: 'Databases',
    skills: [
      { name: 'MySQL', icon: '🗄️', proficiency: 'expert', projects: 4, years: 2 },
      { name: 'MongoDB', icon: '🍃', proficiency: 'expert', projects: 5, years: 2 },
      { name: 'PostgreSQL', icon: '🐘', proficiency: 'familiar', projects: 2, years: 1 },
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS Fundamentals', icon: '☁️', proficiency: 'proficient', projects: 3, years: 1 },
      { name: 'Docker', icon: '🐳', proficiency: 'proficient', projects: 4, years: 1 },
      { name: 'Kubernetes', icon: '☸️', proficiency: 'familiar', projects: 2, years: 1 },
      { name: 'Git', icon: '📦', proficiency: 'expert', projects: 10, years: 2 },
      { name: 'GitHub', icon: '🐙', proficiency: 'expert', projects: 10, years: 2 },
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    skills: [
      { name: 'SQL', icon: '🗃️', proficiency: 'expert', projects: 6, years: 2 },
      { name: 'Data Analysis', icon: '📊', proficiency: 'proficient', projects: 4, years: 1 },
      { name: 'Power BI', icon: '📈', proficiency: 'familiar', projects: 2, years: 1 },
      { name: 'AI Automation', icon: '🤖', proficiency: 'proficient', projects: 3, years: 1 },
    ]
  }
]

export const radarData = skillCategories.map(category => {
  const levels = category.skills.map(skill =>
    skill.proficiency === 'expert' ? 100 : skill.proficiency === 'proficient' ? 75 : 50
  )
  const avgLevel = Math.round(levels.reduce((a, b) => a + b, 0) / levels.length)
  return {
    domain: category.name,
    level: avgLevel,
    category: category.name
  }
})
