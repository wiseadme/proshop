import { ICategory } from '@ecommerce-platform/types'
import { Document } from 'mongoose'

export interface ICategoryRepository {
    create(category: ICategory): Promise<Document & ICategory>

    read(params: Partial<ICategory>): Promise<Array<Document & ICategory>>

    update(updates: Partial<ICategory>): Promise<{ updated: Document & ICategory }>

    delete(id: string): Promise<boolean>
}
