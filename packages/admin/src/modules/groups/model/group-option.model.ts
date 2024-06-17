import { IGroupOption } from '@proshop/types'

export class GroupOption implements IGroupOption {
    public value: string
    public productName: string
    public description: string
    public image: string
    public url: string
    public isAvailable: boolean

    constructor({
        value = '',
        productName = '',
        description = '',
        image = '',
        url = '',
        isAvailable = true,
    }) {
        this.value = value
        this.productName = productName
        this.image = image
        this.url = url
        this.isAvailable = isAvailable
        this.description = description
    }

    static create(option = {}) {
        return new GroupOption(option)
    }
}
