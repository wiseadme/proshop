import { model, Schema } from 'mongoose'
import type { IFilterItemMongoModel } from '@proshop-app/types'

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

export const FilterItemModel = model<IFilterItemMongoModel>('FilterItem', FilterItemSchema)
