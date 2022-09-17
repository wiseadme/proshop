import { IVariantOption } from '@modules/variant/types/model'
import { IProduct } from '@modules/product/types/model'
import { Maybe } from '@/types/types'

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
  items: Array<ICartItem>
  totalItems: number
  totalUniqueItems: number
  amount: number
  currency: Maybe<ICurrency>
  ownerId: Maybe<string>
}
