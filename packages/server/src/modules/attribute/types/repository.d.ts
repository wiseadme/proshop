import { Document } from 'mongoose'
import { IAttribute } from '@ecommerce-platform/types'

export interface IAttributeRepository {
    create(attribute: IAttribute): Promise<Document & IAttribute>

    read(id?: string): Promise<Array<Document & IAttribute>>

    update(updates: Partial<IAttribute>): Promise<{ updated: Document & IAttribute }>

    delete(id: string): Promise<boolean>
}
