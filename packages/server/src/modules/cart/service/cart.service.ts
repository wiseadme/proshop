import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ICartService } from '../types/service'
import { ICartRepository } from '../types/repository'
import { ICart } from '@proshop/types'
import { Cart } from '@modules/cart/entity/cart.entity'
import { CART_IOC } from '@modules/cart/di/di.types'

// import { ICartGatewayService } from '@modules/cart/gateway/gateway.service'

@injectable()
export class CartService implements ICartService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CART_IOC.ICartRepository) private repository: ICartRepository,
    ) {
    }

    async create(cart: ICart) {
        return await this.repository.create(Cart.create(cart))
    }

    async read(params: Partial<ICart>): Promise<ICart> {
        if (!params.ownerId) {
            return await this.repository.read(params)
        }

        const cart = await this.repository.findByOwnerId(params.ownerId)

        if (cart) return cart

        return Promise.reject({
            message: 'Cart not found',
            status: 404,
        })
    }

    async update(updates: Partial<ICart>): Promise<ICart> {
        if (updates.items) {

            updates.amount = 0
            updates.totalItems = 0
            updates.totalUniqueItems = updates.items.length

            updates.items.forEach(it => {
                const { variant, product, quantity } = it
                const price = variant?.option.price ?? product.price

                it.amount = quantity * price!
                updates.amount! += it.amount
                updates.totalItems! += quantity
            })
        }

        return await this.repository.update(updates)
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
