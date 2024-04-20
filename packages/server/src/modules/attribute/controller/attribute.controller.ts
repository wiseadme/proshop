
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
import { ATTRIBUTES_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { ATTRIBUTE_IOC } from '@modules/attribute/di/di.types'

@injectable()
export class AttributeController extends BaseController implements IController {
    public path = ATTRIBUTES_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ATTRIBUTE_IOC.IAttributeService) private service: IAttributeService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'], dto: AttributeDTO }), this.createAttribute.bind(this))
        this.router.get('/', setMiddlewares({ roles: ['root', 'user', 'readonly'] }), this.getAttribute.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateAttributes.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteAttribute.bind(this))
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
