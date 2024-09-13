import { model, Schema } from 'mongoose'
import type { IAssetMongoModel } from '@proshop-app/types'

const AssetSchema: Schema = new Schema<IAssetMongoModel>({
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
    dir: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
})

export const AssetModel = model<IAssetMongoModel>('Asset', AssetSchema)
