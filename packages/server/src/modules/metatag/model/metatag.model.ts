import { Document, model, Schema } from 'mongoose'
import { IMetaTag, IMetaTagMongoModel } from '@proshop/types'

const MetaTagSchema: Schema = new Schema<IMetaTagMongoModel>({
    _id: Schema.Types.ObjectId,
    props: {
        type: Object,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: false,
    strict: false,
})

export const MetaTagModel = model<IMetaTagMongoModel>('MetaTag', MetaTagSchema)
