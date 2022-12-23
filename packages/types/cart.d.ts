import { IVariantOption } from './variant'
import { IProduct } from './product'
import { Maybe } from './utils'

interface ICartItem {
  product: IProduct
  variant?: { name: string, option: IVariantOption }
  quantity: number
}

interface ICurrency {
  code: string
  symbol: string
}

export interface ICart {
  _id: string
  items: Array<ICartItem>
  ownerId: Maybe<string>
  totalItems: number
  totalUniqueItems: number
  amount: number
  currency: Maybe<ICurrency>
  expireAt?: Maybe<number>
}
