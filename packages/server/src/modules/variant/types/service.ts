import { IVariant } from '@proshop-app/types'

export interface IVariantService {
    create(variant: IVariant): Promise<IVariant>

    read(): Promise<IVariant[]>

    update(updates: Partial<IVariant>): Promise<IVariant>

    delete(id: string): Promise<boolean>
}
