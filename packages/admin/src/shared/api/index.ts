import { unref } from 'vue'
import axios from 'axios'
import { Client } from '@shared/plugins/client'
import { useAuthService } from '@shared/composables/use-auth-service'

const baseURL = '/'

export const restClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    baseURL,
    withCredentials: true,
    maxContentLength: 50000000,
    timeout: 10000,
})

export const authClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL,
    withCredentials: true,
    maxContentLength: 50000000,
    timeout: 10000,
})

export const filesClient = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    baseURL,
    withCredentials: true,
    maxContentLength: 50000000,
    timeout: 10000,
})

let controller: AbortController = {} as AbortController
let promise: Promise<any> | null = null

restClient.interceptors.request.use(async (config): Promise<any> => {
    const { user, refresh, logout } = useAuthService()

    if (!unref(user) || unref(user)!.exp! * 1000 <= Date.now()) {
        controller = new AbortController()

        promise ??= refresh().catch(logout)

        await promise
            .then(() => promise = null)
            .catch(() => controller.abort('Not authenticated request'))
    }

    return {
        ...config,
        controller: controller.signal
    }
})

export const file = new Client(filesClient)
export const rest = new Client(restClient)
export const auth = new Client(authClient)
