import { Document } from 'mongoose'
import { ICart } from '@proshop/types'

export interface ICartRepository {
    create(cart: ICart): Promise<ICart>

    read(params: Partial<ICart>): Promise<ICart>

    findByOwnerId(id: string): Promise<ICart>

    update(updates: Partial<ICart>): Promise<{ updated: ICart }>

    delete(id: string): Promise<boolean>
}
