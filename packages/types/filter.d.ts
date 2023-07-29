
interface IFilterItemMongoModel {
    _id: string
    groupId: string
    value: string
}

export interface IFilterItem {
    id: string
    groupId: string
    value: string
}

export interface IFilterGroup {
    id: string
    name: string
    attributeName: string
    associate?: string
}

interface IFilterGroupMongoModel extends Omit<IFilterGroup, 'id'>{
    _id: string
}
