import { model, Schema } from 'mongoose'
import { IFilterItemMongoModel } from '@proshop/types'

const FilterItemSchema = new Schema<IFilterItemMongoModel>({
    _id: Schema.Types.ObjectId,
    value: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const FilterItemModel = model<IFilterItemMongoModel>('FilterGroup', FilterItemSchema)
