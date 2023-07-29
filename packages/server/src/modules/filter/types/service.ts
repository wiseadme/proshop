import { Document } from 'mongoose'
import { IFilterGroup } from '@proshop/types'

export interface IFilterGroupService {
    create(filterGroup: IFilterGroup): Promise<IFilterGroup>

    read(id?: string): Promise<IFilterGroup[]>,

    update(updates: Partial<IFilterGroup>): Promise<{ updated: IFilterGroup }>

    delete(id: string): Promise<boolean>
}
