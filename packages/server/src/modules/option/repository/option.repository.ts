import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { OptionModel } from '@modules/option/model/option.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IOption } from '../types/model'
import { IOptionRepository } from '../types/repository'

@injectable()
export class OptionRepository implements IOptionRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
  }

  async create(option: IOption): Promise<Document>{
    return new OptionModel({
      _id: new mongoose.Types.ObjectId(),
      name: option.name,
      price: option.price,
      quantity: option.quantity,
      description: option.description,
      assets: option.assets
    }).save()
  }

  async read(id?: string): Promise<Array<Document & IOption>>{
    id && validateId(id)

    return OptionModel.find({ id })
  }

  async update(updates: Array<IOption & Document>): Promise<{ updated: Array<Document<IOption>> }>{
    const updated: Array<Document<IOption>> = []

    // for (const attr of updates) {
    //   validateId(attr._id)
    //
    //   const attribute = await AttributeModel.findByIdAndUpdate(
    //     { _id: attr._id },
    //     { $set: attr },
    //     { new: true }
    //   ) as Document<IAttribute>
    //
    //   updated.push(attribute)
    // }

    return { updated }
  }

  async delete(id){
    return !!await OptionModel.findByIdAndDelete(id)
  }
}
