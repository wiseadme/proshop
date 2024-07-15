import { IOrder } from '@proshop-app/types'

export interface IOrderResponse {
    items: IOrder[]
    total: number
}
