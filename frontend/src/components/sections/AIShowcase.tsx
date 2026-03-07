'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brain, Cpu, Database, Globe, Zap, BarChart, Layers, ArrowRight } from 'lucide-react'

interface AIProject {
  id: string
  category: 'llm' | 'computer-vision' | 'data-pipelines' | 'ai-automation'
  title: string
  description: string
  model: string
  dataset: string
  metrics: {
    accuracy?: string
    latency?: string
    throughput?: string
    score?: string
  }
  tech: string[]
}

const aiProjects: AIProject[] = [
  {
    id: '1',
    category: 'llm',
    title: 'AI Code Review Assistant',
    description: 'Automated code analysis with intelligent suggestions using GPT-4',
    model: 'GPT-4 Turbo',
    dataset: '1M+ GitHub repositories',
    metrics: {
      accuracy: '94%',
      latency: '<2s',
      score: '8.5/10'
    },
    tech: ['OpenAI API', 'LangChain', 'Vector DB', 'React']
  },
  {
    id: '2',
    category: 'llm',
    title: 'RAG-Powered Knowledge Base',
    description: 'Retrieval-augmented generation for enterprise documentation',
    model: 'Claude 3',
    dataset: '50K internal documents',
    metrics: {
      accuracy: '91%',
      latency: '<1.5s',
      score: '8.2/10'
    },
    tech: ['Anthropic', 'ChromaDB', 'FastAPI', 'Next.js']
  },
  {
    id: '3',
    category: 'data-pipelines',
    title: 'Real-time Data Processing Pipeline',
    description: 'Stream processing for ML model inference at scale',
    model: 'Custom Ensemble',
    dataset: '10M records/day',
    metrics: {
      throughput: '100K msg/s',
      latency: '<100ms',
      accuracy: '96%'
    },
    tech: ['Apache Kafka', 'Spark', 'TensorFlow', 'Docker']
  },
  {
    id: '4',
    category: 'ai-automation',
    title: 'Intelligent Task Automation',
    description: 'AI-powered workflow automation for business processes',
    model: 'GPT-3.5 Turbo',
    dataset: '100K workflow examples',
    metrics: {
      accuracy: '89%',
      latency: '<3s',
      score: '7.8/10'
    },
    tech: ['OpenAI', 'Node.js', 'MongoDB', 'WebSocket']
  }
]

const categories = [
  { id: 'llm', name: 'LLM Applications', icon: Brain },
  { id: 'computer-vision', name: 'Computer Vision', icon: Cpu },
  { id: 'data-pipelines', name: 'Data Pipelines & MLOps', icon: Database },
  { id: 'ai-automation', name: 'AI Automation Systems', icon: Zap }
]

export function AIShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('llm')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const filteredProjects = aiProjects.filter(project => project.category === selectedCategory)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
    const connections: Array<{ from: number; to: number }> = []
    
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 1
      })
    }

    for (let i = 0; i < 30; i++) {
      connections.push({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length)
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(47, 129, 247, 0.1)'
        ctx.fill()
      })

      connections.forEach(({ from, to }) => {
        const fromNode = nodes[from]
        const toNode = nodes[to]
        
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = 'rgba(47, 129, 247, 0.05)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      const time = Date.now() * 0.001
      connections.forEach(({ from, to }, index) => {
        const fromNode = nodes[from]
        const toNode = nodes[to]
        
        const progress = (time + index * 0.5) % 1
        const x = fromNode.x + (toNode.x - fromNode.x) * progress
        const y = fromNode.y + (toNode.y - fromNode.y) * progress
        
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(47, 129, 247, 0.3)'
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="ai-showcase" className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-[var(--bg-off)]">
      {/* Neural network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow">ai & ml showcase</div>
          <h2 className="section-title mb-4">
            AI Engineering Excellence
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Advanced AI systems and machine learning solutions that drive real business value
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[40%_60%] gap-12">
          {/* Left - Interactive Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-ink">System Architecture</h3>
            
            {/* Interactive flow diagram */}
            <div className="arch-container">
              <div className="space-y-2">
                {/* Data Source */}
                <motion.div
                  onHoverStart={() => setHoveredNode('data-source')}
                  onHoverEnd={() => setHoveredNode(null)}
                  className="relative"
                >
                  <div className="arch-node">
                    <Database className="w-5 h-5 text-violet flex-shrink-0" />
                    <span>Data Source</span>
                  </div>
                  {hoveredNode === 'data-source' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 p-3 rounded-lg text-sm text-white z-20 shadow-lg"
                      style={{ background: 'var(--ink)' }}
                    >
                      Raw data from APIs, databases, and user inputs
                    </motion.div>
                  )}
                </motion.div>

                <div className="text-center text-muted text-lg my-2">↓</div>

                <motion.div
                  onHoverStart={() => setHoveredNode('preprocessing')}
                  onHoverEnd={() => setHoveredNode(null)}
                  className="relative"
                >
                  <div className="arch-node">
                    <Layers className="w-5 h-5 text-violet flex-shrink-0" />
                    <span>Preprocessing</span>
                  </div>
                  {hoveredNode === 'preprocessing' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 p-3 rounded-lg text-sm text-white z-20 shadow-lg"
                      style={{ background: 'var(--ink)' }}
                    >
                      Data cleaning, normalization, and feature engineering
                    </motion.div>
                  )}
                </motion.div>

                <div className="text-center text-muted text-lg my-2">↓</div>

                <motion.div
                  onHoverStart={() => setHoveredNode('model')}
                  onHoverEnd={() => setHoveredNode(null)}
                  className="relative"
                >
                  <div className="arch-node">
                    <Brain className="w-5 h-5 text-violet flex-shrink-0" />
                    <span>LLM/Model</span>
                  </div>
                  {hoveredNode === 'model' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 p-3 rounded-lg text-sm text-white z-20 shadow-lg"
                      style={{ background: 'var(--ink)' }}
                    >
                      Core AI model for inference and decision making
                    </motion.div>
                  )}
                </motion.div>

                <div className="text-center text-muted text-lg my-2">↓</div>

                <motion.div
                  onHoverStart={() => setHoveredNode('api')}
                  onHoverEnd={() => setHoveredNode(null)}
                  className="relative"
                >
                  <div className="arch-node">
                    <Globe className="w-5 h-5 text-violet flex-shrink-0" />
                    <span>API Layer</span>
                  </div>
                  {hoveredNode === 'api' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 p-3 rounded-lg text-sm text-white z-20 shadow-lg"
                      style={{ background: 'var(--ink)' }}
                    >
                      RESTful APIs and real-time endpoints
                    </motion.div>
                  )}
                </motion.div>

                <div className="text-center text-muted text-lg my-2">↓</div>

                <motion.div
                  onHoverStart={() => setHoveredNode('ui')}
                  onHoverEnd={() => setHoveredNode(null)}
                  className="relative"
                >
                  <div className="arch-node">
                    <Cpu className="w-5 h-5 text-violet flex-shrink-0" />
                    <span>User Interface</span>
                  </div>
                  {hoveredNode === 'ui' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 p-3 rounded-lg text-sm text-white z-20 shadow-lg"
                      style={{ background: 'var(--ink)' }}
                    >
                      Frontend applications and user experiences
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - AI Project Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    suppressHydrationWarning
                    onClick={() => setSelectedCategory(category.id)}
                    className={`skill-tab flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>

            {/* Project Cards */}
            <div className="space-y-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: 'var(--shadow-lg)'
                  }}
                  className="p-6 bg-white border border-border rounded-xl hover:border-violet/25 hover:shadow-[var(--shadow-lg)] transition-all project-detail-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-ink mb-2">
                        {project.title}
                      </h4>
                      <p className="text-muted text-sm mb-3">
                        {project.description}
                      </p>
                    </div>
                    <BarChart className="w-5 h-5 text-violet" />
                  </div>

                  {/* Model & Dataset */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted mb-1">Model</div>
                      <div className="text-sm font-medium text-ink">{project.model}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted mb-1">Dataset</div>
                      <div className="text-sm font-medium text-ink">{project.dataset}</div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-0 border-t border-border mt-4 pt-4">
                    {Object.entries(project.metrics).map(([key, value]) => {
                      const isAccuracy = key === 'accuracy' || key === 'throughput'
                      const isLatency = key === 'latency'
                      const isScore = key === 'score'
                      const valClass = isAccuracy ? 'text-violet' : isLatency ? 'text-[#22C55E]' : isScore ? 'text-coral' : 'text-ink'
                      return (
                      <div key={key} className="flex-1 text-center border-r border-border last:border-r-0 px-4">
                        <div className={`font-display text-[26px] font-extrabold ${valClass}`} style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
                        <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mt-1">
                          {key.replace(/_/g, ' ')}
                        </div>
                      </div>
                    )
                  })}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <div
                        key={tech}
                        className="px-2 py-1 bg-bg-off border border-border rounded text-xs text-muted"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Model Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-ink mb-6 text-center">
            AI Model Performance
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="perf-table w-full">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Task</th>
                  <th>Accuracy/Score</th>
                  <th>Dataset Size</th>
                  <th>Latency</th>
                </tr>
              </thead>
              <tbody>
                {aiProjects.map((project) => {
                  const acc = project.metrics.accuracy || project.metrics.score || ''
                  const accNum = parseFloat(acc)
                  const accClass = accNum >= 94 ? 'acc-high' : accNum >= 89 ? 'acc-mid' : ''
                  return (
                  <tr key={project.id}>
                    <td>{project.model}</td>
                    <td>{project.title}</td>
                    <td><span className={accClass || 'text-violet font-bold'}>{acc}</span></td>
                    <td>{project.dataset}</td>
                    <td className="latency">{project.metrics.latency}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
