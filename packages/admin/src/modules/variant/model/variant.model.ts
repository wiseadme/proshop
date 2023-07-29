import { IVariant } from '@proshop/types'

export class Variant implements IVariant {
  id: string
  group: string

  constructor({
      id = '',
      group = '',
  }){
      this.id = id
      this.group = group
  }

  static create(unit = {}){
      return new Variant(unit)
  }
}
