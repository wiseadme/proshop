import { IVariant } from '@proshop/types'

export class Variant {
    readonly id: string
    readonly group: IVariant['group']
    readonly options: IVariant['options']
    readonly attributeId: string

    constructor({ id, group, options = [], attributeId }: IVariant) {
        this.id = id
        this.group = group
        this.options = options
        this.attributeId = attributeId
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
