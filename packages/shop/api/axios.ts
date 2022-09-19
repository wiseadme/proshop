import axios from 'axios'

const baseURL = 'http://localhost:3000'

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  baseURL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
})
