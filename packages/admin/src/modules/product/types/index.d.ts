import {
    IProduct,
    IProductQuery,
    IRequestParams
} from '@ecommerce-platform/types'

export interface IProductState {
  products: Maybe<IProduct[]>
  categoryProducts: Maybe<IProduct[]>
  totalLength: number
}

export interface IProductActions {
  create(product: IProduct): Promise<IProduct>

  read(params?: IRequestParams<IProductQuery>): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}
