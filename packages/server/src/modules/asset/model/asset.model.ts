import { Document, model, Schema } from 'mongoose'
import { IAsset } from '@ecommerce-platform/types'

const AssetSchema: Schema = new Schema<IAsset & Document>({
    _id: Schema.Types.ObjectId,
    url: {
        type: String,
        unique: true,
    },
    type: {
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    main: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export const AssetModel = model<IAsset>('Asset', AssetSchema)
