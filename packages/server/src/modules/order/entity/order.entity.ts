import { IOrder, ICartItem } from '@ecommerce-platform/types'

export class Order implements IOrder {
  private _items: IOrder['items']
  private _amount: IOrder['amount']
  private _cart: IOrder['cart']
  private _orderId: IOrder['orderId']
  private _delivery: IOrder['delivery']
  private _customer: IOrder['customer']
  private _qrcode: IOrder['qrcode']
  private _status: IOrder['status']
  private _payment: IOrder['payment']
  private _executor: IOrder['executor']

  constructor({
    items = [],
    amount = 0,
    customer,
    orderId = null,
    delivery = null,
    qrcode = null,
    cart = '',
    payment = null,
    executor = null,
    status = {
      created: true,
      confirmed: false,
      inProcess: false,
      ready: false,
      inDelivery: false,
      seen: false,
      completed: false,
      cancelled: false
    }
  }: IOrder){
    this._items = items
    this._amount = amount
    this._orderId = orderId
    this._delivery = delivery
    this._customer = customer
    this._qrcode = qrcode
    this._status = status
    this._cart = cart
    this._payment = payment
    this._executor = executor
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

  get delivery(){
    return this._delivery
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

  get payment() {
    return this._payment
  }

  get executor() {
    return this._executor
  }

  static create(order: IOrder){
    return new Order(order)
  }
}
