import { model, Schema } from 'mongoose'
import type { ICartMongoModel } from '@proshop-app/types'

const CartSchema = new Schema<ICartMongoModel>({
    _id: Schema.Types.ObjectId,
    items: {
        type: Array as any,
        default: [],
    },
    totalItems: {
        type: Number,
        default: 0,
    },
    totalUniqueItems: {
        type: Number,
        default: 0,
    },
    currency: {
        type: Object,
        default: null,
    },
    amount: {
        type: Number,
        default: 0,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    orderId: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
})

export const CartModel = model<ICartMongoModel>('Cart', CartSchema)
