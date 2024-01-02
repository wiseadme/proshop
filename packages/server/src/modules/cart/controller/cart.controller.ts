import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { ICartService } from '@modules/cart/types/service'
import { ICart } from '@proshop/types'
import { CARTS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class CartController extends BaseController implements IController {
    public path = CARTS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.ICartService) private service: ICartService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.createCart.bind(this))
        this.router.get('/', this.getCart.bind(this))
        this.router.patch('/', this.updateCart.bind(this))
        this.router.delete('/', this.deleteCart.bind(this))
    }

    async createCart(request: Request<{}, {}, ICart>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getCart(request: Request<{}, {}, {}, { id?: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateCart(request: Request<{}, {}, ICart>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteCart(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
