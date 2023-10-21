import { Maybe } from './utils'
import { IAsset } from './asset'
import { IAttribute } from './attribute'

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
    price?: number
    quantity?: number
    order: number
    url: Maybe<string>
    description?: Maybe<string>
    image: Maybe<string>
}

export interface IOptionMongoModel extends Omit<IOption, 'id' | 'assets'> {
    _id: string
    assets?: string[] | IAsset[]
}
