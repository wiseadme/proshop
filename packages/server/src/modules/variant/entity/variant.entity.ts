import { IVariant, Maybe } from '@proshop/types'

export class Variant implements IVariant{
    readonly id: string
    readonly name: string
    readonly attributeId: string
    readonly key: Maybe<string>

    constructor({ id, name, key, attributeId }: IVariant) {
        this.id = id
        this.name = name
        this.key = key ?? null
        this.attributeId = attributeId
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
