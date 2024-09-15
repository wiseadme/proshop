import { model, Schema } from 'mongoose'
import { ISite, ISiteMongoModel } from '@proshop-app/types'

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
    components: {
        type: Object,
        default: null
    },
    logo: {
        type: {
            origin: String,
            white: String,
            black: String
        },
        default: {}
    },
    assets: {
        type: [] as string[],
        default: []
    } as any
}, {
    timestamps: false,
})

export const SiteModel = model<ISiteMongoModel>('Site', SiteSchema)
