import { model, Schema } from 'mongoose'
import { IFilterGroupMongoModel } from '@proshop/types'

const FilterGroupSchema = new Schema<IFilterGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    attributeId: {
        type: String,
        required: true,
    },
    associate: {
        type: String,
        default: undefined,
    },
}, {
    timestamps: true,
})

export const FilterGroupModel = model<IFilterGroupMongoModel>('FilterGroup', FilterGroupSchema)
