import { Job, Queue, QueueEvents, Worker } from 'bullmq'
import {redisClient} from '@app/redis/client'

export interface IQueueConnectionOptions {
    redisHost: string
    redisPort: number | string
}

export interface IJobRemoveOptions {
    removeOnComplete?: boolean | Record<string, any>
    removeOnFail?: boolean | Record<string, any>
    passReturnValue?: boolean
}

export interface IQueueWorkerOptions {
    autorun?: boolean,
    concurrency?: number,
    runRetryDelay?: number
}

export interface IQueueOptions {
    queueName: string
    queueConnectOptions: IQueueConnectionOptions
    jobOptions: IJobRemoveOptions
    workerOptions: IQueueWorkerOptions
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
        this.initWorker()
        this.initWorkerListeners()
    }

    initQueue() {
        this.queue = new Queue(this.options.queueName, {
            connection: redisClient,
        })
    }

    initQueueEvents() {
        this.events = new QueueEvents(this.options.queueName)
    }

    async jobProcessor(job: Job) {
        console.log(`Create order Job with id ${job.id}`)

        try {
            const data = await this.fn(job.data)
            await job.updateProgress(100)

            return data
        } catch (err) {
            console.log(err)
        }
    }

    setJobProcessor(fn: (data: any) => Promise<any>) {
        this.fn = fn
    }

    initWorker() {
        this.worker = new Worker(this.options.queueName, this.jobProcessor.bind(this), {
            connection: redisClient,
            ...this.options.workerOptions,
        })
    }

    initWorkerListeners() {
        this.onComplete()
        this.onActive()
        this.onError()
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

    onComplete() {
        this.worker.on('completed', async (job: Job, value: any) => {
            console.debug(`Completed job with id ${job.id}`)

            return value
        })
    }

    onActive() {
        this.worker.on('active', (job: Job<unknown>) => {
            console.debug(`Completed job with id ${job.id}`)
        })
    }

    onError() {
        this.worker.on('error', (failedReason: Error) => {
            console.error(`Job encountered an error`, failedReason)
        })
    }
}
