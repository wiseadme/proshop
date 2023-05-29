import { ICustomer } from '@proshop/types'

export class Customer implements ICustomer {
    public _id: string
    private _name: string
    private _phone: string

    constructor({
        _id = '',
        name,
        phone,
    }) {
        this._id = _id
        this._name = name
        this._phone = phone
    }

    get name() {
        return this._name
    }

    get phone() {
        return this._phone
    }

    static create(customer) {
        return new Customer(customer)
    }
}
