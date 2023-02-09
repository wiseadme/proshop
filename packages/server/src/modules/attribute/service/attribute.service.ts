import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IAttributeService } from '../types/service'
import { IAttributeRepository } from '../types/repository'
import { IAttribute } from '@ecommerce-platform/types'

@injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IAttributeRepository) private repository: IAttributeRepository
  ) {
  }

  create(attribute) {
    return this.repository.create(attribute)
  }

  read(id?: string): Promise<Array<IAttribute & Document>> {
    return this.repository.read(id)
  }

  async update(updates: Partial<IAttribute>): Promise<{ updated: IAttribute & Document | (IAttribute & Document)[] }> {
    let data: any

    if (Array.isArray(updates)) {
      data = []

      for (const atr of updates) {
        const { updated } = await this.repository.update(atr)
        data.push(updated)
      }

      return { updated: data }
    }

    return await this.repository.update(updates)
  }

  delete(id: string): Promise<boolean> {
    return this.repository.delete(id)
  }
}
