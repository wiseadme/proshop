import { Document } from 'mongoose'
import { IOrder } from '@proshop/types'

export interface IOrderService {
    create(order: IOrder): Promise<Document & IOrder>

    read(params?: Partial<IOrder>): Promise<{ items: Array<Document & IOrder>, total: number }>,

    update(updates: IOrder): Promise<{ updated: Document & IOrder }>

    delete(id: string): Promise<boolean>
}
