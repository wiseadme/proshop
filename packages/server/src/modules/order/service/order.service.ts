import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import QRCode from 'qrcode'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IOrderService } from '../types/service'
import { IOrderRepository } from '../types/repository'
import { IOrder } from '@modules/order/types/model'
import { Order } from '@modules/order/entity/order.entity'
import { OrderStatus } from '@modules/order/dictionaries'

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IOrderRepository) private repository: IOrderRepository,
  ) {
  }

  async create(order: IOrder) {
    order.orderId = `T-${new Date().toLocaleDateString().replace(/\D/g, '')}-${1}`
    order.qrcode = await QRCode.toDataURL(order.orderId)
    order.status = OrderStatus.CREATED

    return await this.repository.create(Order.create(order))
  }

  async read(id?: string): Promise<Array<Document & IOrder>> {
    return await this.repository.read(id)
  }

  async update(updates: IOrder & Document): Promise<{ updated: Document<IOrder> }> {
    return await this.repository.update(updates)
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id)
  }
}
