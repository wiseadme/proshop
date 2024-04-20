import { model, Schema } from 'mongoose'
import { IGroupMongoModel, IGroupVariant } from '@proshop/types'

/** Пример группировки опций варианта */

// const variants = {
//     colors: {
//         option: 'option id',
//         name: 'option name',
//         product: 'product id'
//     },
//     memory: {
//
//     }
// }

const GroupSchema: Schema = new Schema<IGroupMongoModel>({
    _id: Schema.Types.ObjectId,
    variants: {
        type: {} as Record<string, IGroupVariant>,
        default: {},
    },
}, {
    timestamps: false,
    strict: false,
})

export const GroupModel = model<IGroupMongoModel>('Group', GroupSchema)
