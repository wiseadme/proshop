declare interface ICartItem {
  productId: string
  variantId?: string
  price: number
  quantity: number
  amount: number
}

declare interface ICurrency {
  code: string
  symbol: string
}

declare interface ICart {
  items: Array<ICartItem>
  totalItems: number
  totalUniqueItems: number
  amount: number
  currency: Maybe<ICurrency>
  ownerId: Maybe<string>
}
