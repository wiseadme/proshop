import { Maybe } from './utils'

export interface IUser {
  _id: string
  firstName: string
  secondName: string
  email: string
  username: string
  password: string
  phone: string
  roles: string[]
  accessToken: string,
  refreshToken: string,
  enabled: boolean
}
