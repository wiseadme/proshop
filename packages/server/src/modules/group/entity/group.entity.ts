import { IGroup, IGroupOption, IVariant } from '@proshop/types'

export class Group implements IGroup {
    readonly id: string
    readonly variant: IVariant
    readonly options: IGroupOption[]

    constructor({
        id = '',
        variant,
        options
    }) {
        this.id = id
        this.variant = variant
        this.options = options
    }

    static create(group: IGroup): IGroup {
        return new Group(group)
    }
}
