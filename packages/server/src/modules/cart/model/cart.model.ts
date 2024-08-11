import { model, Schema } from 'mongoose'
import type { ICartItem, ICartMongoModel } from '@proshop-app/types'

const CartSchema = new Schema<ICartMongoModel>({
    _id: Schema.Types.ObjectId,
    items: {
        type: [] as ICartItem[],
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
    amount: {
        type: Number,
        default: 0,
    },
    customerId: {
        type: String,
        default: ''
    },
    orderId: {
        type: String,
        default: null,
    },
} as any, {
    timestamps: true,
})

export const CartModel = model<ICartMongoModel>('Cart', CartSchema)
