import { IOrder } from '@proshop/types'
import { id } from 'inversify'

export interface IOrdersService {
    create(order: IOrder): Promise<IOrder>

    read(params?: Partial<IOrder>): Promise<{ items: Array<IOrder>, total: number }>,

    update(updates: Partial<IOrder>): Promise<IOrder>

    delete(id: string): Promise<boolean>
}
