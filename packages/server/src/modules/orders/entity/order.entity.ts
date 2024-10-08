import { IOrder } from '@proshop-app/types'

export class Order implements IOrder {
    readonly id: IOrder['id']
    readonly items: IOrder['items']
    readonly amount: IOrder['amount']
    readonly cartId: IOrder['cartId']
    readonly orderId: IOrder['orderId']
    readonly delivery: IOrder['delivery']
    readonly customerName: IOrder['customerName']
    readonly customerPhone: IOrder['customerPhone']
    readonly customerId: IOrder['customerId']
    readonly qrcode: IOrder['qrcode']
    readonly status: IOrder['status']
    readonly payment: IOrder['payment']
    readonly executor: IOrder['executor']

    constructor({
        id = '',
        items = [],
        amount = 0,
        customerName,
        customerPhone,
        customerId,
        orderId = null,
        delivery = null,
        qrcode = null,
        cartId = null,
        payment = null,
        executor = null,
        status = {
            created: true,
            confirmed: false,
            inProcess: false,
            ready: false,
            inDelivery: false,
            seen: false,
            completed: false,
            cancelled: false,
            disbanded: false
        },
    }: IOrder) {
        this.id = id
        this.items = items
        this.amount = amount
        this.orderId = orderId
        this.delivery = delivery
        this.customerName = customerName
        this.customerPhone = customerPhone
        this.customerId = customerId
        this.qrcode = qrcode
        this.status = status
        this.cartId = cartId
        this.payment = payment
        this.executor = executor
    }

    static create(order: IOrder) {
        return new Order(order)
    }
}
