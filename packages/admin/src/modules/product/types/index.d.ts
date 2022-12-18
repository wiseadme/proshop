import { IProduct } from '@ecommerce-platform/types'

export interface IProductState {
  products: Maybe<Array<IProduct>>
}

export interface IProductActions {
  create(product: IProduct): Promise<IProduct>

  read(id?: string): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}
