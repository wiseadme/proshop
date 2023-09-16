import { ICustomerMongoModel, IOrder, IOrderMongoModel } from '@proshop/types'
import { CustomerMapper } from '@modules/customer/mappers/customer.mapper'
import { UserMapper } from '@modules/user/mappers/user.mapper'

export class OrderMapper {
    static toDomain(entity: IOrderMongoModel): IOrder{
        const _id = entity?._id
        const map: Partial<IOrderMongoModel> = entity

        map.customer = map.customer ? CustomerMapper.toDomain(map.customer as ICustomerMongoModel) : null
        map.executor = map.executor ? UserMapper.toDomain(map.executor as any) : null

        delete map._id

        return {
            id: _id,
            ...map,
        } as IOrder

    }

    static toMongoModelData(domainModel: IOrder): IOrderMongoModel{
        const { id } = domainModel
        const map: Partial<IOrder> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IOrderMongoModel
    }
}
