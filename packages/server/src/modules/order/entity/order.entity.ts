import { IOrder, ICartItem } from '@ecommerce-platform/types'

export class Order implements IOrder {
  private _items: IOrder['items']
  private _amount: IOrder['amount']
  private _cart: IOrder['cart']
  private _orderId: IOrder['orderId']
  private _address: IOrder['address']
  private _customer: IOrder['customer']
  private _qrcode: IOrder['qrcode']
  private _status: IOrder['status']

  constructor({
    items = [],
    amount = 0,
    orderId = null,
    address = null,
    customer,
    qrcode = null,
    cart = '',
    status = {
      created: true,
      confirmed: false,
      inProcess: false,
      ready: false,
      seen: false,
      completed: false,
      cancelled: false
    }
  }: IOrder){
    this._items = items
    this._amount = amount
    this._orderId = orderId
    this._address = address
    this._customer = customer
    this._qrcode = qrcode
    this._status = status
    this._cart = cart
  }

  get items(){
    return this._items as ICartItem[]
  }

  get amount(){
    return this._amount!
  }

  get cartId(){
    return this._cart
  }

  get orderId(){
    return this._orderId
  }

  get address(){
    return this._address
  }

  get customer(){
    return this._customer
  }

  get qrcode(){
    return this._qrcode
  }

  get status(){
    return this._status
  }

  static create(order: IOrder){
    return new Order(order)
  }
}
