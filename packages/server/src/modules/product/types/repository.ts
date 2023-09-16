import { Document, LeanDocument } from 'mongoose'
import { IAttribute, IProduct, IProductMongoModel, IProductQuery, IRequestParams } from '@proshop/types'

// import { ProductQuery } from './params'

export interface IProductRepository {
    create(product: IProduct): Promise<IProduct>

    find(query: Partial<IProduct>): Promise<IProduct[]>

    findById(id: string): Promise<IProduct>

    findByQueryString(name: string): Promise<IProduct[]>

    findByUrl(url: string): Promise<IProduct>

    findByCategory(params: IRequestParams<IProductQuery>): Promise<IProduct[]>

    update(updates: Partial<IProduct>): Promise<{ updated: IProduct }>

    delete(id: string): Promise<boolean>

    addAttribute(params: { productId: string, attribute: IAttribute }): Promise<IProduct>

    deleteAttribute(params: { productId: string, attributeId: string }): Promise<IProduct>

    getDocumentsCount(params?: any): Promise<number>
}
