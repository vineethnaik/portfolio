export interface TechBadge {
  name: string
  icon?: string
}

export interface Challenge {
  title: string
  solution: string
}

export interface Metric {
  label: string
  value: string
  improvement?: string
}

export interface ProjectDetails {
  problem: string
  solution: string
  architecture: string
  challenges: Challenge[]
  results: { value: string; label: string; improvement?: string }[]
  learnings: string[]
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  thumbnail: string
  techStack: TechBadge[]
  category: 'ai-ml' | 'backend' | 'fullstack' | 'open-source'
  featured: boolean
  status: 'production' | 'archived' | 'in-progress'
  links: {
    live?: string
    github?: string
    casestudy?: string
  }
  impact: string
  metrics: Metric[]
  challenges: Challenge[]
  startDate: string
  endDate?: string
  details?: ProjectDetails
}

export const projects: Project[] = [
  {
    id: 'ai-traffic-control',
    title: 'AI-Driven Adaptive Traffic Signal Control',
    tagline: 'Computer Vision Traffic Optimization System',
    description: 'Built an AI-powered computer vision system to optimize traffic flow and reduce congestion. Achieved a 30% reduction in average waiting time, demonstrating data-driven optimization and real-world impact.',
    thumbnail: '/projects/traffic-control.jpg',
    techStack: [
      { name: 'Python', icon: '🐍' },
      { name: 'Computer Vision', icon: '👁️' },
      { name: 'AI/ML', icon: '🤖' },
      { name: 'Data Analysis', icon: '📊' }
    ],
    category: 'ai-ml',
    featured: true,
    status: 'in-progress',
    links: {
      github: 'https://github.com/eslavathvineethnaik/ai-traffic-control'
    },
    impact: '30% reduction in average waiting time',
    metrics: [
      { label: 'Waiting Time Reduction', value: '30%', improvement: 'from baseline' },
      { label: 'Traffic Flow Efficiency', value: '85%', improvement: 'optimization rate' }
    ],
    challenges: [
      { title: 'Real-time Processing', solution: 'Optimized computer vision algorithms for real-time traffic analysis' },
      { title: 'Data Accuracy', solution: 'Implemented advanced filtering and validation techniques' }
    ],
    startDate: '2024-01'
  },
  {
    id: 'agrizen',
    title: 'AgriZen – Farmer-to-Buyer Digital Platform',
    tagline: 'Agricultural Marketplace Connecting Farmers Directly',
    description: 'Developed a full-stack marketplace connecting farmers directly with buyers using React.js, Spring Boot, and MySQL. Improved farmer profitability by eliminating intermediaries and increasing pricing transparency.',
    thumbnail: '/projects/agrizen.jpg',
    techStack: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'Spring Boot', icon: '🍃' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'REST APIs', icon: '🔌' }
    ],
    category: 'fullstack',
    featured: false,
    status: 'production',
    links: {
      live: 'https://agrizen-demo.com',
      github: 'https://github.com/eslavathvineethnaik/agrizen'
    },
    impact: 'Improved farmer profitability by eliminating intermediaries',
    metrics: [
      { label: 'Platform Users', value: '500+' },
      { label: 'Transactions', value: '1000+' },
      { label: 'Farmer Profit Increase', value: '25%' }
    ],
    challenges: [
      { title: 'Payment Integration', solution: 'Implemented secure payment gateway with multiple options' },
      { title: 'Supply Chain Management', solution: 'Built real-time tracking and inventory system' }
    ],
    startDate: '2024-06',
    endDate: '2024-12'
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    tagline: 'Academic Data Management Platform',
    description: 'Created a scalable data management platform using React.js, Node.js, Express.js, and MongoDB to manage attendance, grades, and academic records, improving operational efficiency and reporting accuracy.',
    thumbnail: '/projects/student-management.jpg',
    techStack: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '📦' },
      { name: 'MongoDB', icon: '🍃' }
    ],
    category: 'fullstack',
    featured: false,
    status: 'production',
    links: {
      github: 'https://github.com/eslavathvineethnaik/student-management'
    },
    impact: 'Improved operational efficiency and reporting accuracy',
    metrics: [
      { label: 'Data Processing Speed', value: '60%', improvement: 'faster than manual' },
      { label: 'Report Accuracy', value: '99.5%', improvement: 'error reduction' },
      { label: 'User Adoption', value: '200+' }
    ],
    challenges: [
      { title: 'Data Security', solution: 'Implemented role-based access control and encryption' },
      { title: 'Performance Optimization', solution: 'Added caching and database indexing' }
    ],
    startDate: '2024-09',
    endDate: '2025-01'
  }
]
