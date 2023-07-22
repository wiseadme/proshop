import { IFilterGroup } from '@proshop/types'
export class FilterGroup implements IFilterGroup{
    private __id: string
    private _name: string
    private _attributeName: string
    private _associate?: string

    constructor({
        _id = '',
        name = '',
        attributeName = '',
        associate = undefined
    }) {
        this.__id = ''
        this._name = name
        this._attributeName = attributeName
        this._associate = associate
    }
    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get attributeName() {
        return this._attributeName
    }

    get associate() {
        return this._associate
    }

    static create(filterGroup) {
        return new FilterGroup(filterGroup)
    }
}
