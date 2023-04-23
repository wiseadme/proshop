import { ICurrency, Maybe } from '@ecommerce-platform/types'

export class Currency {
  public _id: string
  public name: string
  public symbol: Maybe<string>
  public meta: Maybe<string>

  constructor({
    _id = '',
    name,
    symbol = null,
    meta = null
  }: ICurrency) {
    this._id = _id
    this.name = name
    this.symbol = symbol
    this.meta = meta
  }

  static create(currency = {} as ICurrency) {
    return new Currency(currency)
  }
}
