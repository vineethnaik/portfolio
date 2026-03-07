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
  details: {
    problem: string
    solution: string
    architecture: string
    challenges: Challenge[]
    results: Metric[]
    learnings: string[]
  }
  startDate: string
  endDate?: string
}

export const projects: Project[] = [
  {
    id: 'ai-code-reviewer',
    title: 'AI-Powered Code Review Assistant',
    tagline: 'Automated code analysis with intelligent suggestions',
    description: 'A sophisticated AI system that analyzes code quality, suggests improvements, and helps developers write better code through machine learning models trained on millions of repositories.',
    thumbnail: '/images/projects/ai-code-reviewer.webp',
    techStack: [
      { name: 'Python', icon: '🐍' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'React', icon: '⚛️' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'PostgreSQL', icon: '🐘' },
    ],
    category: 'ai-ml',
    featured: true,
    status: 'production',
    links: {
      live: 'https://ai-reviewer.demo.com',
      github: 'https://github.com/johndoe/ai-code-reviewer',
      casestudy: '#case-study-ai-reviewer'
    },
    impact: 'Reduced code review time by 60% and improved code quality by 40%',
    details: {
      problem: 'Manual code reviews are time-consuming and inconsistent. Teams struggle with maintaining code quality standards across large codebases.',
      solution: 'Built an AI system that analyzes code patterns, detects potential issues, and provides contextual suggestions for improvement. The system learns from your codebase patterns and team preferences.',
      architecture: `graph TD
    A[Frontend React App] --> B[FastAPI Backend]
    B --> C[AI Model Service]
    B --> D[PostgreSQL DB]
    C --> E[Code Analysis Models]
    C --> F[Pattern Recognition Engine]
    D --> G[Code History]
    D --> H[Review Metrics]`,
      challenges: [
        {
          title: 'Training Data Quality',
          solution: 'Curated a dataset of 1M+ code reviews from open-source projects and implemented quality filtering mechanisms.'
        },
        {
          title: 'Real-time Analysis',
          solution: 'Optimized model inference with caching and parallel processing to achieve sub-second response times.'
        }
      ],
      results: [
        { label: 'Review Time Reduction', value: '60%', improvement: 'from 30min to 12min per PR' },
        { label: 'Code Quality Score', value: '40%', improvement: 'improvement in maintainability metrics' },
        { label: 'Developer Satisfaction', value: '85%', improvement: 'positive feedback from users' },
        { label: 'Bug Detection', value: '25%', improvement: 'more bugs caught before production' }
      ],
      learnings: [
        'The importance of explainable AI in developer tools',
        'Balancing automation with human oversight is crucial',
        'Domain-specific models outperform general-purpose ones'
      ]
    },
    startDate: '2023-06',
    endDate: '2023-12'
  },
  {
    id: 'microservices-platform',
    title: 'Distributed Microservices Platform',
    tagline: 'Scalable backend architecture for modern applications',
    description: 'A comprehensive microservices platform supporting 100K+ daily requests with auto-scaling, circuit breakers, and distributed tracing.',
    thumbnail: '/images/projects/microservices-platform.webp',
    techStack: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '☸️' },
      { name: 'Redis', icon: '🔴' },
      { name: 'MongoDB', icon: '🍃' },
    ],
    category: 'backend',
    featured: false,
    status: 'production',
    links: {
      github: 'https://github.com/johndoe/microservices-platform'
    },
    impact: 'Scaled to handle 100K+ daily requests with 99.9% uptime',
    details: {
      problem: "Monolithic architecture was causing scaling issues and deployment bottlenecks. Teams couldn't iterate quickly.",
      solution: 'Designed and implemented a microservices architecture with service discovery, load balancing, and comprehensive monitoring.',
      architecture: `graph TD
    A[API Gateway] --> B[Auth Service]
    A --> C[User Service]
    A --> D[Order Service]
    A --> E[Payment Service]
    B --> F[Redis Cache]
    C --> G[MongoDB]
    D --> G
    E --> H[PostgreSQL]`,
      challenges: [
        {
          title: 'Service Communication',
          solution: 'Implemented gRPC for internal communication and REST for external APIs with proper circuit breakers.'
        },
        {
          title: 'Data Consistency',
          solution: 'Used saga patterns for distributed transactions and event-driven architecture for eventual consistency.'
        }
      ],
      results: [
        { label: 'Daily Requests', value: '100K+', improvement: '10x increase in capacity' },
        { label: 'Uptime', value: '99.9%', improvement: 'improved reliability' },
        { label: 'Deployment Time', value: '50%', improvement: 'reduced deployment overhead' },
        { label: 'Team Velocity', value: '2x', improvement: 'faster development cycles' }
      ],
      learnings: [
        'Observability is critical in distributed systems',
        'Start with domain-driven design principles',
        'Automated testing becomes even more important'
      ]
    },
    startDate: '2023-01',
    endDate: '2023-05'
  },
  {
    id: 'real-time-collaboration',
    title: 'Real-time Collaboration Suite',
    tagline: 'Live collaborative editing with conflict resolution',
    description: 'A comprehensive real-time collaboration platform supporting multiple users with operational transforms and conflict-free replicated data types.',
    thumbnail: '/images/projects/real-time-collaboration.webp',
    techStack: [
      { name: 'Next.js', icon: '▲' },
      { name: 'Socket.io', icon: '🔌' },
      { name: 'React', icon: '⚛️' },
      { name: 'WebSockets', icon: '🌐' },
      { name: 'Redis', icon: '🔴' },
    ],
    category: 'fullstack',
    featured: false,
    status: 'production',
    links: {
      live: 'https://collab.demo.com',
      github: 'https://github.com/johndoe/real-time-collaboration'
    },
    impact: 'Enabled 1000+ concurrent users with sub-100ms synchronization',
    details: {
      problem: 'Existing collaboration tools had latency issues and couldn\'t handle large teams efficiently. Conflict resolution was manual and error-prone.',
      solution: 'Built a real-time collaboration engine using CRDTs and operational transforms with automatic conflict resolution.',
      architecture: `graph TD
    A[Client 1] --> B[WebSocket Server]
    A --> C[Local State]
    B --> D[Operation Engine]
    B --> E[Redis Pub/Sub]
    D --> F[Conflict Resolver]
    E --> G[Client 2]
    E --> H[Client 3]`,
      challenges: [
        {
          title: 'Conflict Resolution',
          solution: 'Implemented operational transforms and CRDTs to handle concurrent edits without conflicts.'
        },
        {
          title: 'Scalability',
          solution: 'Used Redis clustering and horizontal scaling of WebSocket servers with sticky sessions.'
        }
      ],
      results: [
        { label: 'Concurrent Users', value: '1000+', improvement: 'per document' },
        { label: 'Sync Latency', value: '<100ms', improvement: 'real-time performance' },
        { label: 'Conflict Rate', value: '0.1%', improvement: 'near-zero conflicts' },
        { label: 'User Engagement', value: '3x', improvement: 'increased collaboration time' }
      ],
      learnings: [
        'Real-time algorithms require careful state management',
        'Testing distributed systems is challenging but essential',
        'User experience matters more than theoretical perfection'
      ]
    },
    startDate: '2023-03',
    endDate: '2023-08'
  },
  {
    id: 'open-source-cli',
    title: 'Developer CLI Tool',
    tagline: 'Command-line tool for streamlined development workflows',
    description: 'An open-source CLI tool that automates common development tasks, project setup, and deployment workflows.',
    thumbnail: '/images/projects/cli-tool.webp',
    techStack: [
      { name: 'Go', icon: '🐹' },
      { name: 'Cobra', icon: '🐍' },
      { name: 'Docker', icon: '🐳' },
      { name: 'GitHub API', icon: '🐙' },
    ],
    category: 'open-source',
    featured: false,
    status: 'production',
    links: {
      github: 'https://github.com/johndoe/dev-cli'
    },
    impact: '500+ GitHub stars, adopted by 50+ development teams',
    details: {
      problem: 'Developers spent too much time on repetitive tasks like project setup, dependency management, and deployment workflows.',
      solution: 'Created a comprehensive CLI tool with templates, plugins, and integrations for common development workflows.',
      architecture: `graph TD
    A[CLI Entry Point] --> B[Command Router]
    B --> C[Project Templates]
    B --> D[Deployment Module]
    B --> E[Plugin System]
    C --> F[Template Engine]
    D --> G[Cloud APIs]
    E --> H[Plugin Registry]`,
      challenges: [
        {
          title: 'Cross-platform Compatibility',
          solution: 'Used Go\'s cross-platform compilation and extensive testing across different operating systems.'
        },
        {
          title: 'Plugin Architecture',
          solution: 'Designed a flexible plugin system with Go interfaces and dynamic loading capabilities.'
        }
      ],
      results: [
        { label: 'GitHub Stars', value: '500+', improvement: 'community adoption' },
        { label: 'Time Saved', value: '70%', improvement: 'in setup tasks' },
        { label: 'Teams Using', value: '50+', improvement: 'production adoption' },
        { label: 'Contributors', value: '15', improvement: 'active community' }
      ],
      learnings: [
        'Good documentation is crucial for open-source success',
        'Community feedback drives better features',
        'Simplicity beats complexity in CLI design'
      ]
    },
    startDate: '2022-11',
    endDate: '2023-02'
  }
]
