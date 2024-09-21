import { inject, injectable } from 'inversify'
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
import { IOrderResponse } from '@modules/orders/types/response'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { PaginationResponse } from '@common/models/PaginationResponse'

@injectable()
export class OrdersService implements IOrdersService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ORDER_IOC.IOrdersRepository) private repository: IOrdersRepository,
        @inject(ORDER_IOC.IOrderGatewayService) private gateway: IOrderGatewayService,
    ) {
    }

    async createOrder(order: IOrder) {
        const { customerName, customerPhone } = order

        order.orderId = customId({ name: customerName, email: customerPhone, randomLength: 2 })
        order.qrcode = await QRCode.toString(order.orderId, { type: 'svg' })

        const created = await this.repository.createOrder(Order.create(order))

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

        /**
         * @description - привязываем к корзине номер заказа
         */
        await this.gateway.cart.update({ id: created.cartId!, orderId: created.orderId })

        return created
    }

    private async getNewOrders() {
        const orders = await this.repository.getOrdersByStatus(false)

        return new PaginationResponse<IOrder>({ items: orders })
    }

    private async getOrderById(id: string) {
        const order = await this.repository.getOrderById(id)

        return new PaginationResponse<IOrder>({ items: [order] })
    }

    private async getCustomerOrders(params: IRequestParams<Partial<IOrder>>) {
        const orders = await this.repository.getOrdersByCustomerId(params)

        return new PaginationResponse<IOrder>({ items: orders })
    }

    private async getAllOrders(params: IRequestParams<Partial<IOrder>>) {
        const [items, total] = await Promise.all([
            this.repository.getOrders(params),
            this.repository.getDocumentsCount()
        ])

        return new PaginationResponse({ items, total })
    }

    async getOrders(query: IRequestParams<Partial<IOrder & { seen: boolean }>> = {}): Promise<IOrderResponse> {
        if (query.seen) return this.getNewOrders()
        if (query.id) return this.getOrderById(query.id)
        if (query.customerId) return this.getCustomerOrders(query)

        return this.getAllOrders(query)
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
