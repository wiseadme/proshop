import { Document, LeanDocument } from 'mongoose'
import { IProduct } from '@proshop/types'

// import { ProductQuery } from './params'

export interface IProductRepository {
    create(product: IProduct): Promise<Document & IProduct>

    read(query: Partial<IProduct>): Promise<LeanDocument<IProduct>[]>

    update(updates: Partial<IProduct>): Promise<{ updated: LeanDocument<IProduct> }>

    delete(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
