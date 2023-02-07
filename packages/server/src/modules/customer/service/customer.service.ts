import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { Customer } from '@modules/customer/entity/customer.entity'
// Types
import { ILogger } from '@/types/utils'
import { ICustomerService } from '../types/service'
import { ICustomerRepository } from '../types/repository'
import { ICustomer, Maybe } from '@ecommerce-platform/types'
import { IEventBusService } from '@/types/services'
import { DELETE_CART_EVENT } from '@common/constants/events'


@injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ICartRepository) private repository: ICustomerRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ) {
  }

  async create(customer: ICustomer) {
    const found: Maybe<ICustomer[]> = await this.repository.read({ phone: customer.phone })

    /***
     * TODO - replace it with cookies checking or sending sms
     */
    if (found && found.length) {
      return this.read({ phone: customer.phone })
    }

    return await this.repository.create(Customer.create(customer))
  }

  async read(params: Partial<ICustomer>): Promise<(Document & ICustomer)[]> {
    return await this.repository.read(params)
  }

  async update(updates: Partial<ICustomer>): Promise<{ updated: Document & ICustomer }> {
    return await this.repository.update(updates)
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id)
  }
}
