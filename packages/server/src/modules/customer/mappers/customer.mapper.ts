import { ICustomer, ICustomerMongoModel } from '@proshop-app/types'

export class CustomerMapper {
    static toDomain(entity: ICustomerMongoModel): ICustomer {
        const { _id } = entity
        const map: Partial<ICustomerMongoModel> = entity

        delete map._id
        delete map.refreshToken

        return {
            id: _id,
            ...map,
        } as ICustomer

    }

    static toMongoModelData(domainModel: ICustomer): ICustomerMongoModel {
        const { id } = domainModel
        const map: Partial<ICustomer> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as ICustomerMongoModel
    }
}
