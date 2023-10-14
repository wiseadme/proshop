import { IOption } from '@proshop/types'

export class Option implements IOption{
    public id: string
    public variantId: string
    public ownerId: string
    public name: string
    public quantity: number
    public price: number
    public description: Maybe<string>
    public url: Maybe<string>
    public image: Maybe<string>

    constructor({
        id = '',
        variantId = '',
        ownerId = '',
        name = '',
        quantity = 0,
        price = 0,
        description = null,
        url = null,
        image = null
    }: IOption) {
        this.id = id
        this.variantId = variantId
        this.ownerId = ownerId
        this.name = name
        this.quantity = quantity
        this.price = price
        this.description = description
        this.url = url
        this.image = image
    }

    static create(option: IOption) {
        return new Option(option)
    }
}
