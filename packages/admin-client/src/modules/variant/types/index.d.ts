declare interface IVariant {
  _id: string
  group: string
}

declare interface IVariantActions {
  create(variant: IVariant): Promise<IVariant>

  read(id?: string): Promise<Array<IVariant>>

  delete(id: string): Promise<boolean>
}

declare interface IVariantState {
  variants: Maybe<Array<IVariant>>
}
