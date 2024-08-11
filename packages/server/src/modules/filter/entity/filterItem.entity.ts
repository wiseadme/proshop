import { IFilterItem } from '@proshop-app/types'

export class FilterItem implements IFilterItem {
    readonly id: string
    readonly value: string
    readonly groupId: string

    constructor({
        id = '',
        value = '',
        groupId = '',
    }) {
        this.id = id
        this.value = value
        this.groupId = groupId
    }

    static create(filterItem) {
        return new FilterItem(filterItem)
    }
}
