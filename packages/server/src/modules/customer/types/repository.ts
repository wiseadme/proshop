import { ICustomer } from '@proshop-app/types'

export interface ICustomerRepository {
    create(customer: ICustomer): Promise<ICustomer>

    find(params: Partial<ICustomer>): Promise<ICustomer[]>

    update(updates: Partial<ICustomer>): Promise<ICustomer>

    delete(id: string): Promise<boolean>
}
