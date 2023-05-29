import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IMerchant } from '@proshop/types'
import { IMerchantRepository } from '@modules/settings/types/repository'
import { IMerchantService } from '@modules/settings/types/service'

@injectable()
export class MerchantService implements IMerchantService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IMerchantRepository) private repository: IMerchantRepository,
    ) {
    }

    create(merchant: IMerchant) {
        return this.repository.create(merchant)
    }

    read() {
        return this.repository.read()
    }

    update(updates: Partial<IMerchant>) {
        return this.repository.update(updates)
    }

    delete(id: string) {
        return this.repository.delete(id)
    }
}
