import { Maybe } from './utils'

export interface IUnit {
    id: string
    value: string
    meta: Maybe<string>
}


export interface IUnitMongoModel extends Omit<IUnit, 'id'> {
    _id: string
}
