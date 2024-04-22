// import { auth } from '@shared/api'
import { IRest } from '@shared/types/app'
import { IUser } from '@proshop/types'
import { AxiosResponse } from 'axios'
import { Client } from '@shared/plugins/client'
import { authClient } from '@shared/api'

export interface IAuthRepository {
    login(user: { username: string, password: string }): Promise<AxiosResponse<{ data: IUser, ok: boolean }>>

    logout(): Promise<AxiosResponse<{ data: boolean, ok: boolean }>>

    create(user: IUser): Promise<AxiosResponse<{ data: IUser, ok: boolean }>>

    whoAmI(): Promise<AxiosResponse<{ data: IUser, ok: boolean }>>

    refresh(): Promise<AxiosResponse<{ data: IUser, ok: boolean }>>
}

class Repository implements IAuthRepository {
    client: IRest
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    async login(user: { username: string, password: string }) {
        return this.client.post(`${ this.path }/login`, user)
    }

    async logout() {
        return this.client.get(`${ this.path }/logout`)
    }

    async create(user) {
        return this.client.post(`${ this.path }/create`, user)
    }

    async refresh() {
        return this.client.get(`${ this.path }/refresh`)
    }

    async whoAmI() {
        return this.client.get(`${ this.path }/whoami`)
    }
}

export const useAuthRepository = () => new Repository({
    client: new Client(authClient),
    path: '/api/v1/user',
})
