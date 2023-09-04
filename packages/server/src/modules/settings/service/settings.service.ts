import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IMerchantService, ISettingsService, ISiteService } from '@modules/settings/types/service'
import { ISettingsRepository } from '@modules/settings/types/repository'
import { IMerchant, ISettings, ISite } from '@proshop/types'

@injectable()
export class SettingsService implements ISettingsService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.ISettingsRepository) private repository: ISettingsRepository,
        @inject(TYPES.SERVICES.IMerchantService) private merchantService: IMerchantService,
        @inject(TYPES.SERVICES.ISiteService) private siteService: ISiteService,
    ) {
    }

    async create(settings: Partial<ISettings>) {
        return this.repository.create(settings)
    }

    async read() {
        const [
            settings,
            merchant,
            site
        ] = await Promise.all([
            this.repository.read(),
            this.merchantService.read(),
            this.siteService.read()
        ])

        if (settings) {
            settings.merchant = merchant as IMerchant
            settings.site = site as ISite
        }

        return settings
    }

    async update(updates: Partial<ISettings>) {
        return this.repository.update(updates)
    }

    async delete(id): Promise<boolean> {
        return this.repository.delete(id)
    }
}
