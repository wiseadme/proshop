import { IOrder } from '@ecommerce-platform/types/index'

export class Order implements Partial<IOrder> {
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
