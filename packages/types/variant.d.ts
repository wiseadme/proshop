import { IAsset } from './asset'
import { Maybe } from './utils'

export interface IVariantOption {
    _id?: string
    assets?: IAsset[]
    quantity?: number
    description?: Maybe<string>
    price?: number
    url?: string
    name: string
    variantId: string
    ownerId?: string
}

export interface IVariant {
    id: string
    name: string
    attributeId: string
    key: Maybe<string>
}

export interface IVariantMongoModel extends Omit<IVariant, 'id'> {
    _id: string
}
