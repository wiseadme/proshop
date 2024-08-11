import type { IVariant } from '@proshop-app/types'

export class Variant implements IVariant {
    id: string
    name: string
    key: Maybe<string>
    attributeId: string

    constructor({
        id = '',
        name = '',
        attributeId = '',
        key = null
    }) {
        this.id = id
        this.name = name
        this.attributeId = attributeId
        this.key = key
    }

    static create(unit = {}) {
        return new Variant(unit)
    }
}
