import { ICart } from '@ecommerce-platform/types'

export class Cart implements ICart {
  private __id: string
  private _items: ICart['items']
  private _currency: ICart['currency']
  private _ownerId: ICart['ownerId']

  constructor({
    _id = '',
    items,
    currency = null,
    ownerId = null,
  }: Omit<ICart, 'amount' | 'totalItems' | 'totalUniqueItems'>){
    this.__id = _id
    this._items = items
    this._currency = currency
    this._ownerId = ownerId
  }

  get _id(){
    return this.__id
  }

  get items(){
    return this._items
  }

  get totalItems(){
    return this.items.length
  }

  get totalUniqueItems(){
    return this.items.reduce((acc, it) => acc + it.quantity, 0)
  }

  get amount(){
    return this.items.reduce((acc, it) => {
      if (it.variant?.option.price) {
        acc += it.variant.option.price * it.quantity
      } else {
        acc += it.product.price * it.quantity
      }
      return acc
    }, 0)
  }

  get currency(){
    return this._currency
  }

  get ownerId(){
    return this._ownerId
  }

  public unmarshal() {

  }

  static create(cart: ICart){
    return new Cart(cart)
  }
}
