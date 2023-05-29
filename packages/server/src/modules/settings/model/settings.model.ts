import { Document, model, Schema } from 'mongoose'
import { ISettings } from '@proshop/types'

const SettingsSchema: Schema = new Schema<ISettings & Document>({
    _id: Schema.Types.ObjectId,
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        _id: false,
    },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        _id: false,
    },
}, {
    timestamps: true,
})

export const SettingsModel = model<ISettings>('Settings', SettingsSchema)
