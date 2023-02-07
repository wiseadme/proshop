import { ICustomer, ICustomerAddress } from '@ecommerce-platform/types'

export class Customer implements ICustomer {
  public _id: string
  private _name: string
  private _phone: string
  private _addresses?: ICustomerAddress[]

  constructor({
    _id = '',
    name,
    phone,
    addresses = []
  }) {
    this._id = _id
    this._name = name
    this._phone = phone
    this._addresses = addresses
  }

  get name() {
    return this._name
  }

  get phone() {
    return this._phone
  }

  get addresses() {
    return this._addresses
  }

  static create(customer) {
    return new Customer(customer)
  }
}
