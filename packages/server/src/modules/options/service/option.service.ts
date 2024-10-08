import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOptionService } from '@modules/options/types/service'
import { IOptionRepository } from '@modules/options/types/repository'
import { IOption } from '@proshop-app/types'
import { IEventBusService } from '@/types/services'
// Constants
import { Option } from '@modules/options/entity/option.entity'
import { OPTION_IOC } from '@modules/options/di/di.types'

@injectable()
export class OptionService implements IOptionService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(OPTION_IOC.IOptionRepository) private repository: IOptionRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    createOption(option: IOption): Promise<IOption> {
        return this.repository.create(Option.create(option))
    }

    findOptions(params: Partial<IOption>): Promise<IOption[]> {
        return this.repository.find(params)
    }

    findManyOptions(ids: string): Promise<IOption[]> {
        return this.repository.findMany(ids)
    }

    updateOption(updates: Partial<IOption>): Promise<IOption> {
        return this.repository.update(updates)
    }

    deleteOption(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
}
