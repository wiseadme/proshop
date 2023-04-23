import { Maybe } from './utils'

export interface ICurrencyMeta {
  country: string
}
export interface ICurrency {
  _id: string
  name: string
  symbol: Maybe<string>
  meta: Maybe<string>
}
