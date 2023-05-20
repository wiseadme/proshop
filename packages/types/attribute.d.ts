import { Maybe } from './utils'

export interface IAttribute {
    _id: string
    key: string
    value: string
    meta: Maybe<string>
    order: number
}
