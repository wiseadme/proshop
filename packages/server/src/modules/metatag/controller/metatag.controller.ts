import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IMetaTag } from '@proshop-app/types'
import { META_TAGS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { META_TAG_IOC } from '@modules/metatag/di/di.types'

@injectable()
export class MetaTagController extends BaseController implements IController {
    public path = META_TAGS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(META_TAG_IOC.IMetaTagService) private service: any,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'] }), this.createMetaTag.bind(this))
        this.router.get('/', setMiddlewares({ roles: ['root', 'user', 'readonly'] }), this.getMetaTags.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateMetaTag.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteMetaTag.bind(this))
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
