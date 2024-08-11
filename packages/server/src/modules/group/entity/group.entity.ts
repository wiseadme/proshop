import { IGroup, IVariant } from '@proshop-app/types'

export class Group implements IGroup {
    readonly id: string
    readonly name: string
    readonly variant: IVariant
    readonly filterGroupId: string
    readonly hasOptions?: boolean

    constructor({
        id = '',
        name,
        variant,
        filterGroupId = '',
        hasOptions = false
    }) {
        this.id = id
        this.name = name
        this.variant = variant
        this.filterGroupId = filterGroupId
        this.hasOptions = hasOptions
    }

    static create(group: IGroup): IGroup {
        return new Group(group)
    }
}
