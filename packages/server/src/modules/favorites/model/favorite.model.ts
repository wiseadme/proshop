import { model, Schema } from 'mongoose'
import { IFavoriteMongoModel } from '@proshop/types/mongo'

const FavoriteSchema = new Schema<IFavoriteMongoModel>({
    userId: {
        type: String,
        required: true,
        index: true
    },
    sku: {
        type: String,
        default: ''
    },
}, {
    timestamps: true,
})

export const FavoriteModel = model<IFavoriteMongoModel>('Favorite', FavoriteSchema)
