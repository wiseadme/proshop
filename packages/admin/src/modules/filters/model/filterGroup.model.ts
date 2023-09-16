import { IFilterGroup } from '@proshop/types'

export class FilterGroup {
    public id: string
    public name: string
    public attributeId: string
    public associate: string
    constructor({
        id = '',
        name = '',
        attributeId = '',
        associate = ''
    }: IFilterGroup) {
        this.id = id
        this.name = name
        this.attributeId = attributeId
        this.associate = associate
    }

    static create(filterGroup = {}) {
        return new FilterGroup(filterGroup as IFilterGroup)
    }
}
