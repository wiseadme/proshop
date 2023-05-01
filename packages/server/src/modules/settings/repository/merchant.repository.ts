import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Types
import { ILogger } from '@/types/utils'
import { IMerchant } from '@ecommerce-platform/types'
import { IMerchantRepository } from '@modules/settings/types/repository'
import { validateId } from '@common/utils/mongoose-validate-id'
import { MerchantModel } from '@modules/settings/model/merchant.model'

@injectable()
export class MerchantRepository implements IMerchantRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  async create(merchant: IMerchant) {
    return new MerchantModel({
      _id: new mongoose.Types.ObjectId(),
      organization: merchant.organization,
      name: merchant.name,
      description: merchant.description,
      logo: merchant.logo,
      slogan: merchant.slogan,
      address: merchant.address,
      email: merchant.email,
      phone: merchant.phone,
      currency: merchant.currency,
      stores: merchant.stores
    }).save()
  }

  async read() {
    return MerchantModel.find().lean()
  }
  async update(updates: Partial<IMerchant>) {
    validateId(updates._id)

    const updated = await MerchantModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document & IMerchant

    return { updated }
  }

  async delete(id): Promise<boolean> {
    return !!await MerchantModel.findByIdAndDelete(id)
  }
}
