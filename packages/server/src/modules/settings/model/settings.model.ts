import { Document, model, Schema } from 'mongoose'
import { ISettingsMongoModel } from '@proshop/types'

const SettingsSchema: Schema = new Schema<ISettingsMongoModel & Document>({
    _id: Schema.Types.ObjectId,
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        _id: false,
        default: '' as any
    },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        _id: false,
        default: '' as any
    },
}, {
    timestamps: true,
})

export const SettingsModel = model<ISettingsMongoModel>('Settings', SettingsSchema)
