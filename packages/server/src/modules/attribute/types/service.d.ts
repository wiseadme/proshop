import { Document } from 'mongoose'
import { IAttribute } from '@proshop/types'

export interface IAttributeService {
    create(attribute: IAttribute): Promise<IAttribute & Document<any, any, IAttribute>>

    read(id?: string): Promise<Array<IAttribute & Document<any, any, IAttribute>>>,

    update(updates: Partial<IAttribute>): Promise<{ updated: IAttribute & Document | (IAttribute & Document)[] }>

    delete(id: string): Promise<boolean>
}
