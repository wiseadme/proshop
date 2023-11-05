import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFavoritesService } from '@modules/favorites/types/service'

@injectable()
export class FavoritesController extends BaseController implements IController {
    public path = '/api/v1/favorites'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IFavoritesService) private service: IFavoritesService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.addToFavorite.bind(this))
        this.router.get('/', this.getFavorites.bind(this))
        this.router.delete('/', this.deleteFavorite.bind(this))
    }

    async addToFavorite(request: Request<{}, {}, { sku: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.addToFavorites({
                cookies: request.cookies,
                ...request.body,
            })

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getFavorites(request: Request<{}, {}, { userId: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getFavorites(request.cookies)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteFavorite(request: Request<{}, {}, {}, { sku: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteFavorite({
                sku: request.query.sku,
                cookies: request.cookies
            })

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
