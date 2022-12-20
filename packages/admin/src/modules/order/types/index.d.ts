import { ICartItem, Maybe, IOrderStatuses } from '@ecommerce-platform/types'

export interface IOrderClient {
  name: string
  phone: string
  email?: string
}

export interface IOrder {
  _id: string
  items: ICartItem[]
  address: Maybe<string>
  status: IOrderStatuses
  amount: number
  client: IOrderClient
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  owner?: any
}
