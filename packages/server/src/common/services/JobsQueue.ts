import { Job, Queue, QueueEvents, Worker } from 'bullmq'
import { redis } from '@app/redis/client'
import Redis from 'ioredis'

export interface IQueueConnection {
    host: string
    port: number | string
}

export interface IJobRemoveOptions {
    removeOnComplete?: boolean | Record<string, any>
    removeOnFail?: boolean | Record<string, any>
    passReturnValue?: boolean
}

export interface IQueueOptions {
    queueName: string
    connection: IQueueConnection| Redis
    jobOptions: IJobRemoveOptions
}

export class JobsQueue {
    public queue: Queue
    public events: QueueEvents
    public worker: Worker
    options: IQueueOptions
    fn: (data: any) => Promise<any>

    constructor(options: IQueueOptions) {
        this.options = options

        this.initQueue()
        this.initQueueEvents()
    }

    initQueue() {
        this.queue = new Queue(this.options.queueName, {
            connection: redis,
        })
    }

    initQueueEvents() {
        this.events = new QueueEvents(this.options.queueName)
    }

    addJob<T>(id: string, data: T, options = {}): Promise<Job<T>> {
        return this.queue.add(`${id}`, data, {
            ...this.options.jobOptions,
            ...options,
        })
    }

    getJob(id: string) {
        return this.queue.getJob(id)
    }

    async waitJobResult(job: Job): Promise<any> {
        await job.waitUntilFinished(this.events)
        return (await Job.fromId(this.queue, job.id!) as Job).returnvalue
    }

    removeJob(id: string) {
        return this.queue.remove(id)
    }
}
