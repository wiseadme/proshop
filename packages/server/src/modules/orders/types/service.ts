import { IOrder } from '@proshop/types'
import { Request } from 'express'

export interface IOrdersService {
    createOrder(order: IOrder): Promise<IOrder>

    getOrders(params?: Partial<IOrder>): Promise<{ items: Array<IOrder>, total: number }>,

    updateOrder(updates: Partial<IOrder>): Promise<IOrder>

    deleteOrder(id: string): Promise<boolean>

    processOrder(request: Request): Promise<any>
}
