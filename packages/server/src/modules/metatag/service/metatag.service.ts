import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IMetaTagService } from '../types/service'
import { IMetaTagRepository } from '../types/repository'
import { IMetaTag } from '@proshop/types'
import { IEventBusService } from '@/types/services'

@injectable()
export class MetaTagService implements IMetaTagService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IMetaTagRepository) private repository: IMetaTagRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    async create(metaTag: IMetaTag) {
        return await this.repository.create(metaTag)
    }

    async read(params: Partial<IMetaTag>) {
        return await this.repository.read(params)
    }

    async update(updates: Partial<IMetaTag>) {
        return await this.repository.update(updates)
    }

    async delete(id: string) {
        return this.repository.delete(id)
    }
}
