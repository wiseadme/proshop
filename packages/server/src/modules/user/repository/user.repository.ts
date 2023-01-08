import { injectable } from 'inversify'
import { IUserRepository } from '@modules/user/types/repository'
import { UserModel } from '@modules/user/model/user.model'
import mongoose from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class UserRepository implements IUserRepository {
  async create(params): Promise<Record<'id', string>>{

    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      firstName: params.firstName,
      secondName: params.secondName,
      email: params.email,
      username: params.username,
      password: params.password,
      phone: params.phone,
      roles: params.roles,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
      enabled: params.enabled,
    })

    await user.save()

    return { id: user._id }
  }

  async read(params){
    return UserModel.find(params)
  }

  async update(updates: any){
    validateId(updates._id)

    const updated = await UserModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    )

    return { updated }
  }

  async delete(id){
    validateId(id)

    await UserModel.findByIdAndDelete(id)

    return true
  }
}
