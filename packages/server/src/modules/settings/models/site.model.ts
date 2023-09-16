import { Document, model, Schema } from 'mongoose'
import { ISiteMongoModel } from '@proshop/types'

const SiteSchema: Schema = new Schema<ISiteMongoModel>({
    _id: Schema.Types.ObjectId,
    colors: {
        primary: String,
        secondary: String,
        success: String,
        warning: String,
    },
}, {
    timestamps: true,
})

export const SiteModel = model<ISiteMongoModel>('Site', SiteSchema)
