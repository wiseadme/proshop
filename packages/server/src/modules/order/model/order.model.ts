import { model, Schema, Document } from 'mongoose'
import { IOrder } from '@modules/order/types/model'

const OrderSchema = new Schema<Document & IOrder>({
  _id: Schema.Types.ObjectId,
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    default: null
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    default: null
  },
  qrcode: {
    type: String,
    default: null
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

export const OrderModel = model<IOrder>('Order', OrderSchema)
