import { ICategory } from '@proshop/types'
import { Document } from 'mongoose'

export interface ICategoryRepository {
    createCategory(category: ICategory): Promise<ICategory>

    getCategories(params: Partial<ICategory>): Promise<ICategory[]>

    updateCategory(updates: Partial<ICategory>): Promise<{ updated: ICategory }>

    deleteCategory(id: string): Promise<boolean>
}
