import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IFavoriteService } from '@modules/favorites/types/service'
import { IFavoriteRepository } from '@modules/favorites/types/repository'
import {parseJWToken} from '@common/helpers'
import { Favorite } from '@modules/favorites/entity/favorite.entity'

@injectable()
export class FavoriteService implements IFavoriteService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IAttributeRepository) private repository: IFavoriteRepository,
    ) {
    }

    async addToFavorites({ cookies, sku }: { cookies: Request['cookies'], sku: string }) {
        const parsed = parseJWToken(cookies.user_token)

        return this.repository.saveFavorite(Favorite.create({
            userId: parsed.id,
            sku,
            id: ''
        }))
    }
}
