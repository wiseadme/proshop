import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
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
        const [found]: ICustomer[] = await this.repository.find({ phone: customer.phone })

        if (!found) {
            const created = await this.repository.create(Customer.create(customer))
            const { name, phone, id } = created

            const { accessToken, refreshToken } = this.generateTokens({ name, phone, id })

            this.setResponseCookie({
                key: CUSTOMER_TOKEN_KEY,
                value: accessToken,
                res: response,
            })

            await this.repository.update({
                id: customer.id,
                refreshToken,
            } as any)

            return created
        } else {
            return await this.loginCustomer(response, customer)
        }
    }

    async refreshToken(request: Request) {
        const [customer] = await this.repository.find({
            id: this.getUserIdFromToken(request.cookies[CUSTOMER_TOKEN_KEY]),
        })

        if (customer && !this.isExpired(customer.phone)) {

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
        const [ user ] = await this.repository.find({ phone })

        return user
    }

    async loginCustomer(response: Response, customerParams) {
        const [candidate] = await this.getCustomers(customerParams)

        const { name, phone, id } = candidate

        const { accessToken, refreshToken } = this.generateTokens({ name, phone, id })

        this.setResponseCookie({
            key: CUSTOMER_TOKEN_KEY,
            value: accessToken,
            res: response,
        })

        await this.repository.update({
            id: candidate.id,
            refreshToken,
        } as any)

        return candidate
    }

    async logoutCustomer(request: Request, response: Response) {
        const [customer] = await this.repository.update({
            id: this.getUserIdFromToken(request.cookies[CUSTOMER_TOKEN_KEY]),
            refreshToken: null
        } as any)

        response.clearCookie(CUSTOMER_TOKEN_KEY)
    }

    async getCustomers(params: Partial<ICustomer>): Promise<(ICustomer)[]> {
        const { phone } = params

        if (phone) {
            return this.repository.find({ phone })
        }

        return this.repository.find({})
    }

    async updateCustomer(updates: Partial<ICustomer>): Promise<ICustomer> {
        return await this.repository.update(updates)
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
