import mongoose from 'mongoose'

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Add it to .env.local in the frontend/ directory (next to next.config.ts). ' +
      'Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio'
    )
  }
  return uri
}

interface CachedConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: CachedConnection | undefined
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose.connect(getMongoUri(), opts).catch((error) => {
      console.error('MongoDB connection error:', error)
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export function isConnected(): boolean {
  return mongoose.connection.readyState === 1
}

export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.connection.close()
    cached.conn = null
    cached.promise = null
  }
}
