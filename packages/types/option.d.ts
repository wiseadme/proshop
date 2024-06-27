export interface IOptionProduct {
    url: string
    image: string
    name: string
}

export interface IOption {
    id: string
    groupId: string
    value: string
    description?: string
    productName: string
    productId: string
    image: string
    url: string
    isAvailable?: boolean
    order: number
}

export interface IOptionMongoModel extends Omit<IOption, 'id'> {
    _id: string
}
