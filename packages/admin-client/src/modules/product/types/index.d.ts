declare interface IProductState {
  products: Maybe<Array<IProduct>>
}

declare interface IProductActions {
  create(product: IProduct): Promise<IProduct>

  read(id?: string): Promise<Array<IProduct>>

  delete(product): Promise<boolean>

  update(updates: Partial<IProduct>): Promise<IProduct>
}

declare interface IProductAsset {
  _id: string
  url: string
  type: string
  ownerId: string
  main: boolean
}

declare interface IProductAttribute {
  key: string
  value: string
  meta?: string
}

declare interface IProductVariantOption {
  name: string,
  count: number
  price: number
  description: string
  assets: Array<IProductAsset>
}

declare interface IProductVariant {
  group: string
  options: Array<IProductVariantOption>
}

declare interface IProductSeo {
  title: string
  description: string
  keywords: string
}

declare interface IProduct {
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
