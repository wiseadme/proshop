import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer } from '@proshop-app/types'

// Helpers
import { ICustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'

export interface ICustomerPhoneService {
    getCustomerAccount(data: ICustomer): Promise<ICustomer>
}

@injectable()
export class CustomerPhoneService implements ICustomerPhoneService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CUSTOMER_IOC.ICustomerRepository) private repository: ICustomerRepository,
    ) {
    }

    async getCustomerAccount(data: ICustomer) {
        const [found]: ICustomer[] = await this.repository.find({ phone: data.phone })

        if (!found) {
            return await this.repository.create(data)
        }

        return found
    }

}
