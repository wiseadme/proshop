import { IOption } from '@proshop/types'

export class Option implements IOption {
    public id: string
    public groupId: string
    public value: string
    public productName: string
    public productId: string
    public description: string
    public image: string
    public url: string
    public order: number
    public isAvailable: boolean

    constructor({
        id = '',
        groupId = '',
        value = '',
        productName = '',
        productId = '',
        description = '',
        image = '',
        url = '',
        isAvailable = true,
        order = 0,
    }) {
        this.id = id
        this.groupId = groupId
        this.value = value
        this.productName = productName
        this.productId = productId
        this.image = image
        this.url = url
        this.isAvailable = isAvailable
        this.description = description
        this.order = order
    }

    static create(option = {}) {
        return new Option(option)
    }
}
