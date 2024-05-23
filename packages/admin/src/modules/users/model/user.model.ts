import { IUser } from '@proshop/types'

export class User implements IUser {
    id: IUser['id']
    firstName: IUser['firstName']
    secondName: IUser['secondName']
    password: IUser['password']
    phone: IUser['phone']
    position: IUser['position']
    roles: IUser['roles']
    username: IUser['username']
    enabled: IUser['enabled']

    constructor({
        id = '',
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
        this.id = id
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
