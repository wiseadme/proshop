import { auth } from '@shared/api'
import { IRest } from '@shared/types/app'
import { IUser } from '@proshop/types'

export interface IAuthRepository {
    login(user: IUser): Promise<{ data: { data: IUser, ok: boolean } }>

    logout(): Promise<{ data: { data: boolean, ok: boolean } }>

    create(user: IUser): Promise<{ data: { data: IUser, ok: boolean } }>

    whoAmI(): Promise<{ data: { data: IUser, ok: boolean } }>

    refresh(): Promise<{ data: { data: IUser, ok: boolean } }>
}

class Repository implements IAuthRepository {
    rest: IRest

    constructor(rest) {
        this.rest = rest
    }

    async login(user) {
        return this.rest.post('/v1/user/login', user)
    }

    async logout() {
        return this.rest.get('/v1/user/logout')
    }

    async create(user) {
        return this.rest.post('/v1/user/create', user)
    }

    async refresh() {
        return this.rest.get('/v1/user/refresh')
    }

    async whoAmI() {
        return this.rest.get('/v1/user/whoami')
    }
}

export const useAuthRepository = () => new Repository(auth)
