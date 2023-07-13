import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IOrderService } from '../types/service'
import { IOrder } from '@proshop/types'

@injectable()
export class OrderController extends BaseController implements IController {
    public path = '/api/v1/order'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IOrderService) private service: IOrderService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', expressAsyncHandler(this.createOrder.bind(this)))
        this.router.get('/', expressAsyncHandler(this.getOrders.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateOrder.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteOrder.bind(this)))
    }

    async createOrder({ body, method }: Request<{}, {}, IOrder>, res: Response) {
        console.log(body)
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

    async getOrders({ query, method }: Request<{}, {}, {}, Partial<IOrder>>, res: Response) {
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

    async updateOrder({ body, method }: Request<{}, {}, IOrder & Document>, res: Response) {
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

    async deleteOrder({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
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
