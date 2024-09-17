import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { Customer } from '@modules/customer/entity/customer.entity'
// Types
import { ILogger } from '@/types/utils'
import { ICustomerService } from '@modules/customer/types/service'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer } from '@proshop-app/types'
import { IEventBusService } from '@/types/services'
// Helpers
import { CustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { isExpired, parseJWToken } from '@common/helpers'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'
import { CUSTOMER_TOKEN_KEY } from '@common/constants/cookie-keys'

@injectable()
export class CustomerService extends CustomerHelpers implements ICustomerService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CUSTOMER_IOC.ICustomerRepository) private repository: ICustomerRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
        super()
    }

    async createCustomer(response: Response, customer: ICustomer) {
        const [found]: ICustomer[] = await this.repository.read({ phone: customer.phone })

        if (!found) {
            const created = await this.repository.create(Customer.create(customer))
            const { name, phone, id } = created

            this.setResponseCookie({
                key: CUSTOMER_TOKEN_KEY,
                value: this.genAccessToken({ name, phone, id }),
                res: response,
            })

            return created
        } else {
            return await this.loginCustomer(response, customer)
        }
    }

    async whoami(request: Request) {
        const token = request.cookies[CUSTOMER_TOKEN_KEY]

        if (!token || (token && isExpired(token))) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        const { phone } = parseJWToken(token)
        const [user] = await this.repository.read({ phone })

        return user
    }

    async loginCustomer(response: Response, customerParams) {
        const [candidate] = await this.getCustomers(customerParams)

        const { name, phone, id } = candidate

        this.setResponseCookie({
            key: CUSTOMER_TOKEN_KEY,
            value: this.genAccessToken({ name, phone, id }),
            res: response,
        })

        return candidate
    }

    async logoutCustomer(response: Response) {
        response.clearCookie(CUSTOMER_TOKEN_KEY)
    }

    async getCustomers(params: Partial<ICustomer>): Promise<(ICustomer)[]> {
        const { phone } = params

        if (phone) {
            return this.repository.read({ phone })
        }

        return this.repository.read({})
    }

    async updateCustomer(updates: Partial<ICustomer>): Promise<ICustomer> {
        return await this.repository.update(updates)
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
