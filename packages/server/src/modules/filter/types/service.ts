import { Document } from 'mongoose'
import { IFilterGroup } from '@proshop/types'

export interface IFilterGroupService {
    create(filterGroup: IFilterGroup): Promise<Document & IFilterGroup>

    read(id?: string): Promise<Array<Document & IFilterGroup>>,

    update(updates: Partial<IFilterGroup>): Promise<{ updated: Document & IFilterGroup }>

    delete(id: string): Promise<boolean>
}
