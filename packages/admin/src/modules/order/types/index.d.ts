export interface IOrderClient {
  name: string
  phone: string
  email?: string
}

export interface IOrder {
  _id: string
  items: string
  status: any
  amount: number
  client: IOrderClient
}
