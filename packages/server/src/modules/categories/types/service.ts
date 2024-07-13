import { ICategory } from '@proshop/types'
import { Document } from 'mongoose'

export interface ICategoryService {
    createCategory(category: ICategory): Promise<ICategory>;

    getCategories(query: Partial<ICategory>): Promise<ICategory[]>;

    updateCategory(updates: Partial<ICategory> & { reduceBy?: number, increaseBy?: number }): Promise<ICategory>;

    deleteCategory(id: string): Promise<boolean>;
}
