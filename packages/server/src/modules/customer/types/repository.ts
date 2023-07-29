import { ICustomer } from '@proshop/types'

export interface ICustomerRepository {
    create(customer: ICustomer): Promise<ICustomer>

    read(params: Partial<ICustomer>): Promise<ICustomer[]>

    update(updates: Partial<ICustomer>): Promise<{ updated: ICustomer }>

    delete(id: string): Promise<boolean>
}
