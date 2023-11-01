
import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFavoriteService } from '@modules/favorites/types/service'
import { IFavorite } from '@proshop/types'
import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { Attribute } from '@modules/attribute/entity/attribute.entity'
import { AttributeDTO } from '@modules/attribute/dto/attribute.dto'
import { IAttributeService } from '@modules/attribute/types/service'

@injectable()
export class FavoritesController extends BaseController implements IController {
    public path = '/api/v1/favorites'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IAttributeService) private service: IFavoriteService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.addToFavorite.bind(this))
    }

    async addToFavorite(request: Request<{}, {}, IFavorite>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.addToFavorites(Attribute.create(request.body))

            this.send({ data, request, response })
        } catch (error) {
            return this.error({ error, request, next })
        }
    }
}
