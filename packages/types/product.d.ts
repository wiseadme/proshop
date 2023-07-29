import { Maybe } from './utils'
import { ISEOType } from './common'
import { IUnit } from './unit'
import { ICategory } from './category'
import { IAsset } from './asset'
import { IVariant } from './variant'
import { IAttribute } from './attribute'
import { ICurrency } from './currency'

export interface IProductQuery {
    id?: string,
    category?: string
    name?: string
    url?: string
}

export interface IProductConditions {
    visible: boolean
    countable: boolean
    exists: boolean
    hasDiscounts: boolean
    hasActions: boolean
}

export interface IProduct {
    id: string
    name: string
    description: string
    price: number
    currency: Maybe<ICurrency | string>
    quantity: number
    image: Maybe<string>
    url: string
    seo: ISEOType
    unit: Maybe<IUnit>
    categories: string[] | ICategory[]
    assets: IAsset[]
    variants: IVariant[]
    attributes: IAttribute[]
    conditions: IProductConditions
    related: IProduct[] | string[]
}

export interface IProductMongoModel extends Omit<IProduct, 'id' | 'assets' | 'variants'>{
    _id: string
    assets?: string[] | IAsset[]
    variants?: string[] | IVariant[]
}
