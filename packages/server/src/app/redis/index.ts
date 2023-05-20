import { createClient } from 'redis'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IRedis } from '@/types'
import * as process from 'process'
import { config } from '@app/config'

const url = process.env.NODE_ENV === 'development' ? '' : config.redisUrl

const client = createClient({
    url,
})

@injectable()
export class RedisClient implements IRedis {
    client: any

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
        this.client = client
    }

    connect() {
        this.client.connect()
        this.client.flushDb()
        this.addListeners()
    }

    addListeners() {
        this.onConnect()
        this.onReady()
        this.onError()
        this.onClose()
    }

    onConnect() {
        this.client.on('connect', () => this.logger.log('Redis Client connected'))
    }

    onReady() {
        this.client.on('ready', () => this.logger.log('Redis Client ready'))
    }

    onError() {
        this.client.on('error', (err) => this.logger.error('Redis Client Error', err))
    }

    onClose() {
        this.client.on('end', () => this.logger.log('Redis Client closed'))
    }
}
