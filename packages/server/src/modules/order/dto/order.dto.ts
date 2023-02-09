import { IOrder } from '@ecommerce-platform/types'

export class OrderDTO {
  cart?: IOrder['cart']
  items: IOrder['items']
  amount: IOrder['amount']
  address: IOrder['address']
  customer: IOrder['customer']
}
