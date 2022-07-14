export class Cart implements ICart {
  private _items: ICart['items']
  private _totalItems: ICart['totalItems']
  private _totalUniqueItems: ICart['totalUniqueItems']
  private _amount: ICart['amount']
  private _currency: ICart['currency']
  private _ownerId: ICart['ownerId']

  constructor({ items, totalItems, totalUniqueItems, amount, currency = null, ownerId = null }: ICart) {
    this._items = items
    this._totalItems = totalItems
    this._totalUniqueItems = totalUniqueItems
    this._amount = amount
    this._currency = currency
    this._ownerId = ownerId
  }

  get items() {
    return this._items
  }

  get totalItems() {
    return this._totalItems
  }

  get totalUniqueItems() {
    return this._totalUniqueItems
  }

  get amount() {
    return this._amount
  }

  get currency() {
    return this._currency
  }

  get ownerId() {
    return this._ownerId
  }

  static create(cart: ICart) {
    return new Cart(cart)
  }
}
