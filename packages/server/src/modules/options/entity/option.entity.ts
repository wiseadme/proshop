import { IOption } from '@proshop-app/types'

export class Option implements IOption {
    readonly id: string
    readonly groupId: string
    readonly value: string
    readonly order: number
    readonly isAvailable: boolean
    readonly productName: string
    readonly productId: string
    readonly image: string
    readonly url: string
    readonly description?: string

    constructor({
        id = '',
        order = 0,
        description = '',
        url = '',
        image = '',
        productName,
        productId,
        value,
        groupId,
        isAvailable = true
    }: IOption) {
        this.id = id
        this.groupId = groupId
        this.value = value
        this.order = order
        this.description = description
        this.image = image
        this.url = url
        this.productName = productName
        this.productId = productId
        this.isAvailable = isAvailable
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}
