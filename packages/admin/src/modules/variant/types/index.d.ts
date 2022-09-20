import { IProductAsset } from '@modules/product/types'

interface IVariantOption {
  assets: Array<IProductAsset>
  count: number
  description: string
  name: string
  price: number
}

declare interface IVariant {
  _id: string
  group: string
  options: Array<IVariantOption>
}

declare interface IVariantActions {
  create(variant: IVariant): Promise<IVariant>

  read(id?: string): Promise<Array<IVariant>>

  delete(id: string): Promise<boolean>
}

declare interface IVariantState {
  variants: Maybe<Array<IVariant>>
}
