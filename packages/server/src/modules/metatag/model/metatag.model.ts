import { Document, model, Schema } from 'mongoose'
import { IMetaTag } from '@ecommerce-platform/types'

const MetaTagSchema: Schema = new Schema<IMetaTag & Document>({
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

export const MetaTagModel = model<IMetaTag>('MetaTag', MetaTagSchema)
