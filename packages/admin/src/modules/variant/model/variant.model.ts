import { IVariant } from '@modules/variant/types'

export class Variant implements IVariant {
  _id: string
  group: string

  constructor({
    _id = '',
    group = '',
  }){
    this._id = _id
    this.group = group

  }

  static create(unit = {}){
    return new Variant(unit)
  }
}
