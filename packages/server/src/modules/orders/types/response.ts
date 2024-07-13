import { IOrder } from '@proshop/types'

export interface IOrderResponse {
    items: IOrder[]
    total: number
}
