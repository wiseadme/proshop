import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOptionService } from '../types/service'
import { IOptionRepository } from '../types/repository'
import { IOption } from '@proshop/types'
import { IEventBusService } from '@/types/services'
// Constants
import { DELETE_OPTION_EVENT } from '@common/constants/events'
import { Option } from '@modules/option/entity/option.entity'

@injectable()
export class OptionService implements IOptionService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IOptionRepository) private repository: IOptionRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    create(option: IOption): Promise<IOption> {
        return this.repository.create(Option.create(option))
    }

    read(id?: string): Promise<IOption[] | IOption> {
        if (id) {
            return this.repository.findById(id)
        }

        return this.repository.find()
    }

    update(updates: Partial<IOption>): Promise<{ updated: IOption }> {
        return this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        this.events.emit(DELETE_OPTION_EVENT, id)
        return this.repository.delete(id)
    }
}
