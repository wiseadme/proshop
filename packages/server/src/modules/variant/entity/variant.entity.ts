import { IVariant } from '@proshop/types'

export class Variant {
    private readonly _group: IVariant['group']
    private _options: IVariant['options']

    constructor({ group, options = [] }: IVariant) {
        this._group = group
        this._options = options
    }

    get group() {
        return this._group
    }

    get options() {
        return this._options
    }

    static create(variant: IVariant) {
        return new Variant(variant)
    }
}
