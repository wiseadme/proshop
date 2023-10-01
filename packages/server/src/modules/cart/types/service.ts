import { Document } from 'mongoose'
import { ICart } from '@proshop/types'
import { id } from 'inversify'

export interface ICartService {
    create(cart: ICart): Promise<ICart>

    read(params: Partial<ICart>): Promise<ICart>,

    update(updates: Partial<ICart>): Promise<ICart>

    delete(id: string): Promise<boolean>
}
