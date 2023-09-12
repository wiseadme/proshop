import { Document, LeanDocument } from 'mongoose'
import { IProduct, IRequestParams } from '@proshop/types'
import { id } from 'inversify'

export interface IProductService {
    create(product: IProduct): Promise<IProduct>

    read(query: IRequestParams<Partial<IProduct>>): Promise<{ items: LeanDocument<IProduct>[], total?: number }>,

    update(updates: Partial<IProduct>): Promise<{ updated: LeanDocument<IProduct> }>

    delete(id: string): Promise<boolean>
}
