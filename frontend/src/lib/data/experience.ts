export interface ExperienceItem {
  id: string
  type: 'full-time' | 'internship' | 'freelance' | 'open-source' | 'education' | 'leadership'
  dateRange: string
  title: string
  company: string
  companyUrl?: string
  location: string
  workType: 'remote' | 'on-site' | 'hybrid'
  description: string[]
  techStack: string[]
  projectLink?: string
}

export const experience: ExperienceItem[] = [
  {
    id: 'internship-juniper',
    type: 'internship',
    dateRange: '2024',
    title: 'Networking Virtual Internship',
    company: 'Juniper Networks (JNCIA-Junos)',
    companyUrl: 'https://juniper.net',
    location: 'Virtual',
    workType: 'remote',
    description: [
      'Configured routing, switching, and network security concepts in cloud lab environments',
      'Strengthened systems and infrastructure fundamentals',
      'Completed hands-on labs for network configuration and troubleshooting',
      'Achieved JNCIA-Junos certification preparation'
    ],
    techStack: ['Juniper', 'Networking', 'Security', 'Cloud Labs'],
    projectLink: 'https://juniper.net/training'
  },
  {
    id: 'education-kluniversity',
    type: 'education',
    dateRange: '2023 - Present',
    title: 'B.Tech in Computer Science and Engineering',
    company: 'KL University',
    companyUrl: 'https://kluniversity.in',
    location: 'Andhra Pradesh, India',
    workType: 'on-site',
    description: [
      'Relevant Coursework: Data Structures, DBMS, Operating Systems, AI/ML, Cloud Computing, Software Engineering',
      'GPA: 8.5/10',
      'Active participant in technical competitions and hackathons',
      'Led cross-functional team in Design Thinking & Innovation competition'
    ],
    techStack: ['Java', 'Python', 'Data Structures', 'Algorithms', 'Database Management'],
    projectLink: 'https://kluniversity.in'
  },
  {
    id: 'leadership-competition',
    type: 'leadership',
    dateRange: '2024',
    title: 'Design Thinking & Innovation Competition',
    company: 'KL University',
    location: 'Andhra Pradesh, India',
    workType: 'on-site',
    description: [
      'Led a cross-functional team to secure 1st place in the competition',
      'Demonstrated business-focused problem solving and collaboration skills',
      'Developed user-centric solution design with market validation',
      'Presented innovative technology solutions to industry judges'
    ],
    techStack: ['Design Thinking', 'Business Analysis', 'Problem Solving', 'Team Leadership']
  }
]
