import { Request, Response, Router } from 'express'

import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'

import { BaseController } from '@common/controller/base.controller'

// Types
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { ICustomer } from '@proshop/types'
import { ICustomerService } from '../types/service'

// Schemes
import { TYPES } from '@common/schemes/di-types'
import { Document } from 'mongoose'

@injectable()
export class CustomerController extends BaseController implements IController {
    public path = '/v1/customer'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.ICustomerService) private service: ICustomerService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', expressAsyncHandler(this.getCustomers.bind(this)))
        this.router.post('/account', expressAsyncHandler(this.createCustomer.bind(this)))
        this.router.post('/login', expressAsyncHandler(this.loginCustomer.bind(this)))
        this.router.get('/whoami', expressAsyncHandler(this.whoami.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateCustomer.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteCustomer.bind(this)))
    }

    async createCustomer({ body, method }: Request<{}, {}, ICustomer>, res: Response) {
        try {
            const customer = await this.service.createCustomer(res, body)

            this.send({
                response: res,
                data: customer,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async loginCustomer({ body, method, url }: Request, res: Response) {
        try {
            const data = await this.service.loginCustomer(res, body)

            this.send({
                response: res,
                data,
                url: this.path + url,
                method,
            })
        } catch (error) {
            return this.error({
                method,
                error,
                url: this.path + url,
            })
        }
    }

    async whoami({ method, url, cookies }: Request, res: Response) {
        try {
            const data = await this.service.whoami(cookies)

            this.send({
                response: res,
                data,
                method,
                url: this.path + url,
            })
        } catch (error) {
            return this.error({
                method,
                error,
                url: this.path + url,
            })
        }
    }

    async updateCustomer({ body, method }: Request<{}, {}, Partial<ICustomer & Document>>, res: Response) {
        try {
            const { updated } = await this.service.updateCustomer(body)

            this.send({
                response: res,
                data: updated,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async getCustomers({ query, method }: Request<{}, {}, {}, Partial<ICustomer>>, res: Response) {
        try {
            const customers = await this.service.getCustomers(query)

            this.send({
                response: res,
                data: customers,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteCustomer({ query, method }: Request, res: Response) {
        try {
            await this.service.deleteCustomer(query.id as string)

            this.send({
                response: res,
                data: null,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }
}

export default CustomerController
