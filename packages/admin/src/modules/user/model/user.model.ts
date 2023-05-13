import { IUser } from '@ecommerce-platform/types'

export class User implements IUser {
  _id: IUser['_id']
  firstName: IUser['firstName']
  secondName: IUser['secondName']
  password: IUser['password']
  phone: IUser['phone']
  position: IUser['position']
  roles: IUser['roles']
  username: IUser['username']
  enabled: IUser['enabled']

  constructor({
      _id = '',
      firstName = '',
      secondName = '',
      password = '',
      phone = '',
      roles = [],
      username = '',
      enabled = false,
      position = {
          title: '',
          department: ''
      }
  }: IUser) {
      this._id = _id
      this.firstName = firstName
      this.secondName = secondName
      this.password = password
      this.phone = phone
      this.position = position
      this.roles = roles
      this.username = username
      this.enabled = enabled
  }

  static create(user = {} as IUser) {
      return new User(user)
  }
}
