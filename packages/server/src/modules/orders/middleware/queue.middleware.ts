import { Request, Response, NextFunction } from 'express'
import { Container } from 'inversify'

import { ORDER_IOC } from '@modules/orders/di/di.types'
import { IOrdersQueue } from '@modules/orders/queue/queue'
import { IMiddleware } from '@/types/middlewares'

export class QueueMiddleware implements IMiddleware {
    #container: Container

    constructor(container: Container) {
        this.#container = container
    }

    async execute(req: Request, res: Response, next: NextFunction) {
        const jobs = this.#container.get(ORDER_IOC.IOrdersQueue) as IOrdersQueue

        const job = await jobs.queue.addJob(`${ Date.now() }`, req.body)
        req.headers.jobId = job.id

        return next()
    }
}
