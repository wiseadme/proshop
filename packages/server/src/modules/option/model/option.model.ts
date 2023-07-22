import { model, Schema } from 'mongoose'
import { IOption } from '@proshop/types'

const OptionSchema = new Schema<IOption>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    variantId: {
        type: String,
        required: true,
    },
    price: Number,
    quantity: Number,
    description: String,
    assets: [{
        type: Schema.Types.ObjectId,
        ref: 'Asset',
    }],
}, {
    timestamps: true,
})

export const OptionModel = model<IOption>('Option', OptionSchema)
