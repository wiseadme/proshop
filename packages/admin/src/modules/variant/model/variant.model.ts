import { IVariant } from '@proshop/types'

export class Variant implements IVariant {
    id: string
    group: string
    attribute: string

    constructor({
        id = '',
        group = '',
        attribute = ''
    }) {
        this.id = id
        this.group = group
        this.attribute = attribute
    }

    static create(unit = {}) {
        return new Variant(unit)
    }
}
