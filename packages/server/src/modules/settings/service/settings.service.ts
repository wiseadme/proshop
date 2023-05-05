import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ISettingsService } from '@modules/settings/types/service'
import { ISettingsRepository } from '@modules/settings/types/repository'
import { ISettings } from '@ecommerce-platform/types'

@injectable()
export class SettingsService implements ISettingsService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ISettingsRepository) private repository: ISettingsRepository
  ) {
  }

  async create(settings: Partial<ISettings>) {
    return this.repository.create(settings)
  }

  async read() {
    return this.repository.read()
  }

  async update(updates: Partial<ISettings>) {
    return this.repository.update(updates)
  }

  async delete(id): Promise<boolean> {
    return this.repository.delete(id)
  }
}
