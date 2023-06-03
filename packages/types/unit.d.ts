import { Maybe } from './utils'

export interface IUnit {
    _id?: string
    value: string
    meta: Maybe<string>
}
