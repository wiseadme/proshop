import { Document } from 'mongoose'
import { ICart } from '@modules/cart/types/model'

export interface ICartService {
  create(cart: ICart): Promise<Document<ICart>>

  read(id?: string): Promise<Document<ICart>>,

  update(updates: ICart & Document): Promise<{ updated: Document<ICart> }>

  delete(id: string): Promise<boolean>
}