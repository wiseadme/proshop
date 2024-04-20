import { Document } from 'mongoose'
import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOptionService } from '../types/service'
import { IOptionRepository } from '../types/repository'
import { IOption } from '@proshop/types'
import { IEventBusService } from '@/types/services'
// Constants
import { DELETE_OPTION_EVENT } from '@common/constants/events'
import { Option } from '@modules/options/entity/option.entity'
import * as events from 'events'
import { OPTION_IOC } from '@modules/options/di/di.types'

@injectable()
export class OptionService implements IOptionService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(OPTION_IOC.IOptionRepository) private repository: IOptionRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    create(option: IOption): Promise<IOption> {
        return this.repository.create(Option.create(option))
    }

    find(id?: string): Promise<IOption[] | IOption> {
        if (id) {
            return this.repository.findById(id)
        }

        return this.repository.find()
    }

    findMany(ids: string[]): Promise<IOption[]> {
        return this.repository.findMany(ids)
    }

    update(updates: Partial<IOption>): Promise<IOption> {
        return this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        this.events.emit(DELETE_OPTION_EVENT, id)
        return this.repository.delete(id)
    }

    async deleteVariantOptions(options: IOption[]) {
        try {
            // for await (const option of options) {
            await Promise.all(options.map(it => this.delete(it.id)))
            // }

            return true
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
