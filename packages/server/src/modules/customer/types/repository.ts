import { ICustomer, ICustomerMongoModel } from '@proshop-app/types'

export interface ICustomerRepository {
    create(customer: ICustomer): Promise<ICustomer>

    find(params: Record<string, any>): Promise<ICustomer[]>

    update(updates: Partial<ICustomer>): Promise<ICustomer>

    delete(id: string): Promise<boolean>
}
