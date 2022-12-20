import { IProduct } from '@ecommerce-platform/types'
import { Document } from 'mongoose'
import { ProductQuery } from './params'

export interface IProductRepository {
  create(product: IProduct): Promise<Document & IProduct>

  read(query: ProductQuery): Promise<Array<Document & IProduct>>

  update(updates: Partial<IProduct>): Promise<{ updated: Document & IProduct }>

  delete(id: string): Promise<boolean>
}
