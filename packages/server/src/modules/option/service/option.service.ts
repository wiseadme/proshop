import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOptionService } from '../types/service'
import { IOptionRepository } from '../types/repository'
import { IOption } from '@ecommerce-platform/types'
import { IEventBusService } from '@/types/services'
// Constants
import { DELETE_OPTION_EVENT } from '@common/constants/events'

@injectable()
export class OptionService implements IOptionService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IOptionRepository) private repository: IOptionRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
  }

  create(option){
    return this.repository.create(option)
  }

  read(id?: string): Promise<Array<Document<IOption>>>{
    return this.repository.read(id)
  }

  update(updates: IOption & Document): Promise<{ updated: Document<IOption> }>{
    return this.repository.update(updates)
  }

  delete(id: string): Promise<boolean>{
    this.events.emit(DELETE_OPTION_EVENT, id)
    return this.repository.delete(id)
  }
}
