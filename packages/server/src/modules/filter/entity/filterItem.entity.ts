import { IFilterItem } from '@proshop/types'
export class FilterItem implements IFilterItem{
    private _id: string
    private _value: string
    private _groupId: string

    constructor({
        id = '',
        value = '',
        groupId = '',
    }) {
        this._id = id
        this._value = value
        this._groupId = groupId
    }
    get id() {
        return this._id
    }

    get value() {
        return this._value
    }

    get groupId() {
        return this._groupId
    }

    static create(filterItem) {
        return new FilterItem(filterItem)
    }
}
