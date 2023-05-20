import { config } from '@app/config'
import { createClient } from 'redis'

const url = process.env.NODE_ENV === 'development' ? '' : config.redisUrl

export const redisClient = createClient({
    url,
})

export class RedisClient {
    url: string

    constructor() {

    }
}
