import { IProduct } from '@ecommerce-platform/types'

export interface IProductState {
  products: Maybe<IProduct[]>
  productsByCategory: Maybe<IProduct[]>
  totalLength: number
}

export interface IProductActions {
  create(product: IProduct): Promise<IProduct>

  read(params?: Partial<IProduct>): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}
