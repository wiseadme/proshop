import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import {FilterGroup} from '@modules/filter/entity/filterGroup.entity'
// Types
import { ILogger } from '@/types/utils'
import { IFilterGroupService } from '../types/service'
import { IFilterGroupRepository } from '../types/repository'
import { IFilterGroup } from '@proshop/types'
import { FILTER_IOC } from '@modules/filter/di/di.types'

@injectable()
export class FilterGroupService implements IFilterGroupService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(FILTER_IOC.IFilterGroupRepository) private repository: IFilterGroupRepository,
    ) {
    }

    create(filterGroup: IFilterGroup): Promise<IFilterGroup> {
        return this.repository.create(FilterGroup.create(filterGroup))
    }

    read(params: Partial<IFilterGroup>): Promise<IFilterGroup[]> {
        return this.repository.read(params)
    }

    update(updates: Partial<IFilterGroup>): Promise<IFilterGroup> {
        return this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
}
