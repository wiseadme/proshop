import { model, Schema } from 'mongoose'
import { IVariantMongoModel } from '@proshop/types'

const VariantSchema = new Schema<IVariantMongoModel>({
    _id: Schema.Types.ObjectId,
    group: {
        type: String,
        required: true,
        unique: true
    },
    attributeId: {
        type: String,
        default: null
    },
    ownerId: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
})

export const VariantModel = model<IVariantMongoModel>('Variant', VariantSchema)
