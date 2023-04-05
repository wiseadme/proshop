import { IAttribute } from '@ecommerce-platform/types'

export class Attribute implements IAttribute {
  private __id: string
  private _key: string
  private _value: string
  private _meta: string
  private _order: number

  constructor({
    _id = '',
    key,
    value,
    meta,
    order
  }){
    this.__id = _id
    this._key = key
    this._value = value
    this._meta = meta
    this._order = order
  }

  get _id() {
    return this.__id
  }

  get key(){
    return this._key
  }

  get value(){
    return this._value
  }

  get meta(){
    return this._meta
  }

  get order(){
    return this._order
  }

  static create(attribute: IAttribute){
    return new Attribute(attribute)
  }
}
