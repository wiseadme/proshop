import { model, Schema } from 'mongoose'
import { IFavoriteMongoModel } from '@proshop/types/mongo'

const FavoriteSchema = new Schema<IFavoriteMongoModel>({
    _id: Schema.Types.ObjectId,
    user: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        default: ''
    },
}, {
    timestamps: true,
})

export const FavoriteModel = model<IFavoriteMongoModel>('Favorite', FavoriteSchema)
