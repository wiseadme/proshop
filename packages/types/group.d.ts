export interface IGroup {
    id: string
    variants: Record<string, Record<string, IGroupVariant>>
}

export interface IGroupVariant {
    option: string
    product: string
}

export interface IGroupMongoModel extends Omit<IGroup, 'id'> {
    _id: string
}
