import { ICartItem, IOrder } from '@proshop/types'

export class Order implements IOrder {
    readonly id: IOrder['id']
    readonly items: IOrder['items']
    readonly amount: IOrder['amount']
    readonly cart: IOrder['cart']
    readonly orderId: IOrder['orderId']
    readonly delivery: IOrder['delivery']
    readonly customer: IOrder['customer']
    readonly qrcode: IOrder['qrcode']
    readonly status: IOrder['status']
    readonly payment: IOrder['payment']
    readonly executor: IOrder['executor']

    constructor({
        id = '',
        items = [],
        amount = 0,
        customer,
        orderId = null,
        delivery = null,
        qrcode = null,
        cart = '',
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
        },
    }: IOrder) {
        this.id = id
        this.items = items
        this.amount = amount
        this.orderId = orderId
        this.delivery = delivery
        this.customer = customer
        this.qrcode = qrcode
        this.status = status
        this.cart = cart
        this.payment = payment
        this.executor = executor
    }

    static create(order: IOrder) {
        return new Order(order)
    }
}
