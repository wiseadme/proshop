import axios from 'axios'
import { Client } from '@shared/plugins/client'
import { useAuthStore } from '@shared/store/auth'
import { useRouter } from 'vue-router'

const baseURL = '/'

const RestClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  baseURL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
})

const FilesClient = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
})

RestClient.interceptors.request.use(async (config) => {
  const authStore = useAuthStore()

  if (authStore.access_token) {
    config.headers!['Authorization'] = `Bearer ${ authStore.access_token }`
  }

  return config
})

RestClient.interceptors.response.use(
  (config) => config,
  (config) => {
    const router = useRouter()
    console.log(router)
    if (config.response.status === 401 || config.response.status === 403) {
      throw config.response
    } else {
      return config
    }
  })

export const file = new Client(FilesClient)
export const rest = new Client(RestClient)
