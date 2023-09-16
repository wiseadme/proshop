import { IUser, IUserMongoModel } from '@proshop/types'

export class UserMapper {
    static toDomain(entity: IUserMongoModel): IUser {
        const { _id } = entity
        const map: Partial<IUserMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IUser

    }

    static toMongoModelData(domainModel: IUser): IUserMongoModel {
        const { id } = domainModel
        const map: Partial<IUser> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IUserMongoModel
    }
}
