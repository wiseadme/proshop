import { Document } from 'mongoose'
import { IOrder } from '@modules/order/types/model'

export interface IOrderRepository {
  create(order: IOrder): Promise<Document>

  read(id?: string): Promise<Array<Document & IOrder>>

  update(updates: IOrder & Document): Promise<{ updated: Document<IOrder> }>

  delete(id: string): Promise<boolean>
}
