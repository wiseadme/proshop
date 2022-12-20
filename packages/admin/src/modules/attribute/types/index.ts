import { IAttribute } from '@ecommerce-platform/types/index'

export interface IAttributeState {
  attributes: Maybe<Array<IAttribute>>
}

export interface IAttributeActions {
  create(attribute: IAttribute): Promise<IAttribute>

  read(id?: string): Promise<Array<IAttribute>>

  update(updates: Array<IAttribute>): Promise<Array<IAttribute>>

  delete(id: string): Promise<boolean>
}
