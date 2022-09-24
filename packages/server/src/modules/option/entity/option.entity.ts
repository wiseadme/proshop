import { IOption } from '../types/model'
import { Maybe } from '@/types/types'

export class Option implements IOption {
  private _name: string
  private _price?: number
  private _quantity?: number
  private _description?: Maybe<string>
  private _assets?: string[]

  constructor({
    name = '',
    price = 0,
    quantity = 0,
    description = null,
    assets = []
  }: IOption){
    this._name = name
    this._price = price
    this._quantity = quantity
    this._description = description
    this._assets = assets
  }

  get name(){
    return this._name
  }

  get price(){
    return this._price
  }

  get quantity(){
    return this._quantity
  }

  get description(){
    return this._description
  }

  get assets(){
    return this._assets
  }

  static create(option: IOption): IOption{
    return new Option(option)
  }
}
