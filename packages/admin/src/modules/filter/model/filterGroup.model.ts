import { IFilterGroup } from '@proshop/types'

export class FilterGroup {
    public id: string
    public name: string
    public attributeName: string
    public associate: string
    constructor({
        id = '',
        name = '',
        attributeName = '',
        associate = ''
    }: IFilterGroup) {
        this.id = id
        this.name = name
        this.attributeName = attributeName
        this.associate = associate
    }

    static create(filterGroup = {}) {
        return new FilterGroup(filterGroup as IFilterGroup)
    }
}
