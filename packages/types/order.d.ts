import { ICart, ICartItem } from './cart'
import { IUser } from './user'
import { Maybe } from './utils'

interface IOrderCustomer {
  _id?: string
  name: string
  phone: string
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

export interface IOrderAddress {
  text: string
  coords: number[]
  entrance?: string
  floor?: number
  doorphone?: string
}

export interface IOrder {
  _id?: string
  items: ICartItem[]
  address: Maybe<IOrderAddress>
  amount: number
  customer: IOrderCustomer
  cart?: string | ICart
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  status: IOrderStatuses
  executor?: IUser
}
