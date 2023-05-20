import { IVariantOption } from './variant'
import { IProduct } from './product'
import { Maybe } from './utils'
import { ICurrency } from './currency'

interface ICartItem {
    product: IProduct
    variant?: { name: string, option: IVariantOption }
    quantity: number
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
