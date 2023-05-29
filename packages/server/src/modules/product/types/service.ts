import { Document, LeanDocument } from 'mongoose'
import { IProduct, IRequestParams } from '@proshop/types'

export interface IProductService {
    create(product: IProduct): Promise<{ items: (Document & IProduct)[], total?: number }>

    read(query: IRequestParams<Partial<IProduct>>): Promise<{ items: LeanDocument<IProduct>[], total?: number }>,

    update(updates: Partial<IProduct>): Promise<{ updated: LeanDocument<IProduct> }>

    delete(id: string): Promise<boolean>
}
