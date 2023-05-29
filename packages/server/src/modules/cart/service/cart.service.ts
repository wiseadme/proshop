import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { ICartService } from '../types/service'
import { ICartRepository } from '../types/repository'
import { ICart } from '@proshop/types'
import { IEventBusService } from '@/types/services'
import { DELETE_CART_EVENT } from '@common/constants/events'

@injectable()
export class CartService implements ICartService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.ICartRepository) private repository: ICartRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
        this.addListeners()
    }

    async create(cart) {
        return await this.repository.create(cart)
    }

    async read(params: Partial<ICart>): Promise<Document & ICart> {
        return await this.repository.read(params)
    }

    async update(updates: ICart & Document): Promise<{ updated: Document<ICart> }> {
        if (updates.items) {

            updates.amount = 0
            updates.totalItems = 0
            updates.totalUniqueItems = 0

            updates.totalUniqueItems = updates.items.length

            updates.items.forEach(it => {
                if (it.variant && it.variant.option.price) {
                    updates.amount += it.variant.option.price * it.quantity
                } else {
                    updates.amount += it.product.price * it.quantity
                }

                updates.totalItems += it.quantity
            })
        }

        return await this.repository.update(updates)
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }

    addListeners() {
        this.events.on(DELETE_CART_EVENT, this.delete.bind(this))
    }
}
