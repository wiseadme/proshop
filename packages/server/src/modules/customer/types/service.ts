import { Request, Response } from 'express'
import { ICustomer } from '@proshop-app/types'

export interface ICustomerService {
    getCustomerAccount(req: Request, res: Response): Promise<ICustomer>

    loginCustomer(res: Response, customerParams: Partial<ICustomer>): Promise<ICustomer>

    logoutCustomer(req: Request, res: Response): Promise<boolean>

    refreshToken(request: Request, response: Response): Promise<boolean>

    whoami(request: Request): Promise<ICustomer>

    getCustomers(queryParams: Partial<Record<keyof ICustomer, string>>): Promise<(ICustomer)[]>

    updateCustomer(updates: Partial<ICustomer>): Promise<ICustomer>

    deleteCustomer(id: string): Promise<boolean>
}
