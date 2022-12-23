import express, { Application } from 'express'
import { inject, injectable, multiInject } from 'inversify'
import { DB } from './db'
import { TYPES } from '@common/schemes/di-types'
import { IController } from '@/types'
import { IErrorRouteMiddleware, IMiddleware } from '@/types/middlewares'
import { ILogger } from '@/types/utils'
import config from './config'

@injectable()
class App {
  public app: Application
  public port: number

  constructor(
    @inject(TYPES.DB) private db: DB,
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.MIDDLEWARES.IErrorRouteMiddleware) private errorRouteMiddleware: IErrorRouteMiddleware,
    @multiInject(TYPES.CONTROLLERS.IController) private controllers: IController[],
    @multiInject(TYPES.MIDDLEWARES.IMiddleware) private middlewares: IMiddleware[],
  ){
    this.app = express()
    this.port = config.port

    this.middleWares(middlewares)
    this.routes(controllers)
    this.db.connect()
  }

  private middleWares(middleWares: Array<any>){
    middleWares.forEach(middleWare => {
      if (middleWare.bind) {
        this.app.use(middleWare.execute.bind(middleWare))
      } else {
        this.app.use(middleWare.execute)
      }
    })
  }

  private routes(controllers: Array<IController>){
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })

    this.app.use(this.errorRouteMiddleware.execute as any)
  }

  public listen(){
    this.app.listen(this.port, () => this.logger.log('server is running on', this.port))
  }
}

export default App
