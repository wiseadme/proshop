import { IUnit } from '@ecommerce-platform/types/index'

export class Unit implements IUnit {
  _id: string
  value: string
  meta: string

  constructor({
      _id = '',
      value = '',
      meta = ''
  }){
      this._id = _id
      this.value = value
      this.meta = meta
  }

  static create(unit = {}){
      return new Unit(unit)
  }
}
