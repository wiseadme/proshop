import { model, Schema } from 'mongoose'
import { IVariantMongoModel } from '@proshop-app/types'

const VariantSchema = new Schema<IVariantMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    attributeId: {
        type: String,
        default: null
    },
    key: {
        type: String,
        default: null
    }
}, {
    timestamps: false,
    versionKey: false
})

export const VariantModel = model<IVariantMongoModel>('Variant', VariantSchema)
