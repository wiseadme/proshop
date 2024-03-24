import { container } from '@common/dependencies'
import { OrderTypes } from '@modules/orders/di/di.types'
import { IOrdersQueue } from '@modules/orders/queue/queue'

export const queueMiddleware = async (req, res, next) => {
    const jobs = container.get(OrderTypes.ORDERS_QUEUE) as IOrdersQueue

    const job = await jobs.queue.addJob(`${Date.now()}`, req.body)
    req.headers.jobId = job.id

    return next()
}
