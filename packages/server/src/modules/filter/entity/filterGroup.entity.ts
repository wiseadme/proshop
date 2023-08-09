import { IFilterGroup } from '@proshop/types'

export class FilterGroup implements IFilterGroup {
    readonly id: string
    readonly name: string
    readonly attribute: string
    readonly associate?: string

    constructor({
        id = '',
        name = '',
        attribute = '',
        associate = undefined,
    }) {
        this.id = id
        this.name = name
        this.attribute = attribute
        this.associate = associate
    }
    static create(filterGroup) {
        return new FilterGroup(filterGroup)
    }
}
