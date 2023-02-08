import { Document } from 'mongoose'
import { Response } from 'express'
import { ICustomer } from '@ecommerce-platform/types'

export interface ICustomerService {
  createCustomer(res: Response, customer: ICustomer): Promise<ICustomer & Document>

  loginCustomer(res: Response, customerParams: { phone: string })

  whoami(cookies: Record<string, any>): Promise<ICustomer & Document>

  getCustomers(queryParams: Partial<ICustomer>): Promise<(ICustomer & Document)[]>

  updateCustomer(updates: Partial<ICustomer>): Promise<{ updated: ICustomer & Document }>

  deleteCustomer(id: string): Promise<boolean>
}
