import { model, Schema } from 'mongoose'
import { IOrder } from '@ecommerce-platform/types'

const OrderSchema = new Schema<IOrder>({
    _id: Schema.Types.ObjectId,
    items: {
        type: Array as any,
        default: [],
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    } as any,
    amount: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    delivery: {
        type: {
            address: String,
            coords: Array,
            entrance: Number,
            floor: Number,
            apartment: Number,
            doorphone: String,
            message: String,
        },
        default: null,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null,
    },
    qrcode: {
        type: String,
        default: null,
    },
    status: {
        type: {
            created: Boolean,
            seen: Boolean,
            confirmed: Boolean,
            inProcess: Boolean,
            ready: Boolean,
            inDelivery: Boolean,
            completed: Boolean,
            cancelled: Boolean,
        },
        _id: false,
    },
    payment: {
        type: Number,
        default: null,
    },
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
}, {
    timestamps: true,
})

export const OrderModel = model('Order', OrderSchema)
