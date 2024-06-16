import {
    IGroup,
    IGroupOption,
    IVariant
} from '@proshop/types'

export class Group implements IGroup {
    id: string
    name: string
    variant: Maybe<IVariant>
    options: IGroupOption[]

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
