import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOptionService } from '../types/service'
import { IOption } from '@proshop/types'
import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { OptionDTO } from '@modules/options/dto/option.dto'
import { OPTIONS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'

@injectable()
export class OptionsController extends BaseController implements IController {
    public path = OPTIONS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IOptionService) private service: IOptionService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'], dto: OptionDTO }), this.createOption.bind(this))
        this.router.get('/', setMiddlewares({ roles: ['root', 'user', 'readonly'] }), this.getOptions.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateOption.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteOption.bind(this))
    }

    async createOption(request: Request<{}, {}, IOption>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getOptions(request: Request<{}, {}, {}, { id?: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.find(request.query?.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateOption(request: Request<{}, {}, IOption>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteOption(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
