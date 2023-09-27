import { IVariant } from '@proshop/types'

export class Variant implements IVariant {
    id: string
    group: string
    attributeId: string
    ownerId: Maybe<string>

    constructor({
        id = '',
        group = '',
        attributeId = '',
        ownerId = null
    }) {
        this.id = id
        this.group = group
        this.attributeId = attributeId
        this.ownerId = ownerId
    }

    static create(unit = {}) {
        return new Variant(unit)
    }
}
