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
    price?: number
    quantity?: number
    url?: string
    description?: Maybe<string>
    assets?: IAsset[]
    modelAttribute: Maybe<IAttribute>
    products?: IOptionProduct[]
}

export interface IOptionMongoModel extends Omit<IOption, 'id' | 'assets'> {
    _id: string
    assets?: string[] | IAsset[]
}
