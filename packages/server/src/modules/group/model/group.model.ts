import { model, Schema } from 'mongoose'
import { IGroupMongoModel, IGroupOption } from '@proshop/types'

const GroupSchema: Schema = new Schema<IGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    } as any,
    options: {
        type: [] as IGroupOption[],
        default: [],
    },
}, {
    timestamps: false,
    strict: false,
})

export const GroupModel = model<IGroupMongoModel>('Group', GroupSchema)
