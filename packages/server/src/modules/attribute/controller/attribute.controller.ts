
import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAttributeService } from '../types/service'
import { IAttribute } from '@proshop/types'
import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { Attribute } from '@modules/attribute/entity/attribute.entity'
import { AttributeDTO } from '@modules/attribute/dto/attribute.dto'

@injectable()
export class AttributeController extends BaseController implements IController {
    public path = '/api/v1/attribute'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IAttributeService) private service: IAttributeService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', new ValidateMiddleware(AttributeDTO).execute(), this.createAttribute.bind(this))
        this.router.get('/', this.getAttribute.bind(this))
        this.router.patch('/', this.updateAttributes.bind(this))
        this.router.delete('/', this.deleteAttribute.bind(this))
    }

    async createAttribute(request: Request<{}, {}, IAttribute>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(Attribute.create(request.body))

            this.send({ data, request, response })
        } catch (error) {
            return this.error({ error, request, next })
        }
    }

    async getAttribute(request: Request<{}, {}, {}, { id?: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read(request.query?.id)

            this.send({ data, request, response })
        } catch (error) {
            return this.error({ error, request, next })
        }
    }

    async updateAttributes(request: Request<{}, {}, IAttribute>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteAttribute(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            return this.error({ error, request, next })
        }
    }
}
