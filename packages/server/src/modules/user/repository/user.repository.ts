import { injectable } from 'inversify'
import { IUserRepository } from '@modules/user/types/repository'
import { UserModel } from '@modules/user/model/user.model'
import mongoose, { Document } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
import { IUser } from '@ecommerce-platform/types'

@injectable()
export class UserRepository implements IUserRepository {
  async create(params): Promise<IUser & Document> {
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      firstName: params.firstName,
      secondName: params.secondName,
      username: params.username,
      password: params.password,
      phone: params.phone,
      position: params.position,
      roles: params.roles,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
      enabled: params.enabled,
    }) as IUser & Document

    await user.save()

    return user
  }

  async read(params): Promise<(IUser & Document)[]>{
    return UserModel.find(params)
  }

  async update(updates: any){
    validateId(updates._id)

    const updated = await UserModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as IUser & Document

    return { updated }
  }

  async delete(id){
    validateId(id)

    await UserModel.findByIdAndDelete(id)

    return true
  }
}
