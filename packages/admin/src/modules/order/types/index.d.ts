export interface IOrderClient {
  name: string
  phone: string
  email?: string
}

export interface IOrder {
  _id: string
  cart: string
  client: IOrderClient
}
