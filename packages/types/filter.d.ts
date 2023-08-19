export interface IFilterItem {
    id: string
    groupId: string
    value: string | number
}

export interface IFilterGroup {
    id: string
    name: string
    attributeId: string
    associate?: string
}

export interface IFilterGroupMongoModel extends Omit<IFilterGroup, 'id'> {
    _id: string
}

export interface IFilterItemMongoModel extends Omit<IFilterItem, 'id'> {
    _id: string
}
