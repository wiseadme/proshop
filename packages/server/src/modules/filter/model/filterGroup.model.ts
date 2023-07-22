import { model, Schema } from 'mongoose'
import { IFilterGroup } from '@proshop/types'

const FilterGroupSchema = new Schema<IFilterGroup>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    attributeName: {
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

export const FilterGroupModel = model<IFilterGroup>('FilterGroup', FilterGroupSchema)
