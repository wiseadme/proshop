import { IVariant } from '@proshop/types'

export class Variant {
    readonly id: string
    readonly group: IVariant['group']
    readonly options: IVariant['options']

    constructor({ id, group, options = [] }: IVariant) {
        this.id = id
        this.group = group
        this.options = options
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
