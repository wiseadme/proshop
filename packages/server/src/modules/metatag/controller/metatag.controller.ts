import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IMetaTag } from '@proshop/types'
import { META_TAGS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class MetaTagController extends BaseController implements IController {
    public path = META_TAGS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IMetaTagService) private service: any,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.createMetaTag.bind(this))
        this.router.get('/', this.getMetaTags.bind(this))
        this.router.patch('/', this.updateMetaTag.bind(this))
        this.router.delete('/', this.deleteMetaTag.bind(this))
    }

    async createMetaTag(request: Request<{}, {}, IMetaTag>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getMetaTags(request: Request<{}, {}, {}, Partial<IMetaTag>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateMetaTag(request: Request<{}, {}, IMetaTag>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteMetaTag(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
