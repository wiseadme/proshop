import { model, Schema, Document } from 'mongoose'
import { IOption } from '@ecommerce-platform/types'

const OptionSchema = new Schema<Document & IOption>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  variantId: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  description: {
    type: String
  },
  assets: [ {
    type: Schema.Types.ObjectId,
    ref: 'Asset'
  } ]
}, {
  timestamps: true
})

export const OptionModel = model<IOption>('Option', OptionSchema)
