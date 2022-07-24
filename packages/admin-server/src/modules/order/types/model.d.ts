import { ObjectId } from 'mongoose'
import { OrderStatus } from '@modules/order/dictionaries'

interface IOrderClient {
  name: string
  phone: string
  email: string
  _id?: string
}

export interface IOrder {
  cart: ObjectId
  address: Maybe<string>
  orderId: Maybe<string>
  qrcode: Maybe<string>
  client: IOrderClient
  owner: Maybe<ObjectId>
  status: OrderStatus
}
