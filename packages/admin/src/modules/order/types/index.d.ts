import { ICartItem } from '@ecommerce-platform/server/src/modules/cart/types/model'
import { Maybe } from '@ecommerce-platform/server/src/types/types'
import { IOrderStatuses } from '@ecommerce-platform/server/src/modules/order/types/model'

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
