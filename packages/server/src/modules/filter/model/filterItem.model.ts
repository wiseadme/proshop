import { model, Schema } from 'mongoose'
import { IFilterItem } from '@proshop/types'

const FilterItemSchema = new Schema<IFilterItem>({
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

export const FilterItemModel = model<IFilterItem>('FilterGroup', FilterItemSchema)
