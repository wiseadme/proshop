import {
    IGroup,
    IGroupOption,
    IVariant
} from '@proshop/types'

export class Group implements IGroup {
    id: string
    variant: IVariant
    options: IGroupOption[]

    constructor({
        id = '',
        variant = {} as IVariant,
        options = [] as IGroupOption[],
    }: IGroup) {
        this.id = id
        this.variant = variant
        this.options = options
    }

    static create(group = {} as IGroup): IGroup {
        return new Group(group)
    }
}
