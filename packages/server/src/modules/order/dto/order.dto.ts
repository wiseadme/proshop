import { IOrder } from '@ecommerce-platform/types'

export class OrderDTO {
  cart?: IOrder['cart']
  items: IOrder['items']
  amount: IOrder['amount']
  owner?: IOrder['owner']
  address: IOrder['address']
  client: IOrder['client']
}
