import { JobsQueue } from '@common/services/JobsQueue'
import { injectable } from 'inversify'
import { ORDERS_QUEUE_NAME } from '@modules/orders/constants'
import { config } from '@app/config'
import * as process from 'process'

export interface IOrdersQueue {
    queue: JobsQueue
}

const isDev = process.env.NODE_ENV === 'development'

@injectable()
export class OrdersQueue implements IOrdersQueue {
    queue: JobsQueue = new JobsQueue({
        queueName: ORDERS_QUEUE_NAME,
        queueConnectOptions: {
            redisHost: isDev ? 'localhost' : config.redisHost,
            redisPort: config.redisPort,
        },
        jobOptions: {
            removeOnComplete: false,
            removeOnFail: true,
            passReturnValue: true
        },
        workerOptions: {
            autorun: true,
            concurrency: 2,
            runRetryDelay: 2000,
        }
    })
}
