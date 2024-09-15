import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ISiteService } from '@modules/settings/types/service'
import { ISiteRepository } from '@modules/settings/types/repository'
import { ISite } from '@proshop-app/types'
import { Site } from '@modules/settings/entities/site.entity'

@injectable()
export class SiteService implements ISiteService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.ISiteRepository) private repository: ISiteRepository,
    ) {
    }

    async create(siteConfig: Partial<ISite>) {
        return this.repository.create(Site.create(siteConfig))
    }

    async read() {
        return this.repository.read()
    }

    async update(updates: Partial<ISite>) {
        return this.repository.update(updates)
    }

    async delete(id): Promise<boolean> {
        return this.repository.delete(id)
    }
}
