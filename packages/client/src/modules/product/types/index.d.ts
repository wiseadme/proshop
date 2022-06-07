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
  url: string,
  type: string,
  main: boolean
}

declare interface IProductAttribute {
  key: string
  value: string
  meta?: string
}

declare interface IProductVariant {
  group: string
  product: string
  options: Array<any>
}

declare interface IProduct {
  _id: string
  name: string
  price: number
  count: number
  url: string
  description: string
  isVisible?: boolean
  unit: Maybe<IUnit>
  categories: Array<ICategory>
  image: Maybe<IProductAsset>
  assets: Maybe<Array<IProductAsset>>
  attributes: Maybe<Array<IAttribute>>
  variants: Maybe<Array<IProductVariant>>
  seo?: {
    title?: string
    description?: string
    keywords?: string
  },
}
