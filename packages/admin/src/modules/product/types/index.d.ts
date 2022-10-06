import { IVariant, IVariantOption } from '@modules/variant/types'

export interface IProductState {
  products: Maybe<Array<IProduct>>
}

export interface IProductActions {
  create(product: IProduct): Promise<IProduct>

  read(id?: string): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}

export interface IProductAsset {
  _id: string
  url: string
  type: string
  ownerId: string
  main: boolean
}

export interface IProductVariant extends IVariant {
  options: IVariantOption[]
}

export interface IProductSeo {
  title: string
  description: string
  keywords: string
}

export interface IProduct {
  _id: string
  name: string
  price: number
  quantity: number
  url: string
  description: string
  isVisible?: boolean
  unit: Maybe<IUnit>
  categories: Array<ICategory>
  image: Maybe<IProductAsset>
  assets: Array<IProductAsset>
  attributes: Array<IAttribute>
  variants: Array<IProductVariant>
  seo?: IProductSeo
}
