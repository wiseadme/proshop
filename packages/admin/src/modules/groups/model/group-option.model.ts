import { IGroupOption } from '@proshop/types'

export class GroupOption implements IGroupOption {
    public value: string
    public productName: string
    public image: string
    public url: string
    public quantity: number

    constructor({
        value = '',
        productName = '',
        image = '',
        url = '',
        quantity = 0,
    }) {
        this.value = value
        this.productName = productName
        this.image = image
        this.url = url
        this.quantity = quantity
    }

    static create(option = {}) {
        return new GroupOption(option)
    }
}
