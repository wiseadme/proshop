import { Document, model, Schema } from 'mongoose'
import { IAttributeMongoModel } from '@proshop/types'

const AttributeSchema = new Schema<IAttributeMongoModel>({
    _id: Schema.Types.ObjectId,
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true,
    },
    meta: {
        type: String,
        default: null,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

export const AttributeModel = model<IAttributeMongoModel>('Attribute', AttributeSchema)
