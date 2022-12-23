import { ICart } from '@ecommerce-platform/types'

export class Cart implements ICart {
  private __id: string
  private _items: ICart['items']
  private _totalItems: ICart['totalItems']
  private _totalUniqueItems: ICart['totalUniqueItems']
  private _amount: ICart['amount']
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
    this._totalItems = items.reduce((acc, it) => acc + it.quantity, 0)
    this._totalUniqueItems = items.length
    this._currency = currency
    this._ownerId = ownerId
    this._amount = items.reduce((acc, it) => {
      if (it.variant && it.variant.option.price) {
        acc += it.variant.option.price * it.quantity
      } else {
        acc += it.product.price * it.quantity
      }
      return acc
    }, 0)
  }

  get _id(){
    return this.__id
  }

  get items(){
    return this._items
  }

  get totalItems(){
    return this._totalItems
  }

  get totalUniqueItems(){
    return this._totalUniqueItems
  }

  get amount(){
    return this._amount
  }

  get currency(){
    return this._currency
  }

  get ownerId(){
    return this._ownerId
  }

  static create(cart: ICart){
    return new Cart(cart)
  }
}
