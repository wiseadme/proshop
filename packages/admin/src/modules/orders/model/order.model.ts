import { IOrder } from '@proshop/types'

export class Order implements IOrder {
    id: IOrder['id']
    cart: IOrder['cart']
    amount: IOrder['amount']
    orderId: IOrder['orderId']
    payment: IOrder['payment']
    customer: IOrder['customer']
    status: IOrder['status']
    executor: IOrder['executor']
    delivery: IOrder['delivery']
    qrcode: IOrder['qrcode']
    items: IOrder['items']

    constructor({
        id = '',
        amount = 0,
        orderId,
        cart,
        payment,
        customer,
        status,
        qrcode,
        delivery,
        items,
        executor = null,
    }: IOrder) {
        this.id = id
        this.cart = cart
        this.customer = customer
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
