import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterItem } from '@modules/filter/entity/filterItem.entity'
// Types
import { ILogger } from '@/types/utils'
import { IFilterItemService } from '../types/service'
import { IFilterItemRepository } from '../types/repository'
import { IFilterItem } from '@proshop/types'

@injectable()
export class FilterItemService implements IFilterItemService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IFilterItemRepository) private repository: IFilterItemRepository,
    ) {
    }

    create(filterItem: IFilterItem): Promise<IFilterItem> {
        return this.repository.create(FilterItem.create(filterItem))
    }

    read(params: Partial<IFilterItem>): Promise<IFilterItem[]> {
        return this.repository.read(params)
    }

    update(updates: Partial<IFilterItem>): Promise<{ updated: IFilterItem }> {
        return this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
}
