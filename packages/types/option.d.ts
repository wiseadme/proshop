import { Maybe } from './utils'

export interface IOptionProduct {
    url: string
    image: string
    name: string
}
export interface IOption {
    _id?: string
    name: string
    variantId: string
    price?: number
    quantity?: number
    url?: string
    description?: Maybe<string>
    assets?: string[]
    products?: IOptionProduct[]
}
