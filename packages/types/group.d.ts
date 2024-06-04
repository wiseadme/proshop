import { IVariant } from './variant'

export interface IGroupOption {
    option: string
    productName: string
    image: string
    url: string
}

export interface IGroup {
    id: string
    variant: IVariant
    options: IGroupOption[]
}

export interface IGroupMongoModel extends Omit<IGroup, 'id' | 'variant'> {
    _id: string
    variant: string | IVariant
}

// const group = {
//     id: 'sjsjsjjs',
//     variant: IVariant
//     items: [{
//             option: 'red',
//             product: 'some id'
//     }]
// }
