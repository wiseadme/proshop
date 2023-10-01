import { model, Schema } from 'mongoose'
import { IAssetMongoModel } from '@proshop/types'

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
    ownerId: {
        type: String,
        required: true,
    },
    main: {
        type: Boolean,
        default: false,
    },
    order: {
      type: Number,
      default: 0
    },
}, {
    timestamps: true,
})

export const AssetModel = model<IAssetMongoModel>('Asset', AssetSchema)
