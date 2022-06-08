import { Rest } from '@shared/plugins/rest'
import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:5000'

export const rest = new Rest(axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  baseURL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))

export const file = new Rest(axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))
