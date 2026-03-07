import mongoose from 'mongoose'

interface IContact {
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'archived'
  ipAddress?: string
  userAgent?: string
  createdAt?: Date
  updatedAt?: Date
  markAsRead: () => Promise<IContactDoc>
  archive: () => Promise<IContactDoc>
}

interface IContactDoc extends IContact, mongoose.Document {}

interface IContactModel extends mongoose.Model<IContactDoc> {
  getStats(): Promise<{
    total: number
    unread: number
    read: number
    archived: number
    thisWeek: number
  }>
}

const ContactSchema = new mongoose.Schema<IContactDoc>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [255, 'Email cannot exceed 255 characters'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters'],
      minlength: [5, 'Subject must be at least 5 characters']
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      minlength: [10, 'Message must be at least 10 characters']
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'archived'],
      default: 'unread'
    },
    ipAddress: {
      type: String,
      required: false
    },
    userAgent: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret: any) {
        delete ret.__v
        delete ret.ipAddress
        delete ret.userAgent
        return ret
      }
    }
  }
)

ContactSchema.index({ createdAt: -1 })
ContactSchema.index({ status: 1 })
ContactSchema.index({ email: 1 })

ContactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        unread: { $sum: { $cond: [{ $eq: ['$status', 'unread'] }, 1, 0] } },
        read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
        archived: { $sum: { $cond: [{ $eq: ['$status', 'archived'] }, 1, 0] } },
        thisWeek: {
          $sum: {
            $cond: [
              {
                $gte: [
                  '$createdAt',
                  new Date(new Date().setDate(new Date().getDate() - 7))
                ]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ])

  return stats[0] || {
    total: 0,
    unread: 0,
    read: 0,
    archived: 0,
    thisWeek: 0
  }
}

ContactSchema.methods.markAsRead = function() {
  this.status = 'read'
  return this.save()
}

ContactSchema.methods.archive = function() {
  this.status = 'archived'
  return this.save()
}

export default (mongoose.models.Contact as IContactModel) || mongoose.model<IContactDoc, IContactModel>('Contact', ContactSchema)
