import { ICustomer } from '@proshop-app/types'

export class Customer implements ICustomer {
    readonly id: ICustomer['id']
    readonly name?: ICustomer['name']
    readonly phone?: ICustomer['phone']
    readonly photoUrl?: ICustomer['photoUrl']
    readonly networks?: ICustomer['networks']

    constructor({
        id = '',
        name,
        phone,
        photoUrl = '',
        networks = {}
    }: Partial<ICustomer> = {}) {
        this.id = id
        this.name = name
        this.phone = phone
        this.photoUrl = photoUrl
        this.networks = networks
    }

    static create(customer = {} as ICustomer): ICustomer {
        return new Customer(customer)
    }
}
