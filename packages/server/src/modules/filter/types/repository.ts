import { Document } from 'mongoose'
import { IFilterGroup, IFilterItem } from '@proshop/types'

export interface IFilterGroupRepository {
    create(filterGroup: IFilterGroup): Promise<Document & IFilterGroup>

    read(id?: string): Promise<Array<Document & IFilterGroup>>

    update(updates: Partial<IFilterGroup>): Promise<{ updated: Document & IFilterGroup }>

    delete(id: string): Promise<boolean>
}

export interface IFilterItemRepository {
    create(filterItem: IFilterItem): Promise<Document & IFilterItem>

    read(id?: string): Promise<Array<Document & IFilterItem>>

    update(updates: Partial<IFilterItem>): Promise<{ updated: Document & IFilterItem }>

    delete(id: string): Promise<boolean>
}
