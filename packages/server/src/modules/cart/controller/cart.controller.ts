import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { ICartService } from '../types/service'
import { ICart } from '@proshop/types'

@injectable()
export class CartController extends BaseController implements IController {
    public path = '/api/v1/cart'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.ICartService) private service: ICartService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', expressAsyncHandler(this.createCart.bind(this)))
        this.router.get('/', expressAsyncHandler(this.getCart.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateCart.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteCart.bind(this)))
    }

    async createCart({ body, method }: Request<{}, {}, ICart>, res: Response) {
        try {
            const cart = await this.service.create(body)

            this.send({
                response: res,
                data: cart,
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

    async getCart({ query, method }: Request<{}, {}, {}, { id?: string }>, res: Response) {
        try {
            const cart = await this.service.read(query)

            this.send({
                response: res,
                data: cart,
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

    async updateCart({ body, method }: Request<{}, {}, ICart>, res: Response) {
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

    async deleteCart({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
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
