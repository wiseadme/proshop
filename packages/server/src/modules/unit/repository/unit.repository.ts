import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { UnitModel } from '../model/unit.model'

// Types
import { ILogger } from '@/types/utils'
import { IUnit } from '@ecommerce-platform/types'
import { IUnitRepository } from '@modules/unit/types/repository'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class UnitRepository implements IUnitRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  async create(unit: IUnit) {
    return new UnitModel({
      _id: new mongoose.Types.ObjectId(),
      value: unit.value,
      meta: unit.meta,
    }).save()
  }

  async read(params) {
    return UnitModel.find(params)
  }

  async update(updates: Partial<IUnit>) {
    validateId(updates._id)

    const updated = await UnitModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document & IUnit

    return { updated }
  }

  async delete(id): Promise<boolean> {
    return !!await UnitModel.findByIdAndDelete(id)
  }
}
