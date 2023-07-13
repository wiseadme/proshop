import { IAsset } from './asset'
import {IOption} from './option'
import { Maybe } from './utils'

export interface IVariantOption {
    _id?: string
    assets?: Array<IAsset>
    quantity?: number
    description?: Maybe<string>
    price?: number
    url?: string
    name: string
    variantId: string
}

export interface IVariant {
    _id?: string
    group: string,
    options?: Array<IOption>
}
