import { ICart, ICartItem } from './cart'
import { Maybe } from './utils'

interface IOrderClient {
  _id?: string
  name: string
  phone: string
  email: string
}

interface IOrderStatuses {
  created: boolean
  confirmed: boolean
  inProcess: boolean
  ready: boolean
  seen: boolean
  completed: boolean
  cancelled: boolean
}

export interface IOrder {
  _id?: string
  items: ICartItem[]
  amount: number
  address: Maybe<string>
  client: IOrderClient
  cart?: string | ICart
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  owner?: Maybe<string>
  status: IOrderStatuses
  executor?: any
}
