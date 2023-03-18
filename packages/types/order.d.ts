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
  seen: boolean
  confirmed: boolean
  inProcess: boolean
  ready: boolean
  inDelivery: boolean
  completed: boolean
  cancelled: boolean
}

export interface IOrderDelivery {
  address: string
  coords: number[]
  entrance?: number
  apartment?: number
  floor?: number
  doorphone?: string
  message?: string
}

export interface IOrder {
  _id?: string
  items: ICartItem[]
  delivery: Maybe<IOrderDelivery>
  amount: number
  customer: IOrderCustomer
  cart?: string | ICart
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  status: IOrderStatuses
  payment?: Maybe<number>
  executor?: IUser
}
