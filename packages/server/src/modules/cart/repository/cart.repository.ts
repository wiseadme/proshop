import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
import { CartMapper } from '@modules/cart/mappers/cart.mapper'
// Types
import { ILogger } from '@/types/utils'
import { ICartRepository } from '../types/repository'
import { ICart, ICartMongoModel } from '@proshop/types'
import { CartModel } from '@modules/cart/model/cart.model'

@injectable()
export class CartRepository implements ICartRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(cart: ICart): Promise<ICart> {
        const cartData = await new CartModel({
            ...CartMapper.toMongoModelData(cart),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        return CartMapper.toDomain(cartData.toObject())
    }

    async findByOwnerId(id: string) {
        validateId(id)

        const carts = await CartModel
            .find<ICartMongoModel[]>({ ownerId: id, orderId: null })
            .lean()

        return carts.map(cart => CartMapper.toDomain(cart))[0]
    }

    async read(params: Partial<ICart>): Promise<ICart> {
        const { id } = params
        id && validateId(id)

        const data = CartMapper.toMongoModelData(params as ICart) as ICartMongoModel

        // @ts-ignore
        !data._id && delete data._id

        const carts = await CartModel
            .find<ICartMongoModel[]>(data)
            .lean()

        return CartMapper.toDomain(carts[0])
    }

    async update(updates: ICart): Promise<ICart> {
        validateId(updates.id)

        const updated = await CartModel
            .findByIdAndUpdate(
                { _id: updates.id },
                { $set: updates },
                { new: true },
            )
            .lean() as ICartMongoModel

        return CartMapper.toDomain(updated)
    }

    async delete(id) {
        validateId(id)

        return !!await CartModel.findByIdAndDelete(id)
    }
}
