import { IMerchant } from '@ecommerce-platform/types'

export class Merchant implements IMerchant{
  private __id: IMerchant['_id']
  private _organization: IMerchant['organization']
  private _name: IMerchant['name']
  private _description: IMerchant['description']
  private _logo: IMerchant['logo']
  private _slogan: IMerchant['slogan']
  private _address: IMerchant['address']
  private _email: IMerchant['email']
  private _phone: IMerchant['phone']
  private _currency: IMerchant['currency']
  private _stores: IMerchant['stores']
  private _social: IMerchant['social']

  constructor({
    _id = '',
    organization,
    name,
    currency,
    description = null,
    logo = null,
    slogan = null,
    address = null,
    email = null,
    phone = null,
    stores = [],
    social = null,
  }: IMerchant) {
    this.__id = _id
    this._organization = organization
    this._name = name
    this._currency = currency
    this._description = description
    this._logo = logo
    this._slogan = slogan
    this._address = address
    this._email = email
    this._email = email
    this._phone = phone
    this._stores = stores
    this._social = social
  }

  get _id() {
    return this.__id
  }
  get organization() {
    return this._organization
  }

  get name() {
    return this._name
  }

  get currency() {
    return this._currency
  }

  get description() {
    return this._description
  }

  get logo() {
    return this._logo
  }

  get slogan() {
    return this._slogan
  }

  get address() {
    return this._address
  }

  get email() {
    return this._email
  }

  get phone() {
    return this._phone
  }

  get stores() {
    return this._stores
  }

  get social() {
    return this._social
  }

  static create(merchant: IMerchant) {
    return new Merchant(merchant)
  }
}
