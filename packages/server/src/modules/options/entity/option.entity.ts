import { IAsset, IAttribute, IOption, Maybe } from '@proshop/types'

export class Option implements IOption {
    readonly id: string
    readonly name: string
    readonly variantId: string
    readonly ownerId: string
    readonly price: number
    readonly order: number
    readonly quantity: number
    readonly description: Maybe<string>
    readonly image: Maybe<string>
    readonly url: Maybe<string>

    constructor({
        id = '',
        name = '',
        price = 0,
        quantity = 0,
        order = 0,
        description = null,
        url = null,
        image = null,
        variantId = '',
        ownerId = '',
    }: IOption) {
        this.id = id
        this.name = name
        this.price = price
        this.order = order
        this.quantity = quantity
        this.description = description
        this.image = image
        this.variantId = variantId
        this.ownerId = ownerId
        this.url = url
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}
