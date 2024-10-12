import { container } from '@common/dependencies'
import { OrdersQueueMiddleware } from '@modules/orders/middleware/orders.queue.middleware'
import { protect, getTokenChecker } from '@common/helpers'
import { injectable } from 'inversify'
import { NextFunction, Response, Request } from 'express'
import { CUSTOMER_TOKEN_KEY, USER_TOKEN_KEY } from '@common/constants/cookie-keys'

export interface IOrdersMiddlewares {
    getCreateOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getFindOrdersMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getDisbandOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getUpdateOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]

    getDeleteOrderMiddlewares(): ((req: Request, res: Response, next: NextFunction) => void | Promise<any>)[]
}

@injectable()
export class OrdersMiddlewares implements IOrdersMiddlewares {
    getFindOrdersMiddlewares() {
        return [
            getTokenChecker()
        ]
    }

    getCreateOrderMiddlewares() {
        const queueMiddleware = new OrdersQueueMiddleware(container)

        return [
            getTokenChecker(CUSTOMER_TOKEN_KEY),
            queueMiddleware.execute.bind(queueMiddleware)
        ]
    }

    getDisbandOrderMiddlewares() {
        return [
            getTokenChecker(USER_TOKEN_KEY),
            protect({ roles: ['root'] })
        ]
    }

    getUpdateOrderMiddlewares() {
        return [
            getTokenChecker(USER_TOKEN_KEY),
            protect({ roles: ['root'] })
        ]
    }

    getDeleteOrderMiddlewares() {
        return [
            getTokenChecker(USER_TOKEN_KEY),
            protect({ roles: ['root'] })
        ]
    }
}
