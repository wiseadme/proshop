import { IGroup, IVariant } from '@proshop/types'

export class Group implements IGroup {
    readonly id: string
    readonly name: string
    readonly variant: IVariant
    readonly hasOptions?: boolean

    constructor({
        id = '',
        name,
        variant,
        hasOptions = false
    }) {
        this.id = id
        this.name = name
        this.variant = variant
        this.hasOptions = hasOptions
    }

    static create(group: IGroup): IGroup {
        return new Group(group)
    }
}
