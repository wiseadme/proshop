import { Document } from 'mongoose'
import { IOrder } from '@ecommerce-platform/types'

export interface IOrderRepository {
  create(order: IOrder): Promise<Document<string, {}, IOrder>>

  read(params?: any): Promise<Array<Document<string, {}, IOrder>>>

  update(updates: IOrder): Promise<{ updated: Document<string, {}, IOrder> }>

  delete(id: string): Promise<boolean>
}
