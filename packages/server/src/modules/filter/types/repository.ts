import { Document } from 'mongoose'
import { IFilterGroup, IFilterItem } from '@proshop/types'

export interface IFilterGroupRepository {
    create(filterGroup: IFilterGroup): Promise<IFilterGroup>

    read(id?: string): Promise<IFilterGroup[]>

    update(updates: Partial<IFilterGroup>): Promise<{ updated: IFilterGroup }>

    delete(id: string): Promise<boolean>
}

export interface IFilterItemRepository {
    create(filterItem: IFilterItem): Promise<Document & IFilterItem>

    read(id?: string): Promise<Array<Document & IFilterItem>>

    update(updates: Partial<IFilterItem>): Promise<{ updated: IFilterItem }>

    delete(id: string): Promise<boolean>
}
