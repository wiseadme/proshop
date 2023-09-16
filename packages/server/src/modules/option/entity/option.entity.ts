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
    readonly url: Maybe<string>

    constructor({
        id = '',
        name = '',
        price = 0,
        quantity = 0,
        description = null,
        url = null,
        assets = [],
        variantId = '',
    }: IOption) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.description = description
        this.assets = assets
        this.variantId = variantId
        this.url = url
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}
