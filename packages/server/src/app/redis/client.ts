// import { injectable } from 'inversify'
import { createClient } from 'redis'
import { config } from '@app/config'

const url = process.env.NODE_ENV === 'development' ? '' : config.redisUrl

export const redisClient = createClient({
    url,
})
