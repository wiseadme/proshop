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
  ){
  }

  create(attribute){
    return this.repository.create(attribute)
  }

  read(id?: string): Promise<Array<IAttribute & Document<any, any, IAttribute>>>{
    return this.repository.read(id)
  }

  update(updates: Partial<IAttribute>): Promise<{ updated: IAttribute & Document<any, any, IAttribute> }>{
    return this.repository.update(updates)
  }

  delete(id: string): Promise<boolean>{
    return this.repository.delete(id)
  }
}
