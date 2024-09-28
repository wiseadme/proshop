import { ICustomer } from '@proshop-app/types'

export class Customer implements ICustomer {
    readonly id: ICustomer['id']
    readonly name: ICustomer['name']
    readonly phone: ICustomer['phone']
    readonly networks: ICustomer['networks']

    constructor({
        id = '',
        name,
        phone,
        networks = {}
    }) {
        this.id = id
        this.name = name
        this.phone = phone
        this.networks = networks
    }

    static create(customer = {} as ICustomer): ICustomer {
        return new Customer(customer)
    }
}
