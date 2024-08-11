import { IUser, IUserPosition, Maybe } from '@proshop-app/types'

export class User implements IUser {
    readonly id: string
    readonly firstName: string
    readonly secondName: string
    readonly username?: string
    readonly password: string
    readonly phone: string
    readonly roles: string[]
    readonly position: Maybe<IUserPosition>
    readonly accessToken?: string
    readonly refreshToken?: string
    readonly enabled: boolean

    constructor({
        id = '',
        firstName,
        secondName,
        username,
        password,
        phone,
        roles = [],
        position = null,
        accessToken,
        refreshToken,
        enabled = false,
    }) {
        this.id = id
        this.firstName = firstName
        this.secondName = secondName
        this.username = username || phone
        this.password = password
        this.roles = roles
        this.phone = phone
        this.position = position
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.enabled = enabled
    }

    static create(user) {
        return new User(user)
    }
}
