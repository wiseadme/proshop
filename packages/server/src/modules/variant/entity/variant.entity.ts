import { IVariant } from '../types/model'

export class Variant {
  private readonly _group: string

  constructor({ group }){
    this._group = group
  }

  get group(){
    return this._group
  }

  static create(variant: IVariant){
    return new Variant(variant as IVariant)
  }
}
