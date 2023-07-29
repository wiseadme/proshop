import { Document, Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOrderRepository } from '../types/repository'
import { IOrder, IOrderMongoModel, IRequestParams } from '@proshop/types'
import { OrderModel } from '@modules/order/model/order.model'
import { OrderMapper } from '@modules/order/mappers/order.mapper'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'

@injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(order: IOrder): Promise<IOrder> {
        const orderData = await new OrderModel({
            ...OrderMapper.toMongoModelData(order),
            _id: new Types.ObjectId(),
        }).save() as IOrderMongoModel

        return OrderMapper.toDomain(orderData)
    }

    async findById(id: string): Promise<IOrder> {
        const [order] = await OrderModel
            .find({ _id: id })
            .populate('customer')
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
                options: {
                    lean: true,
                },
            })
            .lean() as IOrderMongoModel[]

        return OrderMapper.toDomain(order)
    }

    async findBySeen(seen: boolean): Promise<IOrder[]> {
        const orders = await OrderModel
            .find({ 'status.seen': seen })
            .sort({ createdAt: -1 })
            .populate('customer')
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            })
            .lean() as IOrderMongoModel[]

        return orders.map(order => OrderMapper.toDomain(order))
    }

    async find(params: IRequestParams<Partial<IOrder>> & { seen?: boolean }): Promise<IOrder[]> {
        const {
            page = DEFAULT_PAGE,
            count = DEFAULT_ITEMS_COUNT,
        } = params

        const orders = await OrderModel
            .find()
            .skip((page * count) - count)
            .limit(count)
            .sort({ createdAt: -1 })
            .populate('customer')
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            })
            .lean() as IOrderMongoModel[]

        return orders.map(order => OrderMapper.toDomain(order))
    }

    async update(updates: IOrder & Document): Promise<{ updated: IOrder }> {
        validateId(updates.id)

        const updated = await OrderModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .populate('customer')
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            }).lean() as IOrderMongoModel

        return { updated: OrderMapper.toDomain(updated) }
    }

    async delete(id) {
        return !!await OrderModel.findByIdAndDelete(id)
    }

    async getDocumentsCount() {
        return OrderModel.countDocuments({})
    }
}
