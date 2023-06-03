import { Maybe } from './utils'

export interface IOption {
    _id?: string
    name: string,
    variantId: string
    price?: number,
    quantity?: number,
    description?: Maybe<string>,
    assets?: string[],
}
