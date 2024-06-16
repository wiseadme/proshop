import { IVariant } from './variant'
import { Maybe } from './utils'

export interface IGroupOption {
    value: string
    productName: string
    image: string
    url: string
    isAvailable?: boolean
}

export interface IGroup {
    id: string
    name: string
    variant: Maybe<IVariant | string>
    options: IGroupOption[]
}

export interface IGroupMongoModel extends Omit<IGroup, 'id' | 'variant'> {
    _id: string
    variant: string | IVariant
}
