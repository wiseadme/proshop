import { IFilterGroup } from '@proshop/types'

export class FilterGroup {
    public id: string
    public name: string
    public attribute: string
    public associate: string
    constructor({
        id = '',
        name = '',
        attribute = '',
        associate = ''
    }: IFilterGroup) {
        this.id = id
        this.name = name
        this.attribute = attribute
        this.associate = associate
    }

    static create(filterGroup = {}) {
        return new FilterGroup(filterGroup as IFilterGroup)
    }
}
