import { Document } from 'mongoose'
import { ICart } from '@ecommerce-platform/types'

export interface ICartService {
  create(cart: ICart): Promise<Document<ICart>>

  read(params: Partial<ICart>): Promise<Document<ICart>>,

  update(updates: ICart & Document): Promise<{ updated: Document<ICart> }>

  delete(id: string): Promise<boolean>
}
