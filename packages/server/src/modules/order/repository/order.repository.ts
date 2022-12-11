import mongoose, { Document, Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOrderRepository } from '../types/repository'
import { IOrder } from '@modules/order/types/model'
import { OrderModel } from '@modules/order/model/order.model'

const DEFAULT_COUNT = 20
const DEFAULT_PAGE = 1

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
  }

  async create(order: IOrder): Promise<Document>{
    return (await new OrderModel({
      _id: new Types.ObjectId(),
      items: order.items,
      amount: order.amount,
      client: order.client,
      address: order.address,
      qrcode: order.qrcode,
      owner: order.owner,
      orderId: order.orderId,
      status: order.status,
    }).save())
  }

  async read(params: Partial<IOrder & { page: number, count: number }>): Promise<Array<Document & IOrder>>{
    if (params?._id) {
      validateId(params._id)

      return OrderModel.find({ _id: params._id })
    }

    const { page = DEFAULT_PAGE, count = DEFAULT_COUNT } = params

    return OrderModel.find()
      .skip((page * count) - count)
      .limit(count)
      .sort({ createdAt: -1 })
  }

  async update(updates: IOrder & Document): Promise<{ updated: Document<IOrder> }>{
    validateId(updates._id)

    const updated = await OrderModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document<IOrder>

    return { updated }
  }

  async delete(id){
    return !!await OrderModel.findByIdAndDelete(id)
  }
}
