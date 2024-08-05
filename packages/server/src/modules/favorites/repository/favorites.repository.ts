import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { IFavorite } from '@proshop-app/types'
import { FavoriteModel } from '@modules/favorites/model/favorite.model'
import { IFavoritesRepository } from '@modules/favorites/types/repository'

import { FavoriteMapper } from '@modules/favorites/mappers/mongo.mapper'

@injectable()
export class FavoritesRepository implements IFavoritesRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(favorite: IFavorite & { userId: string }): Promise<IFavorite> {
        const favoriteData = await new FavoriteModel({
            ...FavoriteMapper.toMongoModelData(favorite),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return FavoriteMapper.toDomain(favoriteData.toObject())
    }

    async read(userId: string): Promise<IFavorite[]> {
        const favorites = await FavoriteModel
            .find({ userId })
            .lean()

        return favorites.length ? favorites.map(it => FavoriteMapper.toDomain(it)) : []
    }

    async delete(params: { sku: string, userId: string }): Promise<boolean> {
        return !!await FavoriteModel.findOneAndDelete(params)
    }
}
