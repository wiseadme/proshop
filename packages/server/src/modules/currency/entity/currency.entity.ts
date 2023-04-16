import { ICurrency } from "@ecommerce-platform/types";

export class Currency {
  private _name: ICurrency['name']
  private _symbol: ICurrency['symbol']
  private _meta: ICurrency['meta']

  constructor({
    name,
    symbol = null,
    meta = null
  }: ICurrency) {
    this._name = name
    this._symbol = symbol
    this._meta = meta
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
