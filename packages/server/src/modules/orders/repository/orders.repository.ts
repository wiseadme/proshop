import { Types } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOrdersRepository } from '../types/repository'
import { IOrder, IOrderMongoModel, IRequestParams } from '@proshop-app/types'
import { OrderModel } from '@modules/orders/model/order.model'
import { OrderMapper } from '@modules/orders/mappers/order.mapper'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'

@injectable()
export class OrdersRepository implements IOrdersRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async createOrder(order: IOrder): Promise<IOrder> {
        const orderData = await new OrderModel({
            ...OrderMapper.toMongoModelData(order),
            _id: new Types.ObjectId(),
        })
            .save()

        return OrderMapper.toDomain(orderData.toObject())
    }

    async getOrderById(id: string): Promise<IOrder> {
        const [order] = await OrderModel
            .find({ _id: id })
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

    async getOrdersByStatus(seen: boolean): Promise<IOrder[]> {
        const orders = await OrderModel
            .find({ 'status.seen': seen })
            .sort({ createdAt: -1 })
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            })
            .lean() as IOrderMongoModel[]

        return orders.map(order => OrderMapper.toDomain(order))
    }

    async getOrders(params: IRequestParams<Partial<IOrder>> & { seen?: boolean }): Promise<IOrder[]> {
        const {
            page = DEFAULT_PAGE,
            count = DEFAULT_ITEMS_COUNT,
        } = params

        const orders = await OrderModel
            .find()
            .skip((page * count) - count)
            .limit(count)
            .sort({ createdAt: -1 })
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            })
            .lean() as IOrderMongoModel[]

        return orders.map(order => OrderMapper.toDomain(order))
    }

    async getOrdersByCustomerId(params: IRequestParams<Partial<IOrder>>): Promise<IOrder[]> {
        const {
            page = DEFAULT_PAGE,
            count = DEFAULT_ITEMS_COUNT,
        } = params

        const orders = await OrderModel
            .find({ customerId: params.customerId })
            .skip((page * count) - count)
            .limit(count)
            .sort({ createdAt: -1 })
            .lean() as IOrderMongoModel[]

        return orders.map(order => OrderMapper.toDomain(order))
    }

    async updateOrder(updates: Partial<IOrder>): Promise<IOrder> {
        validateId(updates.id!)

        const updated = await OrderModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .populate({
                path: 'executor',
                select: 'firstName secondName roles phone',
            }).lean() as IOrderMongoModel

        return OrderMapper.toDomain(updated)
    }

    async deleteOrder(id: string) {
        return !!await OrderModel.findByIdAndDelete(id)
    }

    async getDocumentsCount() {
        return OrderModel.countDocuments({})
    }
}
