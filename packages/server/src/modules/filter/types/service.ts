import { IFilterGroup, IFilterItem } from '@proshop-app/types'
import { id } from 'inversify'

export interface IFilterGroupService {
    create(filterGroup: IFilterGroup): Promise<IFilterGroup>

    read(params: Partial<IFilterGroup>): Promise<IFilterGroup[]>,

    update(updates: Partial<IFilterGroup>): Promise<IFilterGroup>

    delete(id: string): Promise<boolean>
}

export interface IFilterItemService {
    createFilterItem(filterItem: IFilterItem): Promise<IFilterItem>

    getFilterItems(params: Partial<IFilterItem>): Promise<IFilterItem[]>,

    updateFilterItem(updates: Partial<IFilterItem>): Promise<IFilterItem>

    deleteFilterItem(id: string): Promise<boolean>

    getFilterItemsByGroupIds(ids: string[]): Promise<Record<string, IFilterItem[]>>
}
