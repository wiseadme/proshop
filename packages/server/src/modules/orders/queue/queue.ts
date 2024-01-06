import { JobsQueue } from '@common/services/JobsQueue'
import { injectable } from 'inversify'
import { ORDERS_QUEUE_NAME } from '@modules/orders/constants'
import { config } from '@app/config'

export interface IOrdersQueue {
    queue: JobsQueue
}
@injectable()
export class OrdersQueue implements IOrdersQueue {
    queue: JobsQueue = new JobsQueue({
        queueName: ORDERS_QUEUE_NAME,
        queueConnectOptions: {
            redisHost: config.redisHost,
            redisPort: config.redisPort,
        },
        jobOptions: {
            removeOnComplete: false,
            removeOnFail: true,
            passReturnValue: true
        },
        workerOptions: {
            autorun: true,
            concurrency: 4,
            runRetryDelay: 2000,
        }
    })
}
