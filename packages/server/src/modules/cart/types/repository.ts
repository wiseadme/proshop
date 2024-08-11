import type { ICart } from '@proshop-app/types'

export interface ICartRepository {
    create(cart: ICart): Promise<ICart>

    read(params: Partial<ICart>): Promise<ICart>

    findByOwnerId(id: string): Promise<ICart>

    update(updates: Partial<ICart>): Promise<ICart>

    delete(id: string): Promise<boolean>
}
