import { model, Schema, Document } from 'mongoose'
import { IOrder } from '@modules/order/types/model'

const OrderSchema = new Schema<Document & IOrder>({
  _id: Schema.Types.ObjectId,
  items: {
    type: Array as any,
    default: []
  },
  amount: {
    type: Number,
    required: true
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
  client: {
    type: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String
      }
    }
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
    type: {
      created: Boolean,
      confirmed: Boolean,
      inProcess: Boolean,
      completed: Boolean,
      ready: Boolean,
      seen: Boolean,
      cancelled: Boolean
    },
    required: true
  },
}, {
  timestamps: true
})

export const OrderModel = model<IOrder>('Order', OrderSchema)
