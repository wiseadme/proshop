import { IOrder } from '@modules/order/types/model'

export class OrderDTO {
  cartId?: IOrder['cartId']
  items: IOrder['items']
  amount: IOrder['amount']
  owner?: IOrder['owner']
  address: IOrder['address']
  client: IOrder['client']
}
