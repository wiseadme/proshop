import { IOrder } from '@proshop/types'
import { Request } from 'express'
import { IOrderResponse } from '@modules/orders/types/response'

export interface IOrdersService {
    createOrder(order: IOrder): Promise<IOrder>

    getOrders(params?: Partial<IOrder>): Promise<IOrderResponse>,

    updateOrder(updates: Partial<IOrder>): Promise<IOrder>

    deleteOrder(id: string): Promise<boolean>

    processOrder(request: Request): Promise<any>
}
