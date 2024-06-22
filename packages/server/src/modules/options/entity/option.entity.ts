import { IOption } from '@proshop/types'

export class Option implements IOption {
    readonly id: string
    readonly groupId: string
    readonly value: string
    readonly order?: number
    readonly isAvailable: boolean
    readonly productName: string
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
        this.isAvailable = isAvailable
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}
