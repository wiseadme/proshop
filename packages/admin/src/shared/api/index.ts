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
        Accept: 'application/json',
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

let isInProgress: boolean = false
let response: any = null

const wrapper = (action) => {
    return async () => {
        if (!isInProgress) {
            isInProgress = true

            return await action()
        }
    }
}

// @ts-ignore
restClient.interceptors.request.use(async (config) => {
    const { user, refresh, logout } = useAuthService()

    if (!unref(user)) {
        await new Promise(resolve => {
            const waitForUser = () => {

                if (unref(user)) {
                    return resolve(true)
                }

                setTimeout(waitForUser)
            }

            waitForUser()
        })
    }

    if (unref(user)!.exp! * 1000 <= Date.now()) {
        const makeOnce = wrapper(refresh)

        if (!isInProgress) {
            response = await makeOnce()

            if (response && response.exp) {
                isInProgress = false

                return config
            }

            return logout()
        }
    }

    return config
})

export const file = new Client(filesClient)
export const rest = new Client(restClient)
export const auth = new Client(authClient)
