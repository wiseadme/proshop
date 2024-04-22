import { IGroup, IGroupVariant } from '@proshop/types'

export class Group implements IGroup {
    readonly id: string
    readonly name: string
    readonly variants: IGroupVariant[]

    constructor({
        id = '',
        name,
        variants,
    }) {
        this.id = id
        this.name = name
        this.variants = variants
    }

    static create(group: IGroup): IGroup {
        return new Group(group)
    }
}
