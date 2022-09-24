import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOptionService } from '../types/service'
import { IOptionRepository } from '../types/repository'
import { IOption } from '../types/model'
import { IEventBusService } from '@/types/services'

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

  update(updates: Array<IOption & Document>): Promise<{ updated: Array<Document<IOption>> }>{
    return this.repository.update(updates)
  }

  delete(id: string): Promise<boolean>{
    // this.events.emit('delete:option', id)
    return this.repository.delete(id)
  }
}
