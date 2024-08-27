// import { JobsQueue } from '@common/services/JobsQueue'
// import { injectable } from 'inversify'
// import { ORDERS_QUEUE_NAME } from '@modules/orders/constants'
// import { config } from '@app/config'
// import * as process from 'process'
// import { JobsWorker } from '@common/services/JobsWorker'
//
// export interface IOrdersQueue {
//     queue: JobsQueue
//     worker: JobsWorker
// }
//
// const isDev = process.env.NODE_ENV === 'development'
// const host = isDev ? 'localhost' : config.redisHost
// const port = Number(config.redisPort)
//
// @injectable()
// export class OrdersQueue implements IOrdersQueue {
//     queue: JobsQueue = new JobsQueue({
//         queueName: ORDERS_QUEUE_NAME,
//         connection: { host, port },
//         jobOptions: {
//             removeOnComplete: false,
//             removeOnFail: true,
//             passReturnValue: true,
//         },
//     })
//
//     worker: JobsWorker = new JobsWorker({
//         queueName: ORDERS_QUEUE_NAME,
//         connection: { host, port },
//         autorun: true,
//         concurrency: 2,
//         runRetryDelay: 2000,
//     })
// }
