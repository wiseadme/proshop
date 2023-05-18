import { Document } from 'mongoose'
import { IOrder } from '@ecommerce-platform/types'

export interface IOrderRepository {
    create(order: IOrder): Promise<Document & IOrder>

    read(params?: any): Promise<Array<Document & IOrder>>

    update(updates: IOrder): Promise<{ updated: Document & IOrder }>

    delete(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
