import { ICustomer } from '@proshop-app/types'

export interface ICustomerRepository {
    create(customer: ICustomer): Promise<ICustomer>

    read(params: Partial<ICustomer>): Promise<ICustomer[]>

    update(updates: Partial<ICustomer>): Promise<ICustomer>

    delete(id: string): Promise<boolean>
}
