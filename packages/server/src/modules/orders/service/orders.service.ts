import { inject, injectable } from 'inversify'
import { Request } from 'express'
import QRCode from 'qrcode'
import customId from 'custom-id'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOrdersService } from '../types/service'
import { IOrdersRepository } from '../types/repository'
import { IOrder, IRequestParams } from '@proshop/types'
import { Order } from '@modules/orders/entity/order.entity'
import { IOrderGatewayService } from '@modules/orders/gateway/gateway.service'
import { OrderTypes } from '@modules/orders/di/di.types'
import { IOrdersQueue } from '@modules/orders/queue/queue'

@injectable()
export class OrdersService implements IOrdersService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IOrdersRepository) private repository: IOrdersRepository,
        @inject(TYPES.GATEWAYS.IOrderGatewayService) private gateway: IOrderGatewayService,
        @inject(OrderTypes.ORDERS_QUEUE) private jobs: IOrdersQueue,
    ) {
        this.jobs.worker.setJobProcessor(this.create.bind(this))
    }

    async processOrder({ headers }: Request) {
        this.logger.info('start order processing')

        const job = await this.jobs.queue.getJob(headers.jobId as string)

        return await this.jobs.queue.waitJobResult(job!)
    }

    async create(order: IOrder) {
        const { customer: { name, phone } } = order
        order.orderId = customId({ name, email: phone, randomLength: 2 })
        /**
         * @description - внутри метода используется метод render, для отрисвоки qrcode,
         * который возвращает promise, поэтому await не убираем
         * */
        order.qrcode = await QRCode.toDataURL(order.orderId)
        const created = await this.repository.create(Order.create(order))

        await this.gateway.cart.update({ id: created.cart!, orderId: created.orderId })

        return created
    }

    async read(query: IRequestParams<Partial<IOrder> & { seen?: boolean }> = {}) {
        const data = {
            items: [] as IOrder[],
            total: 1,
        }

        if (query.length) {
            data.total = await this.repository.getDocumentsCount()
        }

        if (query.seen !== undefined) {
            data.items = await this.repository.findBySeen(query.seen)
            data.total = data.items.length

            return data
        }

        if (query.id) {
            const order = await this.repository.findById(query.id)
            data.items = [order]

            return data
        }

        data.items = await this.repository.find(query)

        return data
    }

    async update(updates: IOrder): Promise<IOrder> {
        const order = await this.repository.update(updates)

        if (order.status.cancelled || order.status.completed) {
            await this.gateway.cart.delete(order.cart!)
        }

        return order
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
