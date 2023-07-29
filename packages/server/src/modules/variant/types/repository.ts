import { Document } from 'mongoose'
import { IVariant } from '@proshop/types'

export interface IVariantRepository {
    create(variant: IVariant): Promise<IVariant>

    read(): Promise<IVariant[]>

    update(updates: Partial<IVariant>): Promise<{ updated: IVariant }>

    delete(id: string): Promise<boolean>
}
