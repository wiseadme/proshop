import { ICustomer } from '@proshop/types'

export class Customer implements ICustomer {
    readonly id: string
    readonly name: string
    readonly phone: string

    constructor({
        id = '',
        name,
        phone,
    }) {
        this.id = id
        this.name = name
        this.phone = phone
    }

    static create(customer) {
        return new Customer(customer)
    }
}
