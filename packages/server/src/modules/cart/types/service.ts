import { Document } from 'mongoose'
import { ICart } from '@proshop/types'

export interface ICartService {
    create(cart: ICart): Promise<ICart>

    read(params: Partial<ICart>): Promise<ICart>,

    update(updates: Partial<ICart>): Promise<{ updated: ICart }>

    delete(id: string): Promise<boolean>
}
