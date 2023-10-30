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

    create(favorite) {
        return this.repository.create(favorite)
    }

    read(params): Promise<IAttribute[]> {
        return this.repository.read(params)
    }

    async update(updates: Partial<IAttribute>): Promise<IAttribute | IAttribute[]> {
        let data: any

        if (Array.isArray(updates)) {
            data = []

            for await (const atr of updates) {
                const attr = await this.repository.update(atr)
                data.push(attr)
            }

            return data
        }

        return await this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
}
