import { Document } from 'mongoose'
import { IVariant } from '@proshop/types'

export interface IVariantRepository {
    create(variant: IVariant): Promise<Document>

    read(): Promise<Array<Document>>

    update(updates: Partial<IVariant & Document>): Promise<{ updated: Document<IVariant> }>

    delete(id: string): Promise<boolean>
}
