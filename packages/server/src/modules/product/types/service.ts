import { Document } from 'mongoose'
import { IProduct, IRequestParams } from '@ecommerce-platform/types'

export interface IProductService {
  create(product: IProduct): Promise<{ items: (Document & IProduct)[], total?: number }>

  read(query:IRequestParams<Partial<IProduct>>): Promise<{ items: (Document & IProduct)[], total?: number }>,

  update(updates: Partial<IProduct & Document>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}
