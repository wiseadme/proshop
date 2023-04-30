import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
// import { IUnitRepository } from '../types/repository'
import { IMerchant } from '@ecommerce-platform/types'
import { IMerchantRepository } from '@modules/settings/types/repository'
import { IMerchantService } from '@modules/settings/types/service'

@injectable()
export class MerchantService implements IMerchantService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IUnitRepository) private repository: IMerchantRepository
  ) {
  }

  create(merchant: IMerchant) {
    return this.repository.create(merchant)
  }

  read(params: Partial<IMerchant>) {
    return this.repository.read(params)
  }

  update(updates: Partial<IMerchant>) {
    return this.repository.update(updates)
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}
