import { IVariant } from '@proshop/types'

export class Variant {
    readonly id: string
    readonly group: IVariant['group']
    readonly options: IVariant['options']
    readonly attribute: string

    constructor({ id, group, options = [], attribute }: IVariant) {
        this.id = id
        this.group = group
        this.options = options
        this.attribute = attribute
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
