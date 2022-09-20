declare interface IAttribute {
  _id: string
  key: string
  value: string
  meta?: string,
  order: number
}

declare interface IAttributeState {
  attributes: Maybe<Array<IAttribute>>
}

declare interface IAttributeActions {
  create(attribute: IAttribute): Promise<IAttribute>

  read(id?: string): Promise<Array<IAttribute>>

  update(updates: Array<IAttribute>): Promise<Array<IAttribute>>

  delete(id: string): Promise<boolean>
}
