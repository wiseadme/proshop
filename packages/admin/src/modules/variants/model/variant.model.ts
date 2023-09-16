import { IVariant } from '@proshop/types'

export class Variant implements IVariant {
    id: string
    group: string
    attributeId: string

    constructor({
        id = '',
        group = '',
        attributeId = ''
    }) {
        this.id = id
        this.group = group
        this.attributeId = attributeId
    }

    static create(unit = {}) {
        return new Variant(unit)
    }
}
