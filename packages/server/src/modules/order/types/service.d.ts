import { Document } from 'mongoose'
import { IOrder } from '@ecommerce-platform/types'

export interface IOrderService {
  create(order: IOrder): Promise<Document & IOrder>

  read(params?: Partial<IOrder>): Promise<Array<Document & IOrder>>,

  update(updates: IOrder): Promise<{ updated: Document & IOrder }>

  delete(id: string): Promise<boolean>
}
