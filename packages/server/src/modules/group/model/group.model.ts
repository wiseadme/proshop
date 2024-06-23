import { model, Schema } from 'mongoose'
import { IGroupMongoModel, IGroupOption } from '@proshop/types'

const GroupSchema: Schema = new Schema<IGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    } as any,
    name: {
        type: String,
        unique: true,
        default: `${Date.now()}`,
    },
    hasOptions: {
        type: Boolean,
        required :true
    },
}, {
    timestamps: false,
    strict: false,
    versionKey: false
})

export const GroupModel = model<IGroupMongoModel>('Group', GroupSchema)
