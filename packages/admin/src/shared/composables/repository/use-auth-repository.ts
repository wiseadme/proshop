import { useHttp } from '@shared/composables/use-http'

import { IUser } from '@proshop-app/types'

export interface ILoginData {
    username: string
    password: string
}

export interface IAuthRepository {
    createUser(data: IUser): Promise<{ data: IUser, ok: boolean }>

    login(data: ILoginData): Promise<{ data: IUser, ok: boolean }>

    logout(): Promise<{ data: boolean, ok: boolean }>

    refreshToken(): Promise<{ data: IUser, ok: boolean }>

    whoAmI(): Promise<{ data: IUser, ok: boolean }>

    cancelAll(): void
}

export const useAuthRepository = (): IAuthRepository => {
    const { request, cancel } = useHttp()

    const login = (data: ILoginData) => request({
        url: '/api/v1/user/login',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: data,
    })

    const createUser = (data: IUser) => request({
        url: '/api/v1/user/create',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: data,
    })

    const refreshToken = () => request({ url: '/api/v1/user/refresh' })

    const logout = () => request({ url: '/api/v1/user/logout' })

    const whoAmI = () => request({ url: '/api/v1/user/whoAmI' })

    const cancelAll = () => cancel()

    return {
        createUser,
        login,
        refreshToken,
        logout,
        whoAmI,
        cancelAll
    }
}
