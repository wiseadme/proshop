import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IFavoritesService } from '@modules/favorites/types/service'
import { IFavoritesRepository } from '@modules/favorites/types/repository'
import { parseJWToken } from '@common/helpers'
import { FAVORITES_IOC } from '@modules/favorites/di/di.types'
import { CUSTOMER_TOKEN_KEY } from '@common/constants/cookie-keys'

@injectable()
export class FavoritesService implements IFavoritesService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(FAVORITES_IOC.IFavoritesRepository) private repository: IFavoritesRepository,
    ) {
    }

    async addToFavorites({ cookies, sku }: { cookies: Request['cookies'], sku: string }) {
        const parsed = parseJWToken(cookies[CUSTOMER_TOKEN_KEY])

        return this.repository.create({
            userId: parsed.id,
            sku,
        })
    }

    async getFavorites(cookies) {
        const parsed = parseJWToken(cookies[CUSTOMER_TOKEN_KEY])

        return this.repository.read(parsed.id)
    }

    async deleteFavorite(params: { sku: string; cookies: Record<string, any> }): Promise<boolean> {
        const parsed = parseJWToken(params.cookies[CUSTOMER_TOKEN_KEY])

        return this.repository.delete({
            userId: parsed.id,
            sku: params.sku
        })
    }
}
