import { Document } from 'mongoose'
import { IAttribute } from '@proshop/types'

export interface IAttributeService {
    create(attribute: IAttribute): Promise<IAttribute>

    read(id?: string): Promise<IAttribute[]>,

    update(updates: Partial<IAttribute>): Promise<{ updated: IAttribute | IAttribute[] }>

    delete(id: string): Promise<boolean>
}
