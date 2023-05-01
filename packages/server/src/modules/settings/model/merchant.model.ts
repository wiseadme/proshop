import { Document, model, Schema } from 'mongoose'
import { IMerchant } from '@ecommerce-platform/types'

const MerchantSchema: Schema = new Schema<IMerchant & Document>({
  _id: Schema.Types.ObjectId,
  organization: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  currency: {
    type: {
      name: String,
      symbol: String,
      description: String,
      country: String,
      countryId: String,
      code: String
    },
    required: true
  },
  description: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null
  },
  slogan: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  stores: {
    type: Array,
    default: null
  }
}, {
  timestamps: true
})

export const MerchantModel = model<IMerchant>('Merchant', MerchantSchema)
