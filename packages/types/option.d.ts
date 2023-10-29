import { Maybe } from './utils'
import { IAsset } from './asset'
import { IProduct } from './product'

export interface IOptionProduct {
    url: string
    image: string
    name: string
}

export interface IOption {
    id: string
    name: string
    variantId: string
    ownerId: string
    product: Maybe<IProduct | string>
    price?: number
    quantity?: number
    order: number
    url: Maybe<string>
    description?: Maybe<string>
    image: Maybe<string>
}

export interface IOptionMongoModel extends Omit<IOption, 'id' | 'assets' | 'product'> {
    _id: string
    assets?: string[] | IAsset[]
    product: Maybe<string>
}
