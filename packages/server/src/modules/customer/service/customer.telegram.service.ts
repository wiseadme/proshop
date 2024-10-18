import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IConfig } from '@/types'
import bcrypt from 'bcryptjs'
import { ICustomer } from '@proshop-app/types'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { IBotService } from '@common/services/bot.service'
import { ICustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { CUSTOMER_TOKEN_KEY } from '@common/constants/cookie-keys'
import { Response } from 'express'

export interface ICustomerTelegramService {
    getCustomerAccount(data: Partial<ICustomer>): Promise<ICustomer>

    loginCustomer(response: Response, customer: ICustomer): Promise<ICustomer>
}

@injectable()
export class CustomerTelegramService implements ICustomerTelegramService {
    constructor(
        @inject(TYPES.CONFIG) private config: IConfig,
        @inject(CUSTOMER_IOC.ICustomerRepository) private repository: ICustomerRepository,
        @inject(CUSTOMER_IOC.ICustomerHelpers) private helpers: ICustomerHelpers,
        @inject(TYPES.SERVICES.IBotService) private botService: IBotService,
    ) {
    }

    async getCustomerAccount(data: ICustomer): Promise<ICustomer> {
        const [found]: ICustomer[] = await this.repository.find({
            'networks.telegram.username': data.networks!.telegram!.username
        })

        if (!found) {
            return await this.repository.create(data)
        }

        return found
    }

    async loginCustomer(response: Response, customer: ICustomer): Promise<ICustomer> {
        const { id } = customer

        const { accessToken, refreshToken } = this.helpers.generateTokens({ id })

        this.helpers.setResponseCookie({
            key: CUSTOMER_TOKEN_KEY,
            value: accessToken,
            res: response,
        })

        const { networks, name, phone, photoUrl } = await this.repository.update({ id, refreshToken })
        await this.onLoginSuccess(customer)

        return { id, networks, name, phone, photoUrl }
    }

    async onLoginSuccess(customer: ICustomer): Promise<boolean> {
        return this.botService.sendMessage({
            userId: customer.networks!.telegram!.userId,
            message: `${customer.name} Добро пожаловать в наш магазин`
        })
    }
}
