import { Router, Request, Response } from 'express'

import expressAsyncHandler from 'express-async-handler'
import { injectable, inject } from 'inversify'

import { BaseController } from '@common/controller/base.controller'

// Types
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { ICustomer } from '@ecommerce-platform/types'
import { ICustomerService } from '../types/service'

// Schemes
import { TYPES } from '@common/schemes/di-types'
import { Document } from 'mongoose'

@injectable()
export class CustomerController extends BaseController implements IController {
  public path = '/v1/customers'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.ICategoryService) private service: ICustomerService,
  ) {
    super()
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', expressAsyncHandler(this.getCustomers.bind(this)))
    this.router.post('/', expressAsyncHandler(this.createCustomer.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateCustomer.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteCustomer.bind(this)))
  }

  async createCustomer({ body, method }: Request<{}, {}, ICustomer>, res: Response) {
    try {
      const category = await this.service.create(body)

      this.send({
        response: res,
        data: category,
        url: this.path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async updateCustomer({ body, method }: Request<{}, {}, Partial<ICustomer & Document>>, res: Response) {
    try {
      const { updated } = await this.service.update(body)

      this.send({
        response: res,
        data: updated,
        url: this.path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async getCustomers({ query, method }: Request<{}, {}, {}, Partial<ICustomer>>, res: Response) {
    try {
      const categories = await this.service.read(query)

      this.send({
        response: res,
        data: categories,
        url: this.path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async deleteCustomer({ query, method }: Request, res: Response) {
    try {
      await this.service.delete(query.id as string)

      this.send({
        response: res,
        data: null,
        url: this.path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }
}

export default CustomerController
