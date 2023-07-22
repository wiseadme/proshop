import { IFilterGroup } from '@proshop/types'

export class FilterGroup {
    public _id: string
    public name: string
    public attributeName: string
    public associate: string
    constructor({
        _id = '',
        name = '',
        attributeName = '',
        associate = ''
    }: IFilterGroup) {
        this._id = _id
        this.name = name
        this.attributeName = attributeName
        this.associate = associate
    }

    static create(filterGroup = {}) {
        return new FilterGroup(filterGroup as IFilterGroup)
    }
}
