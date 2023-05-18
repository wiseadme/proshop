import { Response } from 'express'
import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { Customer } from '@modules/customer/entity/customer.entity'
// Types
import { ILogger } from '@/types/utils'
import { ICustomerService } from '../types/service'
import { ICustomerRepository } from '../types/repository'
import { ICustomer } from '@ecommerce-platform/types'
import { IEventBusService } from '@/types/services'
// Helpers
import { CustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { isExpired, parseJWToken } from '@common/helpers'

@injectable()
export class CustomerService extends CustomerHelpers implements ICustomerService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.ICustomerRepository) private repository: ICustomerRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
        super()
    }

    async createCustomer(response: Response, customer: ICustomer) {
        const [found]: ICustomer[] = await this.repository.read({ phone: customer.phone })

        if (!found) {
            const created = await this.repository.create(Customer.create(customer))
            const { name, phone } = created

            this.setResponseCookie({
                key: 'secret',
                value: this.genAccessToken({ name, phone }),
                res: response,
            })

            return created
        } else {
            return await this.loginCustomer(response, customer)
        }
    }

    async whoami(cookies) {
        const auth = cookies.secret

        if (!auth || isExpired(auth)) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        const { phone } = parseJWToken(auth)
        const [user] = await this.repository.read({ phone })

        return user
    }

    async loginCustomer(response: Response, customerParams) {
        const [candidate] = await this.getCustomers(customerParams)

        const { name, phone } = candidate

        this.setResponseCookie({
            key: 'secret',
            value: this.genAccessToken({ name, phone }),
            res: response,
        })

        return candidate
    }

    async logoutCustomer(response: Response) {
        response.clearCookie('secret')
    }

    async getCustomers(params: Partial<ICustomer>): Promise<(Document & ICustomer)[]> {
        const { phone } = params

        if (phone) {
            return this.repository.read({ phone })
        }

        return this.repository.read({})
    }

    async updateCustomer(updates: Partial<ICustomer>): Promise<{ updated: Document & ICustomer }> {
        return await this.repository.update(updates)
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
