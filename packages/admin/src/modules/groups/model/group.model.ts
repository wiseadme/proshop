import type { IGroup } from '@proshop-app/types'

export class Group implements IGroup {
    id: IGroup['id']
    name: IGroup['name']
    variant: IGroup['variant']
    hasOptions: IGroup['hasOptions']
    filterGroupId: IGroup['filterGroupId']

    constructor({
        id = '',
        name = '',
        variant,
        filterGroupId,
        hasOptions = false,
    }: IGroup) {
        this.id = id
        this.name = name
        this.variant = variant
        this.hasOptions = hasOptions
        this.filterGroupId = filterGroupId
    }

    static create(group = {} as IGroup): IGroup {
        return new Group(group)
    }
}
