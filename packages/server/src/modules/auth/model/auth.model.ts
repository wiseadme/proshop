import { model, Schema, Document } from 'mongoose'

interface Auth {
  userId: string
  accessToken: string,
  refreshToken: string
}

const AuthSchema = new Schema<Document & Auth>({
  _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

export const AuthModel = model('Auth', AuthSchema)
