import { inject, injectable } from 'inversify'
import { Request } from 'express'
import QRCode from 'qrcode'
import customId from 'custom-id'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { IOrdersService } from '@modules/orders/types/service'
import { IOrdersRepository } from '@modules/orders/types/repository'
import { IOrder, IRequestParams } from '@proshop-app/types'
import { Order } from '@modules/orders/entity/order.entity'
import { IOrderGatewayService } from '@modules/orders/gateway/gateway.service'
import { IOrdersQueue } from '@modules/orders/queue/queue'
import { IOrderResponse } from '@modules/orders/types/response'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { PaginatableResponse } from '@common/models/PaginatableResponse'

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
        const { customerName, customerPhone } = order

        order.orderId = customId({ name: customerName, email: customerPhone, randomLength: 2 })

        order.qrcode = await QRCode.toString(order.orderId, { type: 'svg' })

        const created = await this.repository.createOrder(Order.create(order))

        console.log('created', created)

        /**
         * @description - привязываем к корзине номер заказа
         */
        await this.gateway.cart.update({ id: created.cartId!, orderId: created.orderId })

        /**
         * @description - уменьшаем кол - ва товара в остатках товара
         * на кол - во единиц указанное в заказе.
         */
        for (const item of order.items) {
            if (!item.isCountable) {
                continue
            }

            await this.gateway.product.reduceProductQuantity({
                id: item.id,
                reduceBy: item.quantity,
            })
        }

        return created
    }

    async getOrders(query: IRequestParams<Partial<IOrder> & { seen?: boolean }> = {}): Promise<IOrderResponse> {
        if (query.seen !== undefined) {
            const orders = await this.repository.getOrdersByStatus(query.seen)

            return new PaginatableResponse({ items: orders })
        }

        if (query.id) {
            const order = await this.repository.getOrderById(query.id)

            return new PaginatableResponse({ items: [order] })
        }

        const [items, total] = await Promise.all([
            this.repository.getOrders(query),
            this.repository.getDocumentsCount()
        ])

        return new PaginatableResponse({ items, total })
    }

    async updateOrder(updates: Partial<IOrder>): Promise<IOrder> {
        const order = await this.repository.updateOrder(updates)

        if (order.status.completed || order.status.cancelled) {
            await this.gateway.cart.delete(order.cartId!)
        }

        return order
    }

    async disbandOrder(id: string) {
        const order = await this.repository.getOrderById(id)

        for (const item of order.items) {
            if (!item.isCountable) {
                continue
            }

            await this.gateway.product.increaseProductQuantity({
                id: item.id,
                increaseBy: item.quantity,
            })
        }

        return true
    }

    async deleteOrder(id: string): Promise<boolean> {
        return await this.repository.deleteOrder(id)
    }
}
