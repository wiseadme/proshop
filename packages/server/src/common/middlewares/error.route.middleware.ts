import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '@/types/utils'
import { IErrorRouteMiddleware } from '@/types/middlewares'

@injectable()
export class ErrorRouteMiddleware implements IErrorRouteMiddleware {
  public bind: boolean

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
    this.bind = true
  }

  execute(err, req, res, next){
    res?.status(err.status).json(err)
  }
}
