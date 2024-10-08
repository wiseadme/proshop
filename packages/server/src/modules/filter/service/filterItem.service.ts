import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterItem } from '@modules/filter/entity/filterItem.entity'
// Types
import { ILogger } from '@/types/utils'
import { IFilterItemService } from '../types/service'
import { IFilterItemRepository } from '../types/repository'
import { IFilterItem } from '@proshop-app/types'
import { FILTER_IOC } from '@modules/filter/di/di.types'

@injectable()
export class FilterItemService implements IFilterItemService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(FILTER_IOC.IFilterItemRepository) private repository: IFilterItemRepository,
    ) {
    }

    createFilterItem(filterItem: IFilterItem): Promise<IFilterItem> {
        return this.repository.create(FilterItem.create(filterItem))
    }

    getFilterItems(params: Partial<IFilterItem>): Promise<IFilterItem[]> {
        return this.repository.read(params)
    }

    updateFilterItem(updates: Partial<IFilterItem>): Promise<IFilterItem> {
        return this.repository.update(updates)
    }

    deleteFilterItem(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }

    async getFilterItemsByGroupIds(ids: string[]) {
        const items = await this.repository.findByGroupIds(ids)

        return items.reduce((map, filter) => {
            map[filter.groupId] ??= []
            map[filter.groupId].push(filter)

            return map
        }, {})
    }
}
