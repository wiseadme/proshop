import { Document, model, Schema } from 'mongoose'
import { IVariant } from '@ecommerce-platform/types'

const VariantSchema = new Schema<Document & IVariant>({
    _id: Schema.Types.ObjectId,
    group: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const VariantModel = model<IVariant>('Variant', VariantSchema)
