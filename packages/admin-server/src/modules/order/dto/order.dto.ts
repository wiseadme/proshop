import { IOrder } from '@modules/order/types/model'

export class OrderDTO {
  cart: IOrder['cart']
  owner: IOrder['owner']
  address: IOrder['address']
  client: IOrder['client']
  qrcode: IOrder['qrcode']
  orderId: IOrder['orderId']
}
