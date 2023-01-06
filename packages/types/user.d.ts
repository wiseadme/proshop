import { Maybe } from './utils'

export interface IUser {
  firstName: string
  secondName: string
  email: string
  login: string
  password: string
  phone: string
  roles: string[]
  accessToken: Maybe<string>,
  refreshToken: Maybe<string>,
  enabled: boolean
}
