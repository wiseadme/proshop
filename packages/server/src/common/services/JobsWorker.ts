// import { Job, Worker } from 'bullmq'
// import Redis from 'ioredis'
//
// export interface IWorkerConnection {
//     host: string
//     port: number
// }
//
// export interface IQueueWorkerOptions {
//     autorun?: boolean,
//     concurrency?: number,
//     runRetryDelay?: number
//     queueName: string
//     connection: IWorkerConnection | Redis
// }
//
// export class JobsWorker {
//     options: IQueueWorkerOptions
//     worker: Worker
//     fn: (...args: any) => Promise<any>
//
//     constructor(options: IQueueWorkerOptions) {
//         this.options = options
//
//         this.initWorker()
//         this.initWorkerListeners()
//     }
//
//     initWorker() {
//         const { autorun, runRetryDelay, concurrency, connection, queueName } = this.options
//
//         this.worker = new Worker(queueName, this.jobProcessor.bind(this), {
//             connection,
//             autorun,
//             runRetryDelay,
//             concurrency,
//         })
//     }
//
//     initWorkerListeners() {
//         this.onComplete()
//         this.onActive()
//         this.onError()
//     }
//
//     setJobProcessor(fn: (data: any) => Promise<any>) {
//         this.fn = fn
//     }
//
//     async jobProcessor(job: Job) {
//         console.log(`Create Job with id ${job.id}`)
//
//         try {
//             const data = await this.fn(job.data)
//             await job.updateProgress(100)
//
//             return data
//         } catch (err) {
//             console.log(err)
//         }
//     }
//
//     onComplete() {
//         this.worker.on('completed', async (job: Job, value: any) => {
//             console.debug(`Completed job with id ${job.id}`)
//
//             return value
//         })
//     }
//
//     onActive() {
//         this.worker.on('active', (job: Job<unknown>) => {
//             console.debug(`Completed job with id ${job.id}`)
//         })
//     }
//
//     onError() {
//         this.worker.on('error', (failedReason: Error) => {
//             console.error(`Job encountered an error`, failedReason)
//         })
//     }
// }
