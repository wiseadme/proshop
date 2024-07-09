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
import { setMiddlewares } from '@common/helpers'
import { QueueMiddleware } from '@modules/orders/middleware/queue.middleware'
import { container } from '@common/dependencies'
import { ORDER_IOC } from '@modules/orders/di/di.types'


@injectable()
export class OrdersController extends BaseController implements IController {
    public path = ORDERS_MODULE_PATH
    public router = Router()
    public middlewares: Record<string, any> = {}

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ORDER_IOC.IOrdersService) private service: IOrdersService,
    ) {
        super()
        this.initMiddlewares()
        this.initRoutes()
    }

    initMiddlewares() {
        const queueMiddleware = new QueueMiddleware(container)
        this.middlewares.createOrder = [ queueMiddleware.execute.bind(queueMiddleware) ]
    }

    initRoutes() {
        this.router.post('/', this.middlewares.createOrder, this.createOrder.bind(this))
        this.router.get('/', this.getOrders.bind(this))
        this.router.patch('/', setMiddlewares({ roles: [ 'root' ] }), this.updateOrder.bind(this))
        this.router.delete('/', setMiddlewares({ roles: [ 'root' ] }), this.deleteOrder.bind(this))
    }

    async createOrder(request: Request<{}, {}, IOrder>, response: Response, next: NextFunction) {

        try {
            const data = await this.service.processOrder(request)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getOrders(request: Request<{}, {}, {}, Partial<IOrder>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getOrders(request.query)
            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateOrder(request: Request<{}, {}, IOrder>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateOrder(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteOrder(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteOrder(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
