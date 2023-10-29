import { model, Schema } from 'mongoose'
import { IOptionMongoModel } from '@proshop/types'

const OptionSchema = new Schema<IOptionMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    variantId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    price: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
})

export const OptionModel = model<IOptionMongoModel>('Option', OptionSchema)
