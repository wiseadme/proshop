import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { ICartRepository } from '../types/repository'
import { ICart } from '@modules/cart/types/model'
import { CartModel } from '@modules/cart/model/cart.model'

@injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  async create(cart: ICart): Promise<Document & ICart> {
    return new CartModel({
      _id: new mongoose.Types.ObjectId(),
      items: cart.items,
      totalItems: cart.totalItems,
      totalUniqueItems: cart.totalUniqueItems,
      currency: cart.currency,
      amount: cart.amount,
      ownerId: cart.ownerId
    }).save()
  }

  async read(id?: string): Promise<Document & ICart> {
    return CartModel.find({ _id: id })[0]
  }

  async update(updates: ICart & Document): Promise<{ updated: Document<ICart> }> {

    const updated = await CartModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document<ICart>

    return { updated }
  }

  async delete(id) {
    return !!await CartModel.findByIdAndDelete(id)
  }
}
