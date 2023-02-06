import { model, Schema } from 'mongoose'
import { IOrder } from '@ecommerce-platform/types'

const OrderSchema = new Schema<IOrder>({
  _id: Schema.Types.ObjectId,
  items: {
    type: Array as any,
    default: []
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  } as any,
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
    type: Object,
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
      seen: Boolean,
      confirmed: Boolean,
      inProcess: Boolean,
      ready: Boolean,
      completed: Boolean,
      cancelled: Boolean,
    },
    _id: false
  },
  executor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
})

export const OrderModel = model('Order', OrderSchema)
