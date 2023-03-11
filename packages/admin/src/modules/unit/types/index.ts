import { IUnit, Maybe } from '@ecommerce-platform/types'

export interface IUnitActions {
  create(unit: IUnit): Promise<IUnit>

  read(params?: Partial<IUnit>): Promise<Array<IUnit>>

  update(updates: Partial<IUnit>): Promise<IUnit>

  delete(id: string): Promise<boolean>
}

export interface IUnitState {
  units: Maybe<Array<IUnit>>
}
