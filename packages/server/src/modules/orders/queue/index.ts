import Queue from 'bull'

export class OrdersQueue extends Queue {}

export const queue = new OrdersQueue('orders')
