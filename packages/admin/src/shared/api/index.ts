import axios from 'axios'
import { Client } from '@shared/plugins/client'
import { useAuthService } from '@shared/services/auth.service'

const baseURL = '/'

const RestClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  baseURL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 10000
})

const AuthClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  baseURL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 10000
})

const FilesClient = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 10000
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
RestClient.interceptors.request.use(async (config) => {
  const authService = useAuthService()

  if (authService.user && (authService.user.exp * 1000) <= Date.now()) {
    const makeOnce = wrapper(authService.refresh.bind(authService))

    if (!isInProgress) {
      response = await makeOnce()

      if (response && response.ok) {
        isInProgress = false

        return config
      } else {
        await authService.logout()
      }
    }
  } else {
    return config
  }
})

RestClient.interceptors.response.use(
  (config) => config,
  (config) => {
    if (config.response?.status === 401 || config.response?.status === 403) {
      // useAuthService().logout()
    } else {
      return config
    }
  })

export const file = new Client(FilesClient)
export const rest = new Client(RestClient)
export const auth = new Client(AuthClient)
