import { Document } from 'mongoose'
import { IVariant } from '@proshop/types'
import { id } from 'inversify'

export interface IVariantService {
    create(variant: IVariant): Promise<IVariant>

    read(): Promise<IVariant[]>

    update(updates: Partial<IVariant>): Promise<IVariant>

    delete(id: string): Promise<boolean>
}
