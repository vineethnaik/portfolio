'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Engineering Manager at TechCorp',
    company: 'TechCorp Solutions',
    relationship: 'Worked together at TechCorp',
    quote: 'John is an exceptional developer who consistently delivers high-quality work. His ability to solve complex problems and mentor junior developers has been invaluable to our team.',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer',
    company: 'Digital Innovations',
    relationship: 'Collaborated on AI project',
    quote: 'Working with John on the AI code review system was a fantastic experience. His technical expertise and attention to detail helped us build a product that exceeded our expectations.',
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'CloudTech Systems',
    relationship: 'Managed John\'s internship',
    quote: 'John was one of our best interns. His quick learning ability and proactive approach to problem-solving made him stand out. He would be a great addition to any team.',
    avatar: 'ER'
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--bg-off)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 reveal"
        >
          <div className="section-eyebrow">testimonials</div>
          <h2 className="section-title mb-4">
            What People Say
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Feedback from colleagues and mentors I've worked with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group reveal"
            >
              <div className="testimonial-card relative p-6">
                {/* Quote icon */}
                <Quote className="quote-icon absolute top-4 right-4 w-12 h-12 text-violet" style={{ opacity: 0.15 }} />
                
                {/* Quote */}
                <blockquote className="quote-text mb-6 text-[15px] text-[var(--ink-2)] italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="author-avatar w-11 h-11 rounded-full flex items-center justify-center text-white font-extrabold text-base">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="author-name font-display font-bold text-[15px] text-ink" style={{ fontFamily: 'var(--font-display)' }}>{testimonial.name}</div>
                    <div className="author-role text-[13px] font-semibold text-violet mt-0.5">{testimonial.role}</div>
                    <div className="author-company text-[12px] text-muted mt-0.5">{testimonial.company}</div>
                    <div className="text-xs text-muted mt-1">{testimonial.relationship}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
