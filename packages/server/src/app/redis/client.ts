// import { injectable } from 'inversify'
import { createClient } from 'redis'
import { config } from '@app/config'

const url = process.env.NODE_ENV === 'development' ? 'redis://127.0.0.1:6379' : config.redisUrl

export const redisClient = createClient({
    url,
})
