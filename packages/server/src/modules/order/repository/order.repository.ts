import { Document, Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOrderRepository } from '../types/repository'
import { IOrder } from '@ecommerce-platform/types'
import { OrderModel } from '@modules/order/model/order.model'

// Constants
import { DEFAULT_PAGE, DEFAULT_ITEMS_COUNT } from '@common/constants/counts'

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  async create(order: IOrder): Promise<Document & IOrder> {
    return new OrderModel({
      _id: new Types.ObjectId(),
      items: order.items,
      customer: order.customer,
      delivery: order.delivery,
      amount: order.amount,
      qrcode: order.qrcode,
      orderId: order.orderId,
      status: order.status,
    }).save()
  }

  async read(params: any & { page: number, count: number }): Promise<Array<Document & IOrder>> {
    let orders

    if (params?._id) {
      validateId(params._id)

      orders = await OrderModel
        .find({ _id: params._id })
        .populate('customer')
        .populate({
          path: 'executor',
          select: 'firstName secondName roles phone'
        })

    } else if (params.seen) {
      orders = await OrderModel
        .find({ 'status.seen': params.seen })
        .sort({ createdAt: -1 })
        .populate('customer')
        .populate({
          path: 'executor',
          select: 'firstName secondName roles phone'
        })
    } else {
      const {
        page = DEFAULT_PAGE,
        count = DEFAULT_ITEMS_COUNT
      } = params

      orders = await OrderModel
        .find()
        .skip((page * count) - count)
        .limit(count)
        .sort({ createdAt: -1 })
        .populate('customer')
        .populate({
          path: 'executor',
          select: 'firstName secondName roles phone'
        })
    }

    return orders
  }

  async update(updates: IOrder & Document): Promise<{ updated: Document & IOrder }> {
    validateId(updates._id)

    const updated = await OrderModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    )
      .populate('customer')
      .populate({
        path: 'executor',
        select: 'firstName secondName roles phone'
      })as Document & IOrder

    return { updated }
  }

  async delete(id) {
    return !!await OrderModel.findByIdAndDelete(id)
  }
}
