import { IOrder } from '@ecommerce-platform/types'

export class OrderDTO {
  cart?: IOrder['cart']
  items: IOrder['items']
  amount: IOrder['amount']
  delivery: IOrder['delivery']
  customer: IOrder['customer']
}
