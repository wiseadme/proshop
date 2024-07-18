import { IOrder } from '@proshop-app/types'

export interface IOrdersRepository {
    createOrder(order: IOrder): Promise<IOrder>

    getOrders(params?: any): Promise<IOrder[]>

    getOrderById(id: string): Promise<IOrder>

    getOrdersByStatus(seen: boolean): Promise<IOrder[]>

    updateOrder(updates: Partial<IOrder>): Promise<IOrder>

    deleteOrder(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
