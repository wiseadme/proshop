import { IUnit } from '@proshop/types'

export class Unit implements IUnit {
    readonly id: string
    readonly value: IUnit['value']
    readonly meta: IUnit['meta']

    constructor({ id, value, meta }: IUnit) {
        this.id = id
        this.value = value
        this.meta = meta
    }

    static create(unit = {}) {
        return new Unit(unit as IUnit)
    }
}
