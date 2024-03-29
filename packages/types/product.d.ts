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
    sku?: string
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
    currency: Maybe<ICurrency>
    quantity: number
    image: Maybe<string>
    url: string
    sku: string
    seo: ISEOType
    unit: Maybe<IUnit>
    categories: ICategory[]
    assets: IAsset[]
    variants: IVariant[]
    attributes: IAttribute[]
    conditions: IProductConditions
    related: IProduct[]
}

export interface IProductParams extends Omit<IProduct, 'assets' | 'related' | 'categories' | 'currency'> {
    assets?: string[]
    related?: string[]
    categories?: string[]
    currency: string
}

export interface IProductMongoModel extends Omit<IProductParams, 'id' | 'assets' | 'variants' | 'related' | 'categories' | 'currency'> {
    _id: string
    assets?: string[] | IAsset[]
    variants?: string[] | IVariant[]
    related?: string[] | IProduct[]
    categories?: string[] | ICategory[]
    currency: string | Maybe<ICurrency>
}
