import { IUnit } from '@ecommerce-platform/types'

export interface IUnitActions {
  create(unit: IUnit): Promise<IUnit>

  read(id?: string): Promise<Array<IUnit>>

  delete(id: string): Promise<boolean>
}

export interface IUnitState {
  units: Maybe<Array<IUnit>>
}
