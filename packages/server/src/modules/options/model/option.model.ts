import { model, Schema } from 'mongoose'
import { IOptionMongoModel } from '@proshop/types'

const OptionSchema = new Schema<IOptionMongoModel>({
    _id: Schema.Types.ObjectId,
    groupId: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null
    },
    order: {
        type: Number,
    },
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: false,
    versionKey: false
})

export const OptionModel = model<IOptionMongoModel>('Option', OptionSchema)
