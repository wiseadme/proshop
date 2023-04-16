import { Router, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { ICurrencyService } from '@modules/currency/types/service'
import { ICurrency } from '@ecommerce-platform/types'

@injectable()
export class CurrencyController extends BaseController implements IController {
  public path = '/v1/currency'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.ICurrencyService) private service: ICurrencyService
  ) {
    super()
    this.initRoutes()
  }

  initRoutes() {
    this.router.post('/', expressAsyncHandler(this.create.bind(this)))
  }

  async create({ body, method }: Request<{}, {}, ICurrency>, res: Response) {
    try {
      const currency = await this.service.create(body)

      this.send({
        response: res,
        data: currency,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async read({ query, method }: Request<{}, {}, {}, Partial<ICurrency>>, res: Response) {
    try {
      const currencies = await this.service.read(query)

      this.send({
        response: res,
        data: currencies,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async update({ body, method }: Request<{}, {}, Partial<ICurrency>>, res: Response) {
    try {
      const { updated } = await this.service.update(body)

      this.send({
        response: res,
        data: updated,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async delete({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
    try {
      await this.service.delete(query.id)

      this.send({
        response: res,
        data: null,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }
}
