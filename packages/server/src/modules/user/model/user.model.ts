import { model, Schema, Document } from 'mongoose'

interface User {
  firstName: string
  secondName: string
  email: string
  username?: string
  password: string
  phone: string
  roles: string[]
  accessToken: string,
  refreshToken: string,
  enabled: boolean
}

const UserSchema = new Schema<Document & User>({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: null,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  roles: {
    type: Array as any,
    required: true
  },
  accessToken: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  enabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export const UserModel = model('User', UserSchema)
