import { Maybe } from './utils'
import { ISEOType } from './common'
import { IUnit } from './unit'
import { ICategory } from './category'
import { IAsset } from './asset'
import { IVariant } from './variant'
import { IAttribute } from './attribute'

export interface IProduct {
  _id?: string
  name: string
  description: string
  price: number
  quantity: number
  image: Maybe<string>
  url: string
  isVisible: boolean
  seo: ISEOType
  unit: Maybe<IUnit>
  categories: ICategory[]
  assets: IAsset[]
  variants: IVariant[]
  attributes: IAttribute[]
}
