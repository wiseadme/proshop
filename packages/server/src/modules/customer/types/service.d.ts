import { Document } from 'mongoose'
import { ICustomer } from '@ecommerce-platform/types'

export interface ICustomerService {
  create(customer: ICustomer): Promise<ICustomer & Document | (ICustomer & Document)[]>

  read(queryParams: Partial<ICustomer>): Promise<(ICustomer & Document)[]>

  update(updates: Partial<ICustomer>): Promise<{ updated: ICustomer & Document }>

  delete(id: string): Promise<boolean>
}
