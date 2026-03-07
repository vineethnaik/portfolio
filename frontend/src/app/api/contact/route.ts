import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/models/Contact'
import { emailService } from '@/lib/email'
import { z } from 'zod'

// Rate limiting in-memory store (for production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = process.env.NODE_ENV === 'development' ? 100 : 5

// Input validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .trim(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject cannot exceed 150 characters')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim()
})

// Rate limiting middleware
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return { allowed: true }
  }

  if (now > record.resetTime) {
    // Reset the window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true }
}

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return 'unknown'
}

// POST handler for contact form
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)
    
    // Skip rate limiting in development
    const rateLimitResult =
      process.env.NODE_ENV === 'development' ? { allowed: true } : checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimitResult.resetTime 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (rateLimitResult.resetTime || 0).toString(),
          }
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = validationResult.data

    // Connect to MongoDB
    await connectDB()

    // Create contact message
    const contactMessage = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown'
    })

    // Send email notification (non-blocking)
    const emailPromise = emailService.sendContactNotification({
      name,
      email,
      subject,
      message
    })

    // Send auto-reply (non-blocking)
    const autoReplyPromise = emailService.sendAutoReply({
      name,
      email
    })

    // Handle email results asynchronously
    Promise.allSettled([emailPromise, autoReplyPromise])
      .then(([notificationResult, autoReplyResult]) => {
        const notif = notificationResult.status === 'fulfilled' ? notificationResult.value : null
        const auto = autoReplyResult.status === 'fulfilled' ? autoReplyResult.value : null
        if (notificationResult.status === 'rejected' || (notif && !notif.success)) {
          console.error('Failed to send notification email:', notificationResult.status === 'rejected' ? notificationResult.reason : notif?.error)
        }
        if (autoReplyResult.status === 'rejected' || (auto && !auto.success)) {
          console.error('Failed to send auto-reply:', autoReplyResult.status === 'rejected' ? autoReplyResult.reason : auto?.error)
        }
      })
      .catch(error => {
        console.error('Email sending error:', error)
      })

    // Return success response with redirect info
    return NextResponse.json(
      { 
        success: true,
        message: 'Your message has been sent successfully! Redirecting to email...',
        redirectUrl: `mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi ${name},\n\nThank you for contacting me through my portfolio! I've received your message and will get back to you as soon as possible.\n\nI typically respond within 24-48 hours. If your inquiry is urgent, feel free to follow up via email.\n\nLooking forward to connecting with you!\n\nBest regards,\nESLAVATH VINEETH NAIK`)}`
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': Math.max(0, RATE_LIMIT_MAX_REQUESTS - (rateLimitStore.get(clientIP)?.count || 0)).toString(),
          'X-RateLimit-Reset': rateLimitStore.get(clientIP)?.resetTime?.toString() || '0',
        }
      }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)

    const isDev = process.env.NODE_ENV === 'development'
    const errorMessage = error instanceof Error ? error.message : String(error)

    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
        message: isDev ? errorMessage : 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    )
  }
}

// GET handler for admin (protected by basic auth)
export async function GET(request: NextRequest) {
  try {
    // Basic authentication check
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }

    // Decode credentials
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    // Check credentials (in production, use more secure method)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}
    if (status && ['unread', 'read', 'archived'].includes(status)) {
      query.status = status
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    // Get messages with pagination
    const skip = (page - 1) * limit
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    const total = await Contact.countDocuments(query)

    // Get statistics
    const stats = await Contact.getStats()

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      stats
    })

  } catch (error) {
    console.error('Admin dashboard error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE handler for admin
export async function DELETE(request: NextRequest) {
  try {
    // Basic authentication check (same as GET)
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Get message ID from URL
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Delete message
    const result = await Contact.findByIdAndDelete(messageId)

    if (!result) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    })

  } catch (error) {
    console.error('Delete message error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
