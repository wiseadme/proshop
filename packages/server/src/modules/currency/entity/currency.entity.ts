import { ICurrency } from '@ecommerce-platform/types'

export class Currency {
  private __id: ICurrency['_id']
  private _name: ICurrency['name']
  private _symbol: ICurrency['symbol']
  private _meta: ICurrency['meta']

  constructor({
    _id = '',
    name,
    symbol = null,
    meta = null
  }: ICurrency) {
    this.__id = _id
    this._name = name
    this._symbol = symbol
    this._meta = meta
  }

  get _id () {
    return this.__id
  }
  get name() {
    return this._name
  }

  get symbol() {
    return this._symbol
  }

  get meta() {
    return this._meta
  }

  static create(currency: ICurrency) {
    return new Currency(currency)
  }
}
