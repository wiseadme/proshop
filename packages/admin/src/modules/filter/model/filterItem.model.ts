import { IFilterItem } from '@proshop/types'

export class FilterItem implements IFilterItem{
    public id: string
    public groupId: string
    public value: string | number
    constructor({
        id = '',
        groupId = '',
        value = ''
    }: IFilterItem) {
        this.id = id
        this.groupId = groupId
        this.value = value
    }

    static create(filterItem = {}) {
        return new FilterItem(filterItem as IFilterItem)
    }
}
