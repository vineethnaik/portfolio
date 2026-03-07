'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Trash2, Eye, Search, Filter, Download, Calendar, Users, Archive, CheckCircle } from 'lucide-react'

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'archived'
  createdAt: string
  ipAddress?: string
  userAgent?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

interface Stats {
  total: number
  unread: number
  read: number
  archived: number
  thisWeek: number
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth) {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch messages when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages()
    }
  }, [isAuthenticated, currentPage, searchTerm, statusFilter])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    try {
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      })

      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuth', 'true')
      } else {
        setAuthError('Invalid credentials')
      }
    } catch (error) {
      setAuthError('Authentication failed')
    }
  }

  const fetchMessages = async () => {
    setLoading(true)
    setError('')

    try {
      const auth = localStorage.getItem('adminAuth')
      const storedCredentials = localStorage.getItem('adminCredentials')
      
      if (!auth || !storedCredentials) {
        setIsAuthenticated(false)
        return
      }

      const [username, password] = atob(storedCredentials).split(':')

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      })

      const response = await fetch(`/api/contact?${params}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
        setStats(data.stats)
        setPagination(data.pagination)
      } else if (response.status === 401) {
        setIsAuthenticated(false)
        localStorage.removeItem('adminAuth')
        localStorage.removeItem('adminCredentials')
      } else {
        setError('Failed to fetch messages')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const storedCredentials = localStorage.getItem('adminCredentials')
      if (!storedCredentials) return

      const [username, password] = atob(storedCredentials).split(':')

      const response = await fetch(`/api/contact?id=${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      })

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== messageId))
        if (selectedMessage?._id === messageId) {
          setSelectedMessage(null)
        }
        if (stats) {
          setStats({ ...stats, total: stats.total - 1 })
        }
      } else {
        alert('Failed to delete message')
      }
    } catch (error) {
      alert('Network error')
    }
  }

  const handleMarkAsRead = async (messageId: string) => {
    // This would require a PATCH/PUT endpoint
    // For now, we'll just update the local state
    setMessages(messages.map(msg => 
      msg._id === messageId ? { ...msg, status: 'read' as const } : msg
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
      case 'read': return 'bg-success/10 text-success border-success/20'
      case 'archived': return 'bg-text-muted/10 text-text-muted border-border-subtle'
      default: return 'bg-bg-hover border-border-subtle'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return Mail
      case 'read': return Eye
      case 'archived': return Archive
      default: return Mail
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-bg-elevated border border-border-default rounded-xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-violet rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Sign in to manage contact messages</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 bg-bg-hover border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 bg-bg-hover border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
                {authError}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-violet text-white rounded-lg font-medium hover:shadow-glow transition-all"
            >
              Sign In
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="bg-bg-elevated border-b border-border-default">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-violet rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Admin Dashboard</h1>
                <p className="text-sm text-text-secondary">Manage contact messages</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                localStorage.removeItem('adminAuth')
                localStorage.removeItem('adminCredentials')
              }}
              className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-blue/10 rounded-lg">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
                  <div className="text-xs text-text-muted">Total Messages</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-blue/10 rounded-lg">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-blue">{stats.unread}</div>
                  <div className="text-xs text-text-muted">Unread</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Eye className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">{stats.read}</div>
                  <div className="text-xs text-text-muted">Read</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-text-muted/10 rounded-lg">
                  <Archive className="w-5 h-5 text-text-muted" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-muted">{stats.archived}</div>
                  <div className="text-xs text-text-muted">Archived</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-violet/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent-violet" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-violet">{stats.thisWeek}</div>
                  <div className="text-xs text-text-muted">This Week</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-bg-elevated border border-border-default rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-hover border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-bg-hover border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid lg:grid-cols-[60%_40%] gap-6">
          {/* Messages */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
                <p className="text-text-muted mt-2">Loading messages...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-error">{error}</p>
                <button
                  onClick={fetchMessages}
                  className="mt-4 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">No messages found</p>
              </div>
            ) : (
              messages.map((message) => {
                const StatusIcon = getStatusIcon(message.status)
                return (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    className={`p-4 bg-bg-elevated border rounded-lg cursor-pointer transition-all ${
                      selectedMessage?._id === message._id 
                        ? 'border-accent-blue shadow-glow' 
                        : 'border-border-default hover:border-accent-blue/50'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${getStatusColor(message.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-text-primary">{message.name}</h3>
                          <p className="text-sm text-accent-blue">{message.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-muted">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-text-muted">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-text-primary mb-1">{message.subject}</p>
                    <p className="text-sm text-text-secondary line-clamp-2">{message.message}</p>
                  </motion.div>
                )
              })
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-6">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bg-elevated border border-border-default rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-accent-blue">{selectedMessage.email}</p>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                        {selectedMessage.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedMessage.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage._id)}
                        className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-text-muted mb-1">From: {selectedMessage.name}</p>
                  <p className="text-sm text-text-muted">
                    Sent: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-bg-hover border border-border-subtle rounded-lg">
                  <p className="text-text-secondary whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-border-subtle">
                  <button
                    onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-violet text-white rounded-lg font-medium hover:shadow-glow transition-all"
                  >
                    Reply via Email
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-bg-elevated border border-border-default rounded-lg p-8 text-center">
                <Mail className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 bg-bg-elevated border border-border-default rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-blue/50 transition-all"
            >
              Previous
            </button>
            <span className="text-text-muted">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
              disabled={!pagination.hasNext}
              className="px-4 py-2 bg-bg-elevated border border-border-default rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-blue/50 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
