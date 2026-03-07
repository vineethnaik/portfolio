'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, Send, CheckCircle2 } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => ({})) || {}

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        if (response.status === 429) {
          alert('Too many requests. Please try again later.')
        } else if (response.status === 400 && Array.isArray(result?.details)) {
          const errorMessages = result.details.map((err: any) => 
            `${err.field}: ${err.message}`
          ).join('\n')
          alert(`Validation errors:\n${errorMessages}`)
        } else {
          const msg = result.message || result.error || 'Something went wrong. Please try again.'
          alert(msg)
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Reset form after 5.5 seconds when message is sent successfully
  useEffect(() => {
    if (!isSubmitted) return
    const timer = setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 5500)
    return () => clearTimeout(timer)
  }, [isSubmitted])

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--bg-off)]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-eyebrow">contact</div>
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="section-sub mx-auto">Let's discuss your next project or opportunity</p>
        </div>

        <div className="grid lg:grid-cols-[60%_40%] gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-bold tracking-wider uppercase text-[var(--ink-2)] mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-input"
                      required
                      suppressHydrationWarning
                      placeholder="Eslavath Vineeth Naik"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[13px] font-bold tracking-wider uppercase text-[var(--ink-2)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="contact-input"
                      placeholder="vineethnaikeslavath@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[13px] font-bold tracking-wider uppercase text-[var(--ink-2)] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="contact-input"
                  >
                    <option value="">Select a subject</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="freelance">Freelance</option>
                    <option value="just-saying-hi">Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-bold tracking-wider uppercase text-[var(--ink-2)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={500}
                    suppressHydrationWarning
                    className="contact-input resize-none"
                    placeholder="Your message here..."
                  />
                  <div className="text-right mt-1">
                    <span className="text-xs text-muted">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="w-full px-7 py-[13px] rounded-[var(--radius-pill)] font-semibold text-[15px] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'var(--violet)',
                    boxShadow: 'var(--shadow-violet)',
                    transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(91, 33, 255, 0.45)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center py-12 px-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-20 h-20 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-ink mb-2"
                >
                  Message Sent Successfully!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted"
                >
                  I&apos;ll get back to you within 24 hours.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 flex justify-center"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium border border-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Delivered
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="availability-card p-7 bg-white border border-border rounded-xl shadow-[var(--shadow-sm)]">
              <h3 className="availability-title font-display font-bold text-[16px] text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Available For
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Full-time', 'Freelance', 'Open Source'].map((type) => (
                  <span
                    key={type}
                    className="avail-chip px-4 py-2"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-violet" />
              <div>
                <div className="font-medium text-ink">San Francisco, CA</div>
                <div className="text-sm text-muted">Available for remote work</div>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-violet" />
              <div>
                <div className="font-medium text-ink">Response Time</div>
                <div className="text-sm text-muted">Usually within 24 hours</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-violet" />
              <div>
                <div className="font-medium text-ink">Email</div>
                <a href="mailto:vineethnaikeslavath@gmail.com" className="text-sm text-violet hover:text-violet-2 transition-colors">
                  vineethnaikeslavath@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-ink mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/vineethnaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white border border-border rounded-lg hover:border-violet/50 hover:bg-violet-pale/50 transition-all text-ink"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/eslavath-vineeth-naik-a8ab16285"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white border border-border rounded-lg hover:border-violet/50 hover:bg-violet-pale/50 transition-all text-ink"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white border border-border rounded-lg hover:border-violet/50 hover:bg-violet-pale/50 transition-all text-ink"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-gradient-to-r from-violet-pale/80 to-coral-pale/50 border border-violet/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-ink mb-2">
                Download Resume
              </h3>
              <p className="text-sm text-muted mb-4">
                Get my detailed resume in PDF format
              </p>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet text-white rounded-[var(--radius-pill)] font-semibold text-sm shadow-violet hover:bg-violet-2 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
