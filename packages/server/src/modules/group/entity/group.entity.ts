import { IGroup, IGroupOption, IVariant } from '@proshop/types'

export class Group implements IGroup {
    readonly id: string
    readonly name: string
    readonly variant: IVariant
    readonly options: IGroupOption[]

    constructor({
        id = '',
        name,
        variant,
        options
    }) {
        this.id = id
        this.name = name
        this.variant = variant
        this.options = options
    }

    static create(group: IGroup): IGroup {
        return new Group(group)
    }
}
