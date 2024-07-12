import { Document } from 'mongoose'
import { IOrder } from '@proshop/types'
import { id } from 'inversify'

export interface IOrdersRepository {
    createOrder(order: IOrder): Promise<IOrder>

    getOrders(params?: any): Promise<IOrder[]>

    getOrderById(id: string): Promise<IOrder>

    getOrdersByStatus(seen: boolean): Promise<IOrder[]>

    updateOrder(updates: IOrder): Promise<IOrder>

    deleteOrder(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
