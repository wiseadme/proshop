import { ICategory } from '@proshop/types'
import { Document } from 'mongoose'

export interface ICategoryRepository {
    create(category: ICategory): Promise<ICategory>

    read(params: Partial<ICategory>): Promise<ICategory[]>

    update(updates: Partial<ICategory>): Promise<{ updated: ICategory }>

    delete(id: string): Promise<boolean>
}
