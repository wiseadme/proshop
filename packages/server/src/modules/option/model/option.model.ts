import { Document, model, Schema } from 'mongoose'
import { IOption } from '@proshop/types'

const OptionSchema = new Schema<Document & IOption>({
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
    url: String,
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
