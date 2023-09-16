import { Document, LeanDocument } from 'mongoose'
import { IAttribute, IProduct, IRequestParams } from '@proshop/types'
import { id } from 'inversify'

export interface IProductService {
    create(product: IProduct): Promise<IProduct>

    read(query: IRequestParams<Partial<IProduct>>): Promise<{ items: LeanDocument<IProduct>[], total?: number }>,

    update(updates: Partial<IProduct>): Promise<{ updated: LeanDocument<IProduct> }>

    delete(id: string): Promise<boolean>

    addAttribute(query: { productId: string, attribute: IAttribute }): Promise<IProduct>

    deleteAttribute(query: { productId: string, attributeId: string }): Promise<IProduct>
}
