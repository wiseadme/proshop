import { model, Schema } from 'mongoose'
import { IFavoriteMongoModel } from '@proshop/types/mongo'

const FavoriteSchema = new Schema<IFavoriteMongoModel>({
    _id: Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true,
        index: true,
    },
    sku: {
        type: String,
        default: '',
        index: true,
    },
}, {
    timestamps: false,
    virtuals: true,
})

FavoriteSchema.virtual('product', {
    ref: 'Product',
    localField: 'sku',
    foreignField: 'sku',
})

export const FavoriteModel = model<IFavoriteMongoModel>('Favorite', FavoriteSchema)
