import { IVariantOption } from './variant'
import { IProduct } from './product'
import { Maybe } from './utils'
import { ICurrency } from './currency'

interface ICartItem {
    product: IProduct
    variant?: { name: string, option: IVariantOption }
    quantity: number
    amount?: number
}

export interface ICart {
    id: string
    items: Array<ICartItem>
    ownerId: Maybe<string>
    totalItems: number
    totalUniqueItems: number
    amount: number
    orderId?: Maybe<string>
    currency: Maybe<ICurrency>
    expireAt?: Maybe<number>
}

export interface ICartMongoModel extends Omit<ICart, 'id'> {
    _id: string
}
