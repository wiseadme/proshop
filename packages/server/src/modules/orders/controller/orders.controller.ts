import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOrdersService } from '@modules/orders/types/service'
import { IOrder } from '@proshop-app/types'
import { ORDERS_MODULE_PATH } from '@common/constants/paths'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { IOrdersMiddlewares } from '@modules/orders/middleware/middlewares'

@injectable()
export class OrdersController extends BaseController implements IController {
    public path = ORDERS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ORDER_IOC.IOrdersService) private service: IOrdersService,
        @inject(ORDER_IOC.IOrdersMiddlewares) private middlewares: IOrdersMiddlewares,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.get('/', this.middlewares.getFindOrdersMiddlewares(), this.getOrders.bind(this))
        this.router.post('/', this.middlewares.getCreateOrderMiddlewares(), this.createOrder.bind(this))
        this.router.get('/disband', this.middlewares.getDisbandOrderMiddlewares(), this.disbandOrder.bind(this))
        this.router.patch('/', this.middlewares.getUpdateOrderMiddlewares(), this.updateOrder.bind(this))
        this.router.delete('/', this.middlewares.getDeleteOrderMiddlewares(), this.deleteOrder.bind(this))
    }

    async createOrder(request: Request<{}, {}, IOrder>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createOrder(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getOrders(request: Request<{}, {}, {}, Record<keyof IOrder, any>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getOrders(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateOrder(request: Request<{}, {}, Partial<IOrder>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateOrder(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async disbandOrder(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.disbandOrder(request.query.id)

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
