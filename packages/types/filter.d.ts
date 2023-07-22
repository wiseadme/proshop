
export interface IFilterItem {
    _id: string
    groupId: string
    value: string
}

export interface IFilterGroup {
    _id: string
    name: string
    attributeName?: string
    associate?: string
}
