import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { ICustomerService } from '@modules/customer/types/service'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer, Maybe } from '@proshop-app/types'

// Helpers
import { ICustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { isExpired, parseJWToken } from '@common/helpers'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'
import { CUSTOMER_TOKEN_KEY } from '@common/constants/cookie-keys'
import { type ICustomerTelegramService } from '@modules/customer/service/customer.telegram.service'
import { type ICustomerPhoneService } from '@modules/customer/service/customer.phone.service'
import { Customer } from '@modules/customer/entity/customer.entity'

@injectable()
export class CustomerService implements ICustomerService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CUSTOMER_IOC.ICustomerRepository) private repository: ICustomerRepository,
        @inject(CUSTOMER_IOC.ICustomerHelpers) private helpers: ICustomerHelpers,
        @inject(CUSTOMER_IOC.ICustomerTelegramService) private telegramService: ICustomerTelegramService,
        @inject(CUSTOMER_IOC.ICustomerPhoneService) private phoneService: ICustomerPhoneService
    ) {
    }

    async createCustomer(request: Request, response: Response) {
        let customer: ICustomer = Customer.create(request.body)

        if (request.cookies.telegramLogin) {
            customer = await this.telegramService.getCustomerAccount(customer)
        } else {
            customer = await this.phoneService.getCustomerAccount(customer)
        }

        return await this.loginCustomer(response, customer)
    }

    async refreshToken(request: Request, response: Response) {
        const [{ name, phone, id, refreshToken }] = await this.repository.find({
            id: this.helpers.getUserIdFromToken(request.cookies[CUSTOMER_TOKEN_KEY]),
        })

        if (refreshToken && !this.helpers.isExpired(refreshToken!)) {
            const { accessToken, refreshToken } = this.helpers.generateTokens({ name, phone, id })

            await this.repository.update({ id, refreshToken })

            this.helpers.setResponseCookie({
                key: CUSTOMER_TOKEN_KEY,
                value: accessToken,
                res: response,
            })

            return true
        } else {
            await this.logoutCustomer(request, response)

            return false
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

        const { id } = parseJWToken(token)
        const [user] = await this.repository.find({ id })

        return user
    }

    async loginCustomer(response: Response, customer: ICustomer) {
        const { id } = customer

        const { accessToken, refreshToken } = this.helpers.generateTokens({ id })

        this.helpers.setResponseCookie({
            key: CUSTOMER_TOKEN_KEY,
            value: accessToken,
            res: response,
        })

        await this.repository.update({ id, refreshToken })

        return customer
    }

    async logoutCustomer(request: Request, response: Response) {
        await this.repository.update({
            id: this.helpers.getUserIdFromToken(request.cookies[CUSTOMER_TOKEN_KEY]),
            refreshToken: undefined
        })

        response.clearCookie(CUSTOMER_TOKEN_KEY)
    }

    async getCustomers(params = {} as Partial<Record<keyof ICustomer, string>>): Promise<(ICustomer)[]> {
        return this.repository.find(params)
    }

    async updateCustomer(updates: Partial<ICustomer>): Promise<ICustomer> {
        return await this.repository.update(updates)
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
