import { ObjectId } from 'mongoose'
import { OrderStatus } from '@modules/order/dictionaries'
import { Maybe } from '@/types/types'
import { ICartItem } from '@modules/cart/types/model'

interface IOrderClient {
  name: string
  phone: string
  email: string
  _id?: string
}

interface IOrderStatuses {
  created: boolean
  confirmed: boolean
  inProcess: boolean
  ready: boolean
  completed: boolean
  cancelled: boolean
}

export interface IOrder {
  _id?: string
  items: ICartItem[]
  amount: number
  address: Maybe<string>
  client: IOrderClient
  cartId?: string
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  owner?: Maybe<ObjectId>
  status?: IOrderStatuses
}
