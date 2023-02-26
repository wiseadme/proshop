import { Document, model, Schema } from 'mongoose'

const DiscountSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true,
  },
  meta: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

export const DiscountModel = model('Discount', DiscountSchema)
