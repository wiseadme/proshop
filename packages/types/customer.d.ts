export interface ICustomerAddress {
  address: string
  coords: number[]
  entrance?: string
  floor?: number
  doorphone?: string
}

export interface ICustomer {
  _id: string
  name: string
  phone: string
  addresses?: ICustomerAddress[]
}
