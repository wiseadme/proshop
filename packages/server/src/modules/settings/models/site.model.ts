import { model, Schema } from 'mongoose'
import { ISiteMongoModel } from '@proshop-app/types'

const SiteSchema: Schema = new Schema<ISiteMongoModel>({
    _id: Schema.Types.ObjectId,
    colors: {
        base: String,
        content: String,
        primary: String,
        secondary: String,
        success: String,
        warning: String,
        disabled: String,
        error: String
    },
    slider: {
        slides: Array
    },
    layout: {
        type: String,
        default: null
    },
    components: {
        type: Object,
        default: null
    }
}, {
    timestamps: false,
})

export const SiteModel = model<ISiteMongoModel>('Site', SiteSchema)
