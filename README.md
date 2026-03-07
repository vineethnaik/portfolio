# Enhanced Portfolio - Full Stack Application

A production-ready, recruiter-optimized portfolio website built with Next.js 14, featuring advanced animations, AI/ML showcase, and a complete backend with MongoDB integration and email notifications.

## 🚀 Features

### Frontend
- **Modern Design**: Obsidian Precision theme with glassmorphism effects
- **12 Sections**: Hero, About, Skills, Projects, Experience, AI/ML Showcase, Achievements, GitHub Activity, Testimonials, Contact, Footer
- **Advanced Animations**: Framer Motion with spring physics and scroll-driven animations
- **Interactive Elements**: Particle fields, neural network backgrounds, hover states
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Lighthouse score 90+, lazy loading, optimized assets

### Backend
- **API Routes**: RESTful endpoints with validation and error handling
- **MongoDB Integration**: Mongoose with connection caching and proper schemas
- **Email Notifications**: Nodemailer with Gmail integration and auto-replies
- **Security Features**: Rate limiting, input validation, basic auth for admin
- **Admin Dashboard**: Protected interface to manage contact messages

### Advanced Features
- **Real-time GitHub Activity**: Custom contribution heatmap and statistics
- **AI/ML Showcase**: Interactive flow diagrams with neural network animations
- **Project Modals**: Detailed case studies with architecture diagrams
- **Skills Radar Chart**: Interactive visualization of technical expertise
- **Contact Form**: Full validation with email notifications and auto-replies

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **Charts**: Recharts
- **Fonts**: Geist Sans & Geist Mono

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB Atlas with Mongoose
- **Email**: Nodemailer
- **Validation**: Zod
- **Authentication**: Basic Auth (admin dashboard)

### Deployment
- **Platform**: Vercel
- **Environment**: Production-ready with environment variables

## 📁 Project Structure

```
enhanced-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── contact/        # Contact API endpoints
│   │   ├── admin/              # Admin dashboard
│   │   ├── globals.css        # Global styles & design tokens
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, PageLoader
│   │   ├── sections/           # All 12 portfolio sections
│   │   ├── ui/                 # Shared UI components
│   │   └── effects/            # Particle field, gradient mesh
│   ├── lib/
│   │   ├── data/               # Mock data and schemas
│   │   ├── mongodb.ts          # Database connection
│   │   ├── email.ts            # Email service
│   │   ├── theme-provider.tsx   # Theme context
│   │   └── utils.ts            # Helper functions
│   ├── models/
│   │   └── Contact.ts          # Contact message schema
│   └── hooks/
│       ├── useCountUp.ts       # Animated counter
│       └── useScrollDirection.ts # Scroll detection
├── public/                     # Static assets
├── ENV_SETUP.md               # Environment variables guide
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB Atlas account
- Gmail account (for email notifications)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd enhanced-portfolio
npm install
```

### 2. Environment Setup

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.

Create a `.env.local` file:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 4. Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin) to manage contact messages.

## 📊 Sections Overview

### 1. Hero
- Animated terminal with typing effect
- Particle field background
- Call-to-action buttons
- Social proof indicators

### 2. About
- Professional bio with timeline
- Animated statistics with count-up
- Core values section
- Education timeline

### 3. Skills
- Tabbed categories (7 categories)
- Radar chart visualization
- Proficiency indicators
- Interactive hover states

### 4. Projects
- Featured project showcase
- Filterable project grid
- Detailed modal case studies
- Architecture diagrams

### 5. Experience
- Vertical timeline with animations
- Multiple entry types (work, education, leadership)
- Company logos and descriptions
- Remote/hybrid indicators

### 6. AI/ML Showcase
- Interactive flow diagrams
- Neural network background animation
- Model performance table
- Tech stack breakdown

### 7. Achievements
- Masonry layout with cards
- Hackathons, certifications, coding platforms
- Shimmer hover effects
- Verification links

### 8. GitHub Activity
- Custom contribution heatmap
- Statistics cards
- Top repositories
- Language breakdown chart

### 9. Testimonials
- Social proof cards
- Professional recommendations
- Company affiliations
- Relationship context

### 10. Contact
- Form with validation
- Email notifications
- Auto-reply system
- Social links and resume download

### 11. Footer
- Three-column layout
- Signature animation on scroll
- Social media links
- Version information

## 🔧 Configuration

### Design System
The project uses a custom design system called "Obsidian Precision":

- **Colors**: Dark theme with blue/violet accents
- **Typography**: Geist font family
- **Spacing**: 8px grid system
- **Animations**: Spring-based physics
- **Elevation**: Custom shadow system

### Performance Optimizations
- Next.js Image optimization
- Lazy loading components
- Code splitting
- Optimized fonts
- Minimal bundle size

### SEO & Accessibility
- Complete meta tags
- Open Graph support
- Structured data
- Semantic HTML
- ARIA labels
- Keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
Add these in your Vercel project settings:
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## 🔒 Security Features

- Rate limiting on contact form (5 requests/15min)
- Input validation with Zod schemas
- Basic authentication for admin dashboard
- Environment variable protection
- XSS prevention
- CSRF protection

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Step Verification
2. Generate App Password
3. Use app password in `EMAIL_PASS`
4. Configure email templates in `src/lib/email.ts`

### Email Features
- Contact form notifications
- Auto-reply to senders
- HTML email templates
- Error handling and logging

## 🎯 What This Demonstrates

This portfolio showcases:

### Frontend Excellence
- Modern React patterns with hooks
- Advanced animations and micro-interactions
- Responsive design principles
- Performance optimization
- Component architecture

### Backend Competency
- API design and implementation
- Database integration with Mongoose
- Email automation
- Security best practices
- Error handling and logging

### Full-Stack Understanding
- End-to-end data flow
- Authentication and authorization
- Production deployment
- Environment management
- System architecture

### Professional Polish
- Recruiter-focused design
- Clean, maintainable code
- Comprehensive documentation
- Production-ready features
- Attention to detail

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

---

**Built with ❤️ by Eslavath Vineeth Naik**

*"Systems that scale begin with engineers who think."*
