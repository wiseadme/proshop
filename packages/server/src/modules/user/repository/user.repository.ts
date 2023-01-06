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
      firstName: params.userId,
      secondName: params.secondName,
      email: params.email,
      login: params.login,
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

  async read(token){
    return UserModel.find({ accessToken: token })
  }

  async update(updates: any){
    validateId(updates.id)

    const updated = await UserModel.findByIdAndUpdate(
      { _id: updates.id },
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
