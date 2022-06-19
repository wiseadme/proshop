declare interface IUnit {
  _id: string
  value: string
  meta: Maybe<string>
}

declare interface IUnitActions {
  create(unit: IUnit): Promise<IUnit>

  read(id?: string): Promise<Array<IUnit>>

  delete(id: string): Promise<boolean>
}

declare interface IUnitState {
  units: Maybe<Array<IUnit>>
}
