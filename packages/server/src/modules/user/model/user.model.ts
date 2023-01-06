import { model, Schema, Document } from 'mongoose'

interface User {
  firstName: string
  secondName: string
  email: string
  login: string
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
  login: {
    type: String,
    default: null,
    unique: true,
    index: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: false
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
