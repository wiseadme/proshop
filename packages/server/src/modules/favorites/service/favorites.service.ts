import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IFavoritesService } from '@modules/favorites/types/service'
import { IFavoritesRepository } from '@modules/favorites/types/repository'
import { Favorite } from '@modules/favorites/entity/favorite.entity'
import { parseJWToken } from '@common/helpers'

@injectable()
export class FavoritesService implements IFavoritesService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IFavoritesRepository) private repository: IFavoritesRepository,
    ) {
    }

    async addToFavorites({ cookies, sku }: { cookies: Request['cookies'], sku: string }) {
        const parsed = parseJWToken(cookies.user_token)

        return this.repository.create({
            userId: parsed.id,
            sku,
        })
    }

    async getFavorites(cookies) {
        const parsed = parseJWToken(cookies.user_token)

        return this.repository.read(parsed.id)
    }

    async deleteFavorite(params: { sku: string; cookies: Record<string, any> }): Promise<boolean> {
        const parsed = parseJWToken(params.cookies.user_token)

        return this.repository.delete({
            userId: parsed.id,
            sku: params.sku
        })
    }
}
