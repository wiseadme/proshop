import { IFilterGroup } from '@proshop/types'

export class FilterGroup implements IFilterGroup {
    readonly id: string
    readonly name: string
    readonly attributeName: string
    readonly associate?: string

    constructor({
        id = '',
        name = '',
        attributeName = '',
        associate = undefined,
    }) {
        this.id = id
        this.name = name
        this.attributeName = attributeName
        this.associate = associate
    }
    static create(filterGroup) {
        return new FilterGroup(filterGroup)
    }
}
