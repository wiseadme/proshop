import { IVariant, Maybe } from '@proshop/types'

export class Variant {
    readonly id: string
    readonly group: IVariant['group']
    readonly options: IVariant['options']
    readonly attributeId: string
    readonly ownerId: Maybe<string>

    constructor({ id, group, options = [], attributeId, ownerId }: IVariant) {
        this.id = id
        this.group = group
        this.options = options
        this.attributeId = attributeId
        this.ownerId = ownerId
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
