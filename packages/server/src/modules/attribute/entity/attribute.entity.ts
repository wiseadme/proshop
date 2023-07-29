import { IAttribute } from '@proshop/types'

export class Attribute implements IAttribute {
    readonly id: string
    readonly key: string
    readonly value: string
    readonly meta: string
    readonly order: number

    constructor({
        id = '',
        key,
        value,
        meta,
        order,
    }) {
        this.id = id
        this.key = key
        this.value = value
        this.meta = meta
        this.order = order
    }

    static create(attribute: IAttribute) {
        return new Attribute(attribute)
    }
}
