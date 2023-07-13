import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IMetaTag } from '@proshop/types'

@injectable()
export class MetaTagController extends BaseController implements IController {
    public path = '/api/v1/metatag'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IMetaTagService) private service: any,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', expressAsyncHandler(this.createMetaTag.bind(this)))
        this.router.get('/', expressAsyncHandler(this.getMetaTags.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateMetaTag.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteMetaTag.bind(this)))
    }

    async createMetaTag({ body, method }: Request<{}, {}, IMetaTag>, res: Response) {
        try {
            const order = await this.service.create(body)

            this.send({
                response: res,
                data: order,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async getMetaTags({ query, method }: Request<{}, {}, {}, Partial<IMetaTag>>, res: Response) {
        try {
            const orders = await this.service.read(query)

            this.send({
                response: res,
                data: orders,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async updateMetaTag({ body, method }: Request<{}, {}, IMetaTag & Document>, res: Response) {
        try {
            const { updated } = await this.service.update(body)

            this.send({
                response: res,
                data: updated,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteMetaTag({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
        try {
            await this.service.delete(query.id)
            this.send({
                response: res,
                data: null,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }
}
