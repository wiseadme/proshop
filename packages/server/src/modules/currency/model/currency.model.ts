import { Document, model, Schema } from 'mongoose'
import { ICurrency } from '@ecommerce-platform/types'

const CurrencySchema: Schema = new Schema<ICurrency & Document>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    default: null
  },
  meta: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
})

export const CurrencyModel = model<ICurrency>('Currency', CurrencySchema)
