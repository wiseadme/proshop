import { Rest } from '@shared/plugins/rest'
import axios from 'axios'

export const rest = new Rest(axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))

export const file = new Rest(axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))
