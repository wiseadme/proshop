import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import QRCode from 'qrcode'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOrderService } from '../types/service'
import { IOrderRepository } from '../types/repository'
import { IOrder } from '@ecommerce-platform/types'
import { Order } from '@modules/order/entity/order.entity'
import { IEventBusService } from '@/types/services'
import { DELETE_CART_EVENT } from '@common/constants/events'

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IOrderRepository) private repository: IOrderRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
  }

  async create(order: IOrder){
    order.orderId = `T-${ new Date().toISOString().replace(/\D/g, '') }`
    order.qrcode = await QRCode.toDataURL(order.orderId)

    const created = await this.repository.create(Order.create(order))

    await this.events.emit(DELETE_CART_EVENT, order.cart)

    return created
  }

  async read(params = {}): Promise<Array<Document & IOrder>>{
    return await this.repository.read(params)
  }

  async update(updates: IOrder): Promise<{ updated: Document & IOrder }>{
    return await this.repository.update(updates)
  }

  async delete(id: string): Promise<boolean>{
    return await this.repository.delete(id)
  }
}
