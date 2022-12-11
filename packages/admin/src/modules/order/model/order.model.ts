import { IOrder } from '@modules/order/types'

export class Order implements IOrder {
  _id: IOrder['_id']
  cart: IOrder['cart']
  client: IOrder['client']

  constructor({
    _id = '',
    cart,
    client
  }){
    this._id = _id
    this.cart = cart
    this.client = client
  }

  static create(order){
    return new Order(order)
  }
}
