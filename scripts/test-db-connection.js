const { connectDB } = require('../src/lib/mongodb')

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...')
  
  try {
    // Test with your provided connection string
    const testURI = 'mongodb+srv://vineethnaikeslavath_db_user:6zyHdxwLCapyGGcZ@cluster0.ozr2ldt.mongodb.net/portfolio?appName=Cluster0'
    
    // Temporarily set environment variable for testing
    process.env.MONGODB_URI = testURI
    
    const connection = await connectDB()
    
    if (connection) {
      console.log('✅ MongoDB connection successful!')
      console.log('📊 Database is ready to use')
      console.log('🔗 Connected to:', testURI.replace(/:([^@]+)@/, ':***@'))
      
      // Test creating a sample document
      const Contact = require('../src/models/Contact').default
      const testMessage = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Message',
        message: 'This is a test message to verify database connection.'
      }
      
      const result = await Contact.create(testMessage)
      console.log('✅ Test document created:', result._id)
      
      // Clean up test document
      await Contact.findByIdAndDelete(result._id)
      console.log('🧹 Test document cleaned up')
      
      console.log('\n🎉 Your MongoDB setup is working perfectly!')
      console.log('📝 Now create your .env.local file with the connection string')
      
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n🔑 Authentication error - Check username/password')
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n🌐 Network error - Check cluster name and connection')
    } else if (error.message.includes('IP not whitelisted')) {
      console.log('\n🔒 IP not whitelisted - Add your IP to MongoDB Atlas')
    }
  } finally {
    process.exit(0)
  }
}

testConnection()
