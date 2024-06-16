import { IVariant } from './variant'

export interface IGroupOption {
    value: string
    productName: string
    image: string
    url: string
    quantity: number
}

export interface IGroup {
    id: string
    name: string
    variant: IVariant
    options: IGroupOption[]
}

export interface IGroupMongoModel extends Omit<IGroup, 'id' | 'variant'> {
    _id: string
    variant: string | IVariant
}
