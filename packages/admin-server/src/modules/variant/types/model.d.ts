interface IVariantOption {
  assets: Array<string>
  count: number
  description: string
  name: string
  price: number
}

export interface IVariant {
  group: string,
  options: Array<IVariantOption>
}
