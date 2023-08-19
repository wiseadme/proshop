import { IAsset, IAttribute, IOption, Maybe } from '@proshop/types'

export class Option implements IOption {
    readonly id: string
    readonly name: string
    readonly variantId: string
    readonly price: number
    readonly quantity: number
    readonly description: Maybe<string>
    readonly assets?: IAsset[]
    readonly modelAttribute: Maybe<IAttribute>

    constructor({
        id = '',
        name = '',
        price = 0,
        quantity = 0,
        description = null,
        assets = [],
        variantId = '',
        modelAttribute
    }: IOption) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.description = description
        this.assets = assets
        this.variantId = variantId
        this.modelAttribute = modelAttribute
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}
