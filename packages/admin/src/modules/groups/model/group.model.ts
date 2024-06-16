import type { IGroup } from '@proshop/types'

export class Group implements IGroup {
    id: IGroup['id']
    name: IGroup['name']
    variant: IGroup['variant']
    options: IGroup['options']

    constructor({
        id = '',
        name = '',
        variant = null,
        options = [],
    }: IGroup) {
        this.id = id
        this.name = name
        this.variant = variant
        this.options = options
    }

    static create(group = {} as IGroup): IGroup {
        return new Group(group)
    }
}
