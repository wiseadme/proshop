import { model, Schema } from 'mongoose'
import { IGroupMongoModel } from '@proshop-app/types'

const GroupSchema: Schema = new Schema<IGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    filterGroupId: {
        type: String,
        default: ''
    },
    hasOptions: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: false,
    strict: false,
    versionKey: false
})

export const GroupModel = model<IGroupMongoModel>('Group', GroupSchema)
