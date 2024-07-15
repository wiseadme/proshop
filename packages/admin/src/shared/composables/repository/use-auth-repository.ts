import { useHttp } from '@shared/composables/use-http'

import { IUser } from '@proshop-app/types'

interface ILoginData {
    username: string
    password: string
}

interface IAuthRepository {
    createUser(data: IUser): Promise<{ data: { data: IUser } }>

    login(data: ILoginData): Promise<{ data: { data: IUser } }>

    logout(): Promise<{ data: { data: boolean } }>

    refreshToken(): Promise<{ data: { data: IUser } }>

    whoAmI(): Promise<{ data: { data: IUser } }>

    cancelAll(): void
}

export const useAuthRepository = (): IAuthRepository => {
    const http = useHttp()

    http.hooks.beforeRequest.use(async (options, cancel) => {
        console.log(options, cancel)
    })

    const login = (data: ILoginData) => http.request('/api/v1/user/login', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    })

    const createUser = (data: IUser) => http.request('/api/v1/user/create', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const refreshToken = () => http.request('/api/v1/user/refresh')

    const logout = () => http.request('/api/v1/user/logout')

    const whoAmI = () => http.request('/api/v1/user/whoAmI')

    const cancelAll = () => http.cancel()

    return {
        createUser,
        login,
        refreshToken,
        logout,
        whoAmI,
        cancelAll
    }
}
