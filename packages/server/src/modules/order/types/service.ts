import { Document } from 'mongoose'
import { IOrder } from '@proshop/types'

export interface IOrderService {
    create(order: IOrder): Promise<IOrder>

    read(params?: Partial<IOrder>): Promise<{ items: Array<IOrder>, total: number }>,

    update(updates: IOrder): Promise<{ updated: IOrder }>

    delete(id: string): Promise<boolean>
}
