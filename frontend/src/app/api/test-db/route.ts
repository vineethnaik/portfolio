import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function GET() {
  try {
    // Test database connection
    await connectDB()
    
    // Test creating a sample document
    const testMessage = await Contact.create({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Database Connection Test',
      message: 'This is a test message to verify MongoDB connection is working.',
      status: 'test'
    })
    
    // Clean up test document
    await Contact.findByIdAndDelete(testMessage._id)
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection is working perfectly!',
      database: 'Connected',
      test: 'Passed'
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
