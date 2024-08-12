import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ICartService } from '../types/service'
import { ICartRepository } from '../types/repository'
import type { ICart } from '@proshop-app/types'
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

    async create(cart: Partial<ICart>) {
        return await this.repository.create(Cart.create(cart as ICart))
    }

    async read(params: Partial<ICart>): Promise<ICart> {
        return await this.repository.findByOwnerId(params.customerId!)
    }

    async update(updates: Partial<ICart>): Promise<ICart> {
        if (updates.items) {

            updates.amount = 0
            updates.totalItems = 0

            updates.items = updates.items.filter(it => it.quantity > 0)
            updates.totalUniqueItems = updates.items.length

            updates.items.forEach(it => {
                const { price, quantity } = it

                it.amount = quantity * price!
                updates.amount! += quantity * price!
                updates.totalItems! += quantity
            })
        }

        return await this.repository.update(updates)
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
