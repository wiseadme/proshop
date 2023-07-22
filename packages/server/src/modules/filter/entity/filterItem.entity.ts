import { IFilterItem } from '@proshop/types'
export class FilterItem implements IFilterItem{
    private __id: string
    private _value: string
    private _groupId: string

    constructor({
        _id = '',
        value = '',
        groupId = '',
    }) {
        this.__id = _id
        this._value = value
        this._groupId = groupId
    }
    get _id() {
        return this.__id
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
