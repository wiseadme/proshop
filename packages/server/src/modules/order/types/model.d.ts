import { ObjectId } from 'mongoose'
import { OrderStatus } from '@modules/order/dictionaries'
import { Maybe } from '@/types/types'

interface IOrderClient {
  name: string
  phone: string
  email: string
  _id?: string
}

export interface IOrder {
  cart?: Maybe<ObjectId>
  address: Maybe<string>
  client: IOrderClient
  orderId?: Maybe<string>
  qrcode?: Maybe<string>
  owner?: Maybe<ObjectId>
  status?: Maybe<OrderStatus>
}
