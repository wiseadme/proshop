import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ICurrencyService } from '../types/service'
import { ICurrencyRepository } from '../types/repository'
import { ICurrency } from '@ecommerce-platform/types'

@injectable()
export class CurrencyService implements ICurrencyService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ICurrencyRepository) private repository: ICurrencyRepository
  ) {
  }

  create(currency: ICurrency) {
    return this.repository.create(currency)
  }

  read(params: Partial<ICurrency>) {
    return this.repository.read(params)
  }

  update(updates: Partial<ICurrency>) {
    return this.repository.update(updates)
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}
