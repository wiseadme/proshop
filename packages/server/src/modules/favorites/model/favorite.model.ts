import { model, Schema } from 'mongoose'
import { IFavoriteMongoModel } from '@proshop/types/mongo'

const FavoriteSchema = new Schema<IFavoriteMongoModel>({
    _id: Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []
    },
}, {
    timestamps: true,
})

export const FavoriteModel = model<IFavoriteMongoModel>('Favorite', FavoriteSchema)
