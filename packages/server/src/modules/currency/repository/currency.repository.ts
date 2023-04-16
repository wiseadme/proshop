import mongoose, { Document } from 'mongoose'
import { injectable } from 'inversify'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ICurrencyRepository } from '@modules/currency/types/repository'
import { ICurrency, ICustomer } from '@ecommerce-platform/types'
import { CurrencyModel } from "@modules/currency/model/currency.model";

@injectable()
export class CurrencyRepository implements ICurrencyRepository {
  async create(params): Promise<ICurrency & Document> {

    const currency = new CurrencyModel({
      _id: new mongoose.Types.ObjectId(),
      name: params.name,
      symbol: params.symbol,
      meta: params.meta
    })

    await currency.save()

    return currency
  }

  async read(params: Partial<ICurrency>) {
    return CurrencyModel.find(params)
  }

  async update(updates: Partial<ICurrency>) {
    validateId(updates._id)

    const updated = await CurrencyModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as ICurrency & Document

    return { updated }
  }

  async delete(id) {
    validateId(id)

    await CurrencyModel.findByIdAndDelete(id)

    return true
  }
}
