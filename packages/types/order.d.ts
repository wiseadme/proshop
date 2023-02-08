import { ICart, ICartItem } from './cart'
import { Maybe } from './utils'

interface IOrderCustomer {
  _id?: string
  name: string
  phone: string
  email: string
  address?: any
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
  address: Maybe<string>
  amount: number
  customer: IOrderCustomer
  cart?: string | ICart
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  status: IOrderStatuses
  executor?: any
}
