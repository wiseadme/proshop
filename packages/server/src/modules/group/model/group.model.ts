import { model, Schema } from 'mongoose'
import { IGroupMongoModel, IGroupVariant } from '@proshop/types'

const GroupSchema: Schema = new Schema<IGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    variants: {
        type: [] as IGroupVariant[],
        default: [],
    },
}, {
    timestamps: false,
    strict: false,
})

export const GroupModel = model<IGroupMongoModel>('Group', GroupSchema)
