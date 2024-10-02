import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { CUSTOMER_IOC } from '@modules/customer/di/di.types'
import { CustomerController } from '@modules/customer/controller/customer.controller'
import { CustomerService } from '@modules/customer/service/customer.service'
import { CustomerRepository } from '@modules/customer/repository/customer.repository'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomerService } from '@modules/customer/types/service'
import { type ICustomerHelpers, CustomerHelpers } from '@modules/customer/helpers/customer.helpers'
import { type ICustomerPhoneService, CustomerPhoneService} from '@modules/customer/service/customer.phone.service'
import { ICustomerTelegramService, CustomerTelegramService } from '@modules/customer/service/customer.telegram.service'

export class CustomerDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(CustomerController)
        this.#container.bind<ICustomerService>(CUSTOMER_IOC.ICustomerService).to(CustomerService)
        this.#container.bind<ICustomerRepository>(CUSTOMER_IOC.ICustomerRepository).to(CustomerRepository)
        this.#container.bind<ICustomerTelegramService>(CUSTOMER_IOC.ICustomerTelegramService).to(CustomerTelegramService)
        this.#container.bind<ICustomerPhoneService>(CUSTOMER_IOC.ICustomerPhoneService).to(CustomerPhoneService)
        this.#container.bind<ICustomerHelpers>(CUSTOMER_IOC.ICustomerHelpers).to(CustomerHelpers)
    }
}


