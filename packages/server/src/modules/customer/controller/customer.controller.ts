import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'

// Types
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { ICustomer } from '@proshop/types'
import { ICustomerService } from '../types/service'

// Schemes
import { TYPES } from '@common/schemes/di-types'
import { CUSTOMERS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class CustomerController extends BaseController implements IController {
    public path = CUSTOMERS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.ICustomerService) private service: ICustomerService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.getCustomers.bind(this))
        this.router.post('/account', this.createCustomer.bind(this))
        this.router.post('/login', this.loginCustomer.bind(this))
        this.router.get('/whoami', this.whoami.bind(this))
        this.router.patch('/', this.updateCustomer.bind(this))
        this.router.delete('/', this.deleteCustomer.bind(this))
    }

    async createCustomer(request: Request<{}, {}, ICustomer>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createCustomer(response, request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async loginCustomer(request: Request<{}, {}, Partial<ICustomer>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.loginCustomer(response, request.body as any)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async whoami(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.whoami(request.cookies)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateCustomer(request: Request<{}, {}, Partial<ICustomer>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateCustomer(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getCustomers(request: Request<{}, {}, {}, Partial<ICustomer>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getCustomers(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteCustomer(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteCustomer(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
