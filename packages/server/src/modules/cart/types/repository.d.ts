import { Document } from 'mongoose'
import { ICart } from '@ecommerce-platform/types'

export interface ICartRepository {
  create(cart: ICart): Promise<Document & ICart>

  read(id?: string): Promise<Document & ICart>

  update(updates: ICart & Document): Promise<{ updated: Document<ICart> }>

  delete(id: string): Promise<boolean>
}
