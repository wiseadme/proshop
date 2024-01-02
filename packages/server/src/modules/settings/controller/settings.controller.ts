import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { TYPES } from '@common/schemes/di-types'
import { IMerchantService, ISettingsService, ISiteService } from '@modules/settings/types/service'
import { IMerchant, ISite } from '@proshop/types'
import { SETTINGS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'

@injectable()
export class SettingsController extends BaseController implements IController {
    public path = SETTINGS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IMerchantService) private merchantService: IMerchantService,
        @inject(TYPES.SERVICES.ISiteService) private siteService: ISiteService,
        @inject(TYPES.SERVICES.ISettingsService) private settingsService: ISettingsService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.get('/', this.getSettings.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteSettings.bind(this))
        this.router.post('/merchant', setMiddlewares({ roles: ['root'] }), this.createMerchant.bind(this))
        this.router.get('/merchant', this.getMerchant.bind(this))
        this.router.patch('/merchant', setMiddlewares({ roles: ['root'] }), this.updateMerchant.bind(this))
        this.router.delete('/merchant', setMiddlewares({ roles: ['root'] }), this.deleteMerchant.bind(this))
        this.router.post('/site', setMiddlewares({ roles: ['root'] }), this.createSite.bind(this))
        this.router.get('/site', this.getSite.bind(this))
        this.router.patch('/site', setMiddlewares({ roles: ['root'] }), this.updateSite.bind(this))
    }

    async getSettings(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.settingsService.read()

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteSettings(req: Request, res: Response) {

    }

    async createMerchant(request: Request<{}, {}, IMerchant>, response: Response, next: NextFunction) {
        try {
            const data = await this.merchantService.create(request.body)
            const settings = await this.settingsService.read()

            if (!settings) {
                await this.settingsService.create({ merchant: data })
            } else {
                await this.settingsService.update({ id: settings.id, merchant: data })
            }

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getMerchant(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.merchantService.read()

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateMerchant(request: Request<{}, {}, Partial<IMerchant>>, response: Response, next: NextFunction) {
        try {
            const data = await this.merchantService.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteMerchant(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.merchantService.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async createSite(request: Request<{}, {}, ISite>, response: Response, next: NextFunction) {
        try {
            const data = await this.siteService.create(request.body)

            const settings = await this.settingsService.read()

            if (!settings) {
                await this.settingsService.create({ site: data })
            } else {
                await this.settingsService.update({ id: settings.id, site: data })
            }

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getSite(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.siteService.read()

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateSite(request: Request<{}, {}, Partial<ISite>>, response: Response, next: NextFunction) {
        try {
            const data = await this.siteService.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
