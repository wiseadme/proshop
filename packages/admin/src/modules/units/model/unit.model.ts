import type { IUnit } from '@proshop-app/types'

export class Unit implements IUnit {
    id: string
    value: string
    meta: string

    constructor({
        id = '',
        value = '',
        meta = ''
    }) {
        this.id = id
        this.value = value
        this.meta = meta
    }

    static create(unit = {}) {
        return new Unit(unit)
    }
}
