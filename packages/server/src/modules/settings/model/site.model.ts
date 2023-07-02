import { Document, model, Schema } from 'mongoose'
import { ISite } from '@proshop/types'

const SiteSchema: Schema = new Schema<ISite & Document>({
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

export const SiteModel = model<ISite>('Site', SiteSchema)
