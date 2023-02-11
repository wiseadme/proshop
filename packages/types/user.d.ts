import { Maybe } from './utils'

export interface IUserPosition {
  title: string
  department: string
}

export interface IUser {
  _id: string
  firstName: string
  secondName: string
  username?: string
  password: string
  phone: string
  roles: string[]
  position: Maybe<IUserPosition>
  accessToken?: Maybe<string>,
  refreshToken?: Maybe<string>,
  enabled: boolean
}
