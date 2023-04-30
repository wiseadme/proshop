import { Document, model, Schema } from 'mongoose'
import { IMerchant } from '@ecommerce-platform/types'

const MerchantSchema: Schema = new Schema<IMerchant & Document>({
  _id: Schema.Types.ObjectId,

  // site: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Site',
  //   _id: false
  // },
}, {
  timestamps: true
})

export const MerchantModel = model<IMerchant>('Merchant', MerchantSchema)
