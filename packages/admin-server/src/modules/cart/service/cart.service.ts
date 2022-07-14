import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ICartService } from '../types/service'
import { ICartRepository } from '../types/repository'

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IAttributeRepository) private repository: ICartRepository
  ){
  }

  create(attribute){
    return this.repository.create(attribute)
  }

  read(id?: string): Promise<Document & ICart>{
    return this.repository.read(id)
  }

  update(updates: ICart & Document): Promise<{ updated: Document<ICart> }>{
    return this.repository.update(updates)
  }

  delete(id: string): Promise<boolean>{
    return this.repository.delete(id)
  }
}
