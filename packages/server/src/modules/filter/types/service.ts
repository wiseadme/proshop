import { IFilterGroup, IFilterItem } from '@proshop/types'

export interface IFilterGroupService {
    create(filterGroup: IFilterGroup): Promise<IFilterGroup>

    read(id?: string): Promise<IFilterGroup[]>,

    update(updates: Partial<IFilterGroup>): Promise<{ updated: IFilterGroup }>

    delete(id: string): Promise<boolean>
}

export interface IFilterItemService {
    create(filterItem: IFilterItem): Promise<IFilterItem>

    read(params: Partial<IFilterItem>): Promise<IFilterItem[]>,

    update(updates: Partial<IFilterItem>): Promise<{ updated: IFilterItem }>

    delete(id: string): Promise<boolean>
}
