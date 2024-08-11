import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IMetaTagService } from '@modules/metatag/types/service'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { IMetaTag } from '@proshop-app/types'
import { IEventBusService } from '@/types/services'
import { META_TAG_IOC } from '@modules/metatag/di/di.types'

@injectable()
export class MetaTagService implements IMetaTagService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(META_TAG_IOC.IMetaTagRepository) private repository: IMetaTagRepository,
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
