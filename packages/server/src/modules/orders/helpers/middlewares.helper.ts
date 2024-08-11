import { container } from '@common/dependencies'
import { OrdersQueueMiddleware } from '@modules/orders/middleware/orders.queue.middleware'
import { protect, checkToken } from '@common/helpers'
import { injectable } from 'inversify'
import { NextFunction, Response, Request } from 'express'

export interface IOrdersMiddlewaresHelper {
    getCreateOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getDisbandOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getUpdateOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getDeleteOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]
}

@injectable()
export class OrdersMiddlewaresHelper implements IOrdersMiddlewaresHelper {
    getCreateOrderMiddlewares() {
        const queueMiddleware = new OrdersQueueMiddleware(container)

        return [
            queueMiddleware.execute.bind(queueMiddleware)
        ]
    }

    getDisbandOrderMiddlewares() {
        return [
            checkToken,
            protect({ roles: ['root'] })
        ]
    }

    getUpdateOrderMiddlewares() {
        return [
            checkToken,
            protect({ roles: ['root'] })
        ]
    }

    getDeleteOrderMiddlewares() {
        return [
            checkToken,
            protect({ roles: ['root'] })
        ]
    }
}
