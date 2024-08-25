import type { IOrder } from '@proshop-app/types'

export class Order implements IOrder {
    id: IOrder['id']
    cartId: IOrder['cartId']
    amount: IOrder['amount']
    orderId: IOrder['orderId']
    payment: IOrder['payment']
    customerId: IOrder['customerId']
    customerPhone: IOrder['customerPhone']
    customerName: IOrder['customerName']
    status: IOrder['status']
    executor: IOrder['executor']
    delivery: IOrder['delivery']
    qrcode: IOrder['qrcode']
    items: IOrder['items']

    constructor({
        id = '',
        amount = 0,
        orderId,
        cartId,
        payment,
        customerId,
        customerPhone,
        customerName,
        status,
        qrcode,
        delivery,
        items,
        executor = null,
    }: IOrder) {
        this.id = id
        this.cartId = cartId
        this.customerId = customerId
        this.customerPhone = customerPhone
        this.customerName = customerName
        this.status = status
        this.items = items
        this.qrcode = qrcode
        this.amount = amount
        this.orderId = orderId
        this.executor = executor
        this.delivery = delivery
        this.payment = payment
    }

    static create(order = {}) {
        return new Order(order as IOrder)
    }
}
