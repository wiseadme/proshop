import { IProductAsset } from '@modules/product/types'

interface IVariantOption {
  _id?: string
  assets?: Array<IProductAsset>
  quantity?: number
  description?: Maybe<string>
  price?: number
  name: string
  variantId: string
}

declare interface IVariant {
  _id: string
  group: string
}

declare interface IVariantActions {
  create(variant: IVariant): Promise<IVariant>

  read(id?: string): Promise<Array<IVariant>>

  delete(id: string): Promise<boolean>
}

declare interface IVariantState {
  variants: Maybe<Array<IVariant>>
}
