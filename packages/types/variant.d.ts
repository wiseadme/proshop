import { IAsset } from './asset'
import { Maybe } from './utils'

export interface IVariantOption {
  _id?: string
  assets?: Array<IAsset>
  quantity?: number
  description?: Maybe<string>
  price?: number
  name: string
  variantId: string
}

export interface IVariant {
  _id?: string
  group: string,
  options?: Array<IVariantOption>
}
