import { Request, Response, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { TYPES } from '@common/schemes/di-types'
import { IMerchantService } from '@modules/settings/types/service'
import { IMerchant } from '@ecommerce-platform/types'

@injectable()
export class SettingsController extends BaseController implements IController {
  public path = '/v1/settings'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IMerchantService) private merchantService: IMerchantService
  ) {
    super()
    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', expressAsyncHandler(this.getSettings.bind(this)))
    this.router.post('/merchant', expressAsyncHandler(this.createMerchant.bind(this)))
    this.router.get('/merchant', expressAsyncHandler(this.getMerchant.bind(this)))
    this.router.patch('/merchant', expressAsyncHandler(this.updateMerchant.bind(this)))
    this.router.delete('/merchant', expressAsyncHandler(this.deleteMerchant.bind(this)))
  }

  async getSettings(req: Request, res: Response) {
    try {
      return this.getMerchant(req, res)
    } catch (error) {

    }
  }

  async createMerchant({ body, method, url }: Request<{}, {}, IMerchant>, res: Response) {
    try {
      const merchant = await this.merchantService.create(body)

      this.send({
        response: res,
        data: merchant,
        url: this.path + url,
        method
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }

  async getMerchant({ method, url }: Request<{}, {}, {}, Partial<IMerchant>>, res: Response) {
    try {
      const [merchant] = await this.merchantService.read()

      this.send({
        response: res,
        data: merchant,
        url: this.path + url,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path + url,
        method
      })
    }
  }

  async updateMerchant({ body, method, url }: Request<{}, {}, Partial<IMerchant>>, res: Response) {
    try {
      const { updated } = await this.merchantService.update(body)

      this.send({
        response: res,
        data: updated,
        url: this.path + url,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path + url,
        method
      })
    }
  }

  async deleteMerchant({ query, method, url }: Request<{}, {}, {}, { id: string }>, res: Response) {
    try {
      await this.merchantService.delete(query.id)

      this.send({
        response: res,
        data: null,
        url: this.path + url,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path + url,
        method
      })
    }
  }
}
