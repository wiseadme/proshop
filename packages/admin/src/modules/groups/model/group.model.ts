import type { IGroup } from '@proshop/types'

export class Group implements IGroup {
    id: IGroup['id']
    name: IGroup['name']
    variant: IGroup['variant']
    hasOptions: IGroup['hasOptions']

    constructor({
        id = '',
        name = '',
        variant = null,
        hasOptions = false,
    }: IGroup) {
        this.id = id
        this.name = name
        this.variant = variant
        this.hasOptions = hasOptions
    }

    static create(group = {} as IGroup): IGroup {
        return new Group(group)
    }
}
