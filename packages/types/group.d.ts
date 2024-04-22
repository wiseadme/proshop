export interface IGroup {
    id: string
    name: string
    variants: IGroupVariant[]
}

export interface IGroupVariantOption {
    option: string
    productName: string
    image: string
    url: string
}

export interface IGroupVariant {
    key: string
    name: string
    id: string
    items: IGroupVariantOption[]
}

export interface IGroupMongoModel extends Omit<IGroup, 'id'> {
    _id: string
}

// const group = {
//     id: 'sjsjsjjs',
//     variants: [{
//         name: 'Colors',
//         id: 'sjsskks',
//         items: [{
//             option: 'red',
//             product: 'some id'
//         }]
//     }]
// }
