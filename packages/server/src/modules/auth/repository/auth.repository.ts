import { injectable } from 'inversify'
import { IAuthRepository } from '@modules/auth/types/repository'
import { AuthModel } from '@modules/auth/model/auth.model'
import mongoose from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class AuthRepository implements IAuthRepository {
  async create(params): Promise<Record<'id', string>>{

    const user = new AuthModel({
      _id: new mongoose.Types.ObjectId(),
      userId: params.userId,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken
    })

    await user.save()

    return { id: user._id }
  }

  async read(token){
    return AuthModel.find({ accessToken: token })
  }

  async update(updates: any){
    validateId(updates.id)

    const updated = await AuthModel.findByIdAndUpdate(
      { _id: updates.id },
      { $set: updates },
      { new: true }
    )

    return { updated }
  }

  async delete(id){
    validateId(id)

    await AuthModel.findByIdAndDelete(id)

    return true
  }
}
