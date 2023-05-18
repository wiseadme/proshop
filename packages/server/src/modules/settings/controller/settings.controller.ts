import { Request, Response, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { TYPES } from '@common/schemes/di-types'
import { IMerchantService, ISettingsService } from '@modules/settings/types/service'
import { IMerchant } from '@ecommerce-platform/types'

@injectable()
export class SettingsController extends BaseController implements IController {
    public path = '/v1/settings'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IMerchantService) private merchantService: IMerchantService,
        @inject(TYPES.SERVICES.ISettingsService) private settingsService: ISettingsService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.get('/', expressAsyncHandler(this.getSettings.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteSettings.bind(this)))
        this.router.post('/merchant', expressAsyncHandler(this.createMerchant.bind(this)))
        this.router.get('/merchant', expressAsyncHandler(this.getMerchant.bind(this)))
        this.router.patch('/merchant', expressAsyncHandler(this.updateMerchant.bind(this)))
        this.router.delete('/merchant', expressAsyncHandler(this.deleteMerchant.bind(this)))
    }

    async getSettings({ method }: Request, res: Response) {
        try {
            const settings = await this.settingsService.read()

            this.send({
                response: res,
                data: settings,
                url: this.path,
                method,
            })
        } catch (error) {
            return this.error({
                method,
                error,
                url: this.path,
            })
        }
    }

    async deleteSettings(req: Request, res: Response) {

    }

    async createMerchant({ body, method, url }: Request<{}, {}, IMerchant>, res: Response) {
        try {
            const merchant = await this.merchantService.create(body)

            const settings = await this.settingsService.read()

            if (!settings) {
                await this.settingsService.create({ merchant: merchant._id })
            } else {
                await this.settingsService.update({ merchant: merchant._id })
            }

            this.send({
                response: res,
                data: merchant,
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

    async getMerchant({ method, url }: Request<{}, {}, {}, Partial<IMerchant>>, res: Response) {
        try {
            const merchant = await this.merchantService.read()

            this.send({
                response: res,
                data: merchant,
                url: this.path + url,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path + url,
                method,
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
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path + url,
                method,
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
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path + url,
                method,
            })
        }
    }
}
