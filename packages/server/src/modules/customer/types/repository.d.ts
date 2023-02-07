import { ICustomer } from '@ecommerce-platform/types'
import { Document } from 'mongoose'

export interface ICustomerRepository {
  create(customer: ICustomer): Promise<ICustomer & Document>

  read(params: Partial<ICustomer>): Promise<(ICustomer & Document)[]>

  update(updates: Partial<ICustomer>): Promise<{ updated: ICustomer & Document }>

  delete(id: string): Promise<boolean>
}
