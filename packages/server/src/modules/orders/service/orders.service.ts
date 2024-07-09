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
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { IOrdersQueue } from '@modules/orders/queue/queue'

@injectable()
export class OrdersService implements IOrdersService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ORDER_IOC.IOrdersRepository) private repository: IOrdersRepository,
        @inject(ORDER_IOC.IOrderGatewayService) private gateway: IOrderGatewayService,
        @inject(ORDER_IOC.IOrdersQueue) private jobs: IOrdersQueue,
    ) {
        this.jobs.worker.setJobProcessor(this.createOrder.bind(this))
    }

    async processOrder({ headers }: Request) {
        this.logger.info('start order processing')

        const job = await this.jobs.queue.getJob(headers.jobId as string)

        return await this.jobs.queue.waitJobResult(job!)
    }

    async createOrder(order: IOrder) {
        const { customer: { name, phone } } = order

        order.orderId = customId({ name, email: phone, randomLength: 2 })

        order.qrcode = await QRCode.toString(order.orderId, { type: 'svg' })

        const created = await this.repository.create(Order.create(order))

        /**
         * @description - привязываем к корзине номер заказа
         */
        await this.gateway.cart.update({ id: created.cart!, orderId: created.orderId })

        /**
         * @description - уменьшаем кол - ва товара в остатках товара
         * на кол - во единиц указанное в заказе.
         */
        for (const item of order.items) {
            if (!item.product.conditions.isCountable) {
                continue
            }

            await this.gateway.product.reduceProductQuantity({
                id: item.product.id,
                reduceBy: item.quantity,
            })
        }

        return created
    }

    async getOrders(query: IRequestParams<Partial<IOrder> & { seen?: boolean }> = {}) {
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

    async updateOrder(updates: IOrder): Promise<IOrder> {
        const order = await this.repository.update(updates)

        if (order.status.cancelled || order.status.completed) {
            await this.gateway.cart.delete(order.cart!)
        }

        return order
    }

    async deleteOrder(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
