import express, { Application } from 'express'
import { inject, injectable, multiInject } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IController, IDb, IRedis } from '@/types'
import { IErrorRouteMiddleware, IMiddleware } from '@/types/middlewares'
import { ILogger } from '@/types/utils'
import { config } from './config'

@injectable()
class App {
    public app: Application
    public port: number

    constructor(
        @inject(TYPES.DB) private db: IDb,
        // @inject(TYPES.REDIS) private redis: IRedis,
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.MIDDLEWARES.IErrorRouteMiddleware) private errorRouteMiddleware: IErrorRouteMiddleware,
        @multiInject(TYPES.CONTROLLERS.IController) private controllers: IController[],
        @multiInject(TYPES.MIDDLEWARES.IMiddleware) private middlewares: IMiddleware[],
    ) {
        this.app = express()
        this.port = config.port

        this.middleWares(middlewares)
        this.routes(controllers)
        this.db.connect()
        // this.redis.connect()
    }

    private middleWares(middleWares: Array<any>) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare.execute.bind(middleWare))
        })
    }

    private routes(controllers: Array<IController>) {
        controllers.forEach(controller => this.app.use(controller.path, controller.router))

        this.app.use(this.errorRouteMiddleware.execute as any)
    }

    public listen() {
        this.app.listen(this.port, () => this.logger.log('server is running on', this.port))
    }
}

export default App
