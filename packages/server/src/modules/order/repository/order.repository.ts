import mongoose, { Document, Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOrderRepository } from '../types/repository'
import { IOrder } from '@modules/order/types/model'
import { OrderModel } from '@modules/order/model/order.model'

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  async create(order: IOrder): Promise<Document> {
    return new OrderModel({
      _id: new Types.ObjectId(),
      cart: order.cart,
      client: order.client,
      address: order.address,
      qrcode: order.qrcode,
      owner: order.owner,
      orderId: order.orderId,
      status: order.status
    }).save()
  }

  async read(id?: string): Promise<Array<Document & IOrder>> {
    return OrderModel.find({ _id: id })
  }

  async update(updates: IOrder & Document): Promise<{ updated: Document<IOrder> }> {
    validateId(updates._id)
    const updated = await OrderModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document<IOrder>

    return { updated }
  }

  async delete(id) {
    return !!await OrderModel.findByIdAndDelete(id)
  }
}
