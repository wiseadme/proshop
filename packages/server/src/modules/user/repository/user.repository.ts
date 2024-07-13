import { injectable } from 'inversify'
import { IUserRepository } from '@modules/user/types/repository'
import { UserModel } from '@modules/user/model/user.model'
import mongoose, { Document } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
import { IUser, IUserMongoModel } from '@proshop/types'
import { UserMapper } from '@modules/user/mappers/user.mapper'

@injectable()
export class UserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        console.log(user)
        const userData = await new UserModel({
            ...UserMapper.toMongoModelData(user),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return UserMapper.toDomain(userData.toObject())
    }

    async find(params): Promise<IUser[]> {
        const users = await UserModel
            .find(params)
            .lean() as IUserMongoModel[]

        return users.map(user => UserMapper.toDomain(user))
    }

    async update(updates: any) {
        validateId(updates.id)

        const updated = await UserModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as IUserMongoModel

        return { updated: UserMapper.toDomain(updated) }
    }

    async delete(id) {
        validateId(id)

        await UserModel.findByIdAndDelete(id)

        return true
    }
}
