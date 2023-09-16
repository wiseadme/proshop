export interface ICustomer {
    id: string
    name: string
    phone: string
}

export interface ICustomerMongoModel extends Omit<ICustomer, 'id'> {
    _id: string
}
