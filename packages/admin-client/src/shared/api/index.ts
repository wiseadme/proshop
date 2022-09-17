import axios from 'axios'
import { Client } from '@shared/plugins/client'

const baseURL = process.env.NODE_ENV === 'development' ? '/' : '/'

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

// RestClient.interceptors.request.use(config => ({
//   ...config,
// }))


export const file = new Client(FilesClient)
export const rest = new Client(RestClient)
