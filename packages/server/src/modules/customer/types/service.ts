import { Document } from 'mongoose'
import { Response } from 'express'
import { ICustomer } from '@proshop/types'

export interface ICustomerService {
  createCustomer(res: Response, customer: ICustomer): Promise<ICustomer>

  loginCustomer(res: Response, customerParams: { phone: string })

  whoami(cookies: Record<string, any>): Promise<ICustomer>

  getCustomers(queryParams: Partial<ICustomer>): Promise<(ICustomer)[]>

  updateCustomer(updates: Partial<ICustomer>): Promise<{ updated: ICustomer }>

  deleteCustomer(id: string): Promise<boolean>
}
