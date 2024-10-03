import { model, Schema } from 'mongoose'
import { ICartItem, IOrderMongoModel } from '@proshop-app/types'

const OrderSchema = new Schema<IOrderMongoModel>({
    _id: Schema.Types.ObjectId,
    items: {
        type: [] as ICartItem[],
        default: [],
    },
    cartId: {
        type: String,
        default: null,
    },
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
        _id: false
    },
    customerName: {
        type: String,
        default: "",
    },
    customerPhone: {
        type: String,
        default: null,
    },
    customerId: {
        type: String,
        required: true,
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
            disbanded: Boolean,
        },
        _id: false,
    },
    payment: {
        type: Number,
        required: true
    },
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
}, {
    timestamps: true,
})

export const OrderModel = model<IOrderMongoModel>('Order', OrderSchema)
