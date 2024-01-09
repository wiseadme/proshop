import Redis from 'ioredis'
import { config } from '@app/config'

// const url = process.env.NODE_ENV === 'development' ? 'redis://127.0.0.1:6379' : config.redisUrl
// const isDev = process.env.NODE_ENV === 'development'

export const redisClient = new Redis({
    host: config.redisHost,
    port: Number(config.redisPort),
    maxRetriesPerRequest: null,
})

redisClient.on('connect', () => {
    console.log('redis is connected to server app')
})

redisClient.on('connecting', () => {
    console.log('redis in connecting...')
})

redisClient.on('error', (err) => {
    console.log('redis connection error', err)
})

// https://github.com/redis/ioredis/issues/763
// https://reddeveloper.ru/questions/docker-ne-mozhet-podklyuchit-sya-k-redis-iz-drugoi-sluzhby-aLgNW
