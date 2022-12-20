import { model, Schema, Document } from 'mongoose'
import { ICart } from '@ecommerce-platform/types'

const CartSchema = new Schema<Document & ICart>({
  _id: Schema.Types.ObjectId,
  items: {
    type: Array as any,
    default: []
  },
  totalItems: {
    type: Number,
    default: 0
  },
  totalUniqueItems: {
    type: Number,
    default: 0
  },
  currency: {
    type: Object,
    default: null
  },
  amount: {
    type: Number,
    default: 0
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  expireAt: {
    type: Date,
    default: null
  },
}, {
  timestamps: true
})

CartSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

export const CartModel = model<ICart>('Cart', CartSchema)
