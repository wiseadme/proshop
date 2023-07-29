import { Document, model, Schema } from 'mongoose'
import { IVariantMongoModel } from '@proshop/types'

const VariantSchema = new Schema<IVariantMongoModel>({
    _id: Schema.Types.ObjectId,
    group: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const VariantModel = model<IVariantMongoModel>('Variant', VariantSchema)
