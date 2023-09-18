import { IOrder } from '@proshop/types'

export interface IOrdersService {
    create(order: IOrder): Promise<IOrder>

    read(params?: Partial<IOrder>): Promise<{ items: Array<IOrder>, total: number }>,

    update(updates: Partial<IOrder>): Promise<{ updated: IOrder }>

    delete(id: string): Promise<boolean>
}
