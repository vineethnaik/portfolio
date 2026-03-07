export interface Achievement {
  id: string
  type: 'hackathon' | 'certification' | 'coding' | 'recognition'
  title: string
  organization: string
  date: string
  placement?: string
  teamSize?: string
  description?: string
  projectLink?: string
  platform?: string
  rating?: string
  rank?: string
  problemsSolved?: string
  percentile?: string
  credentialId?: string
  verifyLink?: string
  logo?: string
}

export const achievements: Achievement[] = [
  {
    id: 'cert-aws',
    type: 'certification',
    title: 'AWS Certified Cloud Practitioner',
    organization: 'Amazon Web Services',
    date: '2025',
    credentialId: 'aacc21c30d8540a9b2d30fdff639537d',
    verifyLink: 'https://aws.amazon.com/verification',
    logo: 'aws'
  },
  {
    id: 'cert-salesforce',
    type: 'certification',
    title: 'Salesforce Certified AI Associate',
    organization: 'Salesforce',
    date: '2025',
    credentialId: 'SF-AIA-2025',
    verifyLink: 'https://trailhead.salesforce.com',
    logo: 'salesforce'
  },
  {
    id: 'cert-mongodb',
    type: 'certification',
    title: 'MongoDB Certified Developer Associate',
    organization: 'MongoDB',
    date: '2025',
    credentialId: 'MDB-CDA-2025',
    verifyLink: 'https://university.mongodb.com',
    logo: 'mongodb'
  },
  {
    id: 'cert-automation',
    type: 'certification',
    title: 'Certified Automation Essentials Professional',
    organization: 'Automation Institute',
    date: '2025',
    credentialId: 'AEP-2025',
    verifyLink: 'https://automationinstitute.org',
    logo: 'automation'
  },
  {
    id: 'cert-juniper',
    type: 'certification',
    title: 'Juniper Networks Certified Associate (JNCIA-Junos)',
    organization: 'Juniper Networks',
    date: '2024',
    credentialId: 'JNCIA-JUNOS-2024',
    verifyLink: 'https://juniper.net/certification',
    logo: 'juniper'
  },
  {
    id: 'leadership-competition',
    type: 'recognition',
    title: '1st Place - Design Thinking & Innovation Competition',
    organization: 'KL University',
    date: '2024',
    description: 'Led cross-functional team to victory through business-focused problem solving and user-centric solution design'
  },
  {
    id: 'ai-traffic-impact',
    type: 'recognition',
    title: 'AI Traffic Control Innovation',
    organization: 'University Project Showcase',
    date: '2024',
    description: 'Recognized for achieving 30% reduction in traffic waiting time through AI-powered computer vision system'
  }
]
