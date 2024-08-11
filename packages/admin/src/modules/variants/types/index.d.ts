import { IVariant } from '@proshop-app/types'

declare interface IVariantActions {
    create(variant: IVariant): Promise<IVariant>

    update(updates: Partial<IVariant>): Promise<IVariant>

    read(params?: Partial<IVariant>): Promise<Array<IVariant>>

    delete(id: string): Promise<boolean>
}

declare interface IVariantState {
    variants: Maybe<Array<IVariant>>
}
