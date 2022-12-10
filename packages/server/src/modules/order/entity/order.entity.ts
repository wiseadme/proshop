import { IOrder } from '@modules/order/types/model'

export class Order implements IOrder {
  private _cart?: IOrder['cart']
  private _orderId: IOrder['orderId']
  private _address: IOrder['address']
  private _client: IOrder['client']
  private _qrcode: IOrder['qrcode']
  private _owner: IOrder['owner']
  private _status: IOrder['status']

  constructor({ cart = null, orderId = null, address = null, client, qrcode = null, owner = null, status = null }: IOrder) {
    this._cart = cart
    this._owner = owner
    this._orderId = orderId
    this._address = address
    this._client = client
    this._qrcode = qrcode
    this._status = status
  }

  get cart() {
    return this._cart
  }

  get orderId() {
    return this._orderId
  }

  get owner() {
    return this._owner
  }

  get address() {
    return this._address
  }

  get client() {
    return this._client
  }

  get qrcode() {
    return this._qrcode
  }

  get status() {
    return this._status
  }

  static create(order: IOrder) {
    return new Order(order)
  }
}
