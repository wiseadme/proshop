import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IConfig } from '@/types'
import bcrypt from 'bcryptjs'
import { ICustomer } from '@proshop-app/types'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'
import { ICustomerRepository } from '@modules/customer/types/repository'

export interface ICandidate {
    phone: string
}

export interface ICustomerTelegramService {
    getCustomerAccount(data: Partial<ICustomer>): Promise<ICustomer>

    sendCandidate(candidate: ICandidate): Promise<boolean>

    checkCode(code: string): Promise<boolean>
}

@injectable()
export class CustomerTelegramService implements ICustomerTelegramService {
    constructor(
        @inject(TYPES.CONFIG) private config: IConfig,
        @inject(CUSTOMER_IOC.ICustomerRepository) private repository: ICustomerRepository,
    ) {
    }

    async getCustomerAccount(data: ICustomer): Promise<ICustomer> {
        const [found]: ICustomer[] = await this.repository.find({
            'networks.telegram.username': data.networks!.telegram!.username
        })

        console.log('found', found)

        if (!found) {
            return await this.repository.create(data)
        }

        return found
    }

    async getCustomer(data: ICustomer): Promise<ICustomer> {
        const [found]: ICustomer[] = await this.repository.find({
            'networks.telegram.username': data.networks!.telegram!.username
        })

        return found
    }

    async sendCandidate(candidate: Record<string, any>): Promise<boolean> {
        try {
            const response = await fetch(`${this.config.telegramBotUrl}/api/v1/candidate`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candidate),
            })

            console.log(response)

            // bcrypt.sha256()

            return true
        } catch (err) {
            return false
        }
    }

    async checkCode(code: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.config.telegramBotUrl}/api/v1/check`, {
                method: 'POST',
                body: JSON.stringify({ code })
            })

            console.log(response)

            return true
        } catch (err) {
            return false
        }
    }
}
