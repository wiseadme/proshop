import { ICategory } from '@proshop/types'
import { Document } from 'mongoose'

export interface ICategoryService {
    create(category: ICategory): Promise<Document & ICategory>;

    read(query: Partial<ICategory>): Promise<Array<ICategory & Document>>;

    update(updates: Partial<ICategory & Document>): Promise<{ updated: Document & ICategory }>;

    delete(id: string): Promise<boolean>;
}
