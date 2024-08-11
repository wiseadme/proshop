import { IOrder } from '@proshop-app/types'

export class OrderDTO {
    cartId: IOrder['cartId']
    items: IOrder['items']
    amount: IOrder['amount']
    delivery: IOrder['delivery']
    customerName: IOrder['customerName']
    customerPhone: IOrder['customerPhone']
    customerId: IOrder['customerId']
}
