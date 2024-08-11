import { IAttribute } from '@proshop-app/types'

export interface IAttributeState {
    attributes: Maybe<IAttribute[]>
}

export interface IAttributeActions {
    create(attribute: IAttribute): Promise<IAttribute>

    read(id?: string): Promise<Array<IAttribute>>

    update(updates: IAttribute[]): Promise<IAttribute[]>

    delete(id: string): Promise<boolean>
}
