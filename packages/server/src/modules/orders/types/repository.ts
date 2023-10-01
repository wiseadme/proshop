import { Document } from 'mongoose'
import { IOrder } from '@proshop/types'
import { id } from 'inversify'

export interface IOrdersRepository {
    create(order: IOrder): Promise<IOrder>

    find(params?: any): Promise<IOrder[]>

    findById(id: string): Promise<IOrder>

    findBySeen(seen: boolean): Promise<IOrder[]>

    update(updates: IOrder): Promise<IOrder>

    delete(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
