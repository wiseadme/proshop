export class Attribute implements IAttribute {
  _id: IAttribute['_id']
  key: IAttribute['key']
  value: IAttribute['value']
  meta: IAttribute['meta']
  order: IAttribute['order']

  constructor({ _id = '', key = '', value = '', meta = '', order = 0 }){
    this._id = _id
    this.key = key
    this.value = value
    this.meta = meta
    this.order = order
  }

  static create(attribute = {}){
    return new Attribute(attribute)
  }
}
