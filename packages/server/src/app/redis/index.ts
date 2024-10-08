// import { inject, injectable } from 'inversify'
// import { TYPES } from '@common/schemes/di-types'
// import { ILogger } from '@/types/utils'
// import { IRedis } from '@/types'
// // import { redis } from '@app/redis/client'
// import Redis from 'ioredis'
//
// @injectable()
// export class RedisDb implements IRedis {
//     client: Redis = redis
//
//     constructor(
//         @inject(TYPES.UTILS.ILogger) private logger: ILogger
//     ) {}
//     connect() {
//         this.client.connect()
//         // this.client.flushDb()
//         this.addListeners()
//     }
//
//     addListeners() {
//         this.onConnect()
//         this.onReady()
//         this.onError()
//         this.onClose()
//     }
//
//     onConnect() {
//         this.client.on('connect', () => this.logger.log('Redis Client connected'))
//     }
//
//     onReady() {
//         this.client.on('ready', () => this.logger.log('Redis Client ready'))
//     }
//
//     onError() {
//         this.client.on('error', (err) => this.logger.error('Redis Client Error', err))
//     }
//
//     onClose() {
//         this.client.on('end', () => this.logger.log('Redis Client closed'))
//     }
// }
