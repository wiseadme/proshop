import { Document } from 'mongoose'
import { IOrder } from '@proshop/types'

export interface IOrderRepository {
    create(order: IOrder): Promise<IOrder>

    find(params?: any): Promise<IOrder[]>

    findById(id: string): Promise<IOrder>

    findBySeen(seen: boolean): Promise<IOrder[]>

    update(updates: IOrder): Promise<{ updated: IOrder }>

    delete(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
