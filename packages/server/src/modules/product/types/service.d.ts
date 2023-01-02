import { Document } from 'mongoose'
import { IProduct } from '@ecommerce-platform/types'
import { ProductQuery } from './params'

export interface IProductService {
  create(product: IProduct): Promise<Document<IProduct>>

  read(query: ProductQuery): Promise<{items: Array<Document<IProduct>>, total?: number} | Array<Document<IProduct>>>,

  update(updates: Partial<IProduct & Document>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}
