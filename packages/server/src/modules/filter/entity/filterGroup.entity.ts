import { IFilterGroup } from '@proshop/types'

export class FilterGroup implements IFilterGroup {
    readonly id: string
    readonly name: string
    readonly attributeId: string
    readonly associate?: string

    constructor({
        id = '',
        name = '',
        attributeId = '',
        associate = undefined,
    }) {
        this.id = id
        this.name = name
        this.attributeId = attributeId
        this.associate = associate
    }
    static create(filterGroup) {
        return new FilterGroup(filterGroup)
    }
}
