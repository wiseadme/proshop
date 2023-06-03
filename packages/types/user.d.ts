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
    accessToken?: string,
    refreshToken?: string,
    enabled: boolean
    exp?: number
}
