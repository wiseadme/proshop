import { Maybe } from './utils'

export interface IAttribute {
    id: string
    key: string
    value: string
    meta: Maybe<string>
    order: number
}

export interface IAttributeMongoModel extends Omit<IAttribute, 'id'> {
    _id: string
}
