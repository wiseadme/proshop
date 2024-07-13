import { Maybe } from './utils'
import { ISEOType } from './common'
import { IUnit } from './unit'
import { ICategory } from './category'
import { IAsset } from './asset'
import { IAttribute } from './attribute'
import { ICurrency } from './currency'
import { IGroup } from './group'

export interface IProductQuery {
    id?: string,
    category?: string
    name?: string
    url?: string
    sku?: string
}

export interface IProductConditions {
    isVisible: boolean
    isCountable: boolean
    isExists: boolean
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
    groups: (IGroup | string)[]
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

export interface IProductMongoModel extends Omit<IProductParams, 'id' | 'assets' | 'groups' | 'related' | 'categories' | 'currency'> {
    _id: string
    assets?: string[] | IAsset[]
    groups?: string[] | IGroup[]
    related?: string[] | IProduct[]
    categories?: string[] | ICategory[]
    currency: string | Maybe<ICurrency>
}
