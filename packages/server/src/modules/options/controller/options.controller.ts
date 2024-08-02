import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOptionService } from '@modules/options/types/service'
import { IOption } from '@proshop-app/types'
import { OptionDTO } from '@modules/options/dto/option.dto'
import { OPTIONS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { OPTION_IOC } from '@modules/options/di/di.types'

@injectable()
export class OptionsController extends BaseController implements IController {
    public path = OPTIONS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(OPTION_IOC.IOptionService) private service: IOptionService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'], dto: OptionDTO }), this.createOption.bind(this))
        this.router.get('/', this.getOptions.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateOption.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteOption.bind(this))
    }

    async createOption(request: Request<{}, {}, IOption>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createOption(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getOptions(request: Request<{}, {}, {}, Partial<IOption>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.findOptions(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateOption(request: Request<{}, {}, IOption>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateOption(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteOption(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteOption(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
