import { Document, LeanDocument } from 'mongoose'
import { IProduct, IProductMongoModel, IProductQuery, IRequestParams } from '@proshop/types'

// import { ProductQuery } from './params'

export interface IProductRepository {
    create(product: IProduct): Promise<IProduct>

    find(query: Partial<IProduct>): Promise<IProduct[]>

    findById(id: string): Promise<IProduct>

    findByQueryString(name: string): Promise<IProduct[]>

    findByUrl(url: string): Promise<IProduct>

    findByCategory(params: IRequestParams<IProductQuery>): Promise<IProduct[]>

    findByVariantOptions(options: string[]): Promise<IProduct[]>

    update(updates: Partial<IProduct>): Promise<{ updated: IProduct }>

    delete(id: string): Promise<boolean>

    getDocumentsCount(params?: any): Promise<number>
}
