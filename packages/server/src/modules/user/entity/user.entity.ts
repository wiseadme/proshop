import { IUser, IUserPosition, Maybe } from '@proshop/types'

export class User implements IUser {
    public _id: string
    private _firstName: string
    private _secondName: string
    private _username?: string
    private _password: string
    private _phone: string
    private _roles: string[]
    private _position: Maybe<IUserPosition>
    private _accessToken?: string
    private _refreshToken?: string
    private _enabled: boolean

    constructor({
        _id = '',
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
        this._id = _id
        this._firstName = firstName
        this._secondName = secondName
        this._username = username || phone
        this._password = password
        this._roles = roles
        this._phone = phone
        this._position = position
        this._accessToken = accessToken
        this._refreshToken = refreshToken
        this._enabled = enabled
    }

    get firstName() {
        return this._firstName
    }

    get secondName() {
        return this._secondName
    }

    get userName() {
        return this._username
    }

    get password() {
        return this._password
    }

    get roles() {
        return this._roles
    }

    get phone() {
        return this._phone
    }

    get position() {
        return this._position
    }

    get accessToken() {
        return this._accessToken
    }

    get refreshToken() {
        return this._refreshToken
    }

    get enabled() {
        return this._enabled
    }

    static create(user) {
        return new User(user)
    }
}
