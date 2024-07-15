import { inject, injectable } from 'inversify'
// Types
import { NextFunction, Request, Response, Router } from 'express'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@proshop-app/types'
import { IVariantService } from '@modules/variant/types/service'
import { VARIANTS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class VariantController extends BaseController implements IController {
    public path = VARIANTS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IVariantService) private service: IVariantService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.createVariant.bind(this))
        this.router.get('/', this.getVariants.bind(this))
        this.router.patch('/', this.updateVariant.bind(this))
        this.router.delete('/', this.deleteVariant.bind(this))
    }

    async createVariant(request: Request<{}, {}, IVariant>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getVariants(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read()

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateVariant(request: Request<{}, {}, Partial<IVariant>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteVariant(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
