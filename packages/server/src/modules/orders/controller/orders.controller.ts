import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOrdersService } from '../types/service'
import { IOrder } from '@proshop/types'
import { ORDERS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class OrdersController extends BaseController implements IController {
    public path = ORDERS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IOrdersService) private service: IOrdersService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.createOrder.bind(this))
        this.router.get('/', this.getOrders.bind(this))
        this.router.patch('/', this.updateOrder.bind(this))
        this.router.delete('/', this.deleteOrder.bind(this))
    }

    async createOrder(request: Request<{}, {}, IOrder>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getOrders(request: Request<{}, {}, {}, Partial<IOrder>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateOrder(request: Request<{}, {}, IOrder>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteOrder(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
