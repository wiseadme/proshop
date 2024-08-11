import { model, Schema } from 'mongoose'
import { ISettingsMongoModel } from '@proshop-app/types'

const SettingsSchema: Schema = new Schema<ISettingsMongoModel>({
    _id: Schema.Types.ObjectId,
    merchant: {
        type: String,
        // ref: 'Merchant',
        // _id: false,
        default: '' as any
    },
    site: {
        type: String,
        // ref: 'Site',
        // _id: false,
        default: '' as any
    },
}, {
    timestamps: true,
})

export const SettingsModel = model<ISettingsMongoModel>('Settings', SettingsSchema)
