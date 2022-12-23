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

const FilesClient = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 10000
})

RestClient.interceptors.request.use(async (config) => {
  const user = useAuthService()?.user

  if (user && (user.exp * 1000) <= Date.now()) {
    console.log('token is expired')
  }

  return config
})

RestClient.interceptors.response.use(
  (config) => config,
  (config) => {
    if (config.response.status === 401 || config.response.status === 403) {
      useAuthService().logout()
    } else {
      return config
    }
  })

export const file = new Client(FilesClient)
export const rest = new Client(RestClient)
