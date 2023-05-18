import { Document, LeanDocument } from 'mongoose'
import { IProduct } from '@ecommerce-platform/types'

// import { ProductQuery } from './params'

export interface IProductRepository {
    create(product: IProduct): Promise<Document & IProduct>

    read(query: Partial<IProduct>): Promise<LeanDocument<IProduct>[]>

    update(updates: Partial<IProduct>): Promise<{ updated: LeanDocument<IProduct> }>

    delete(id: string): Promise<boolean>

    getDocumentsCount(): Promise<number>
}
