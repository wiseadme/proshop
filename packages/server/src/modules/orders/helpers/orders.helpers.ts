import { injectable } from 'inversify'
import { IOrder } from '@proshop-app/types'
import QRCode from 'qrcode'
import customId from 'custom-id'

export interface IOrdersHelpers {
    setOrderAttributes(order: IOrder): Promise<IOrder>
}

@injectable()
export class OrdersHelpers implements IOrdersHelpers{
    constructor() {
    }

    /**
     * @description - устанавливает orderId и Qr код заказа
     */
    async setOrderAttributes(order: IOrder) {
        const { customerName, customerPhone } = order

        order.orderId = customId({ name: customerName, email: customerPhone, randomLength: 2 })
        order.qrcode = await QRCode.toString(order.orderId, { type: 'svg' })

        return order
    }
}
