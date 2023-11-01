import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IFavoriteService } from '@modules/favorites/types/service'
import { IFavoriteRepository } from '../types/repository'
import { IAttribute } from '@proshop/types'

@injectable()
export class FavoriteService implements IFavoriteService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IAttributeRepository) private repository: IFavoriteRepository,
    ) {
    }

    async addToFavorites({ cookies, sku }: { cookies: Request['cookies'], sku: string }) {
        return this.repository.saveFavorite()
    }
}
