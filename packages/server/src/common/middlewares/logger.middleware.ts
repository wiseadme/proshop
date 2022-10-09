import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '@/types/utils'
import { IMiddleware } from '@/types/middlewares'


@injectable()
export class LoggerMiddleware implements IMiddleware{
  public bind: boolean
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
    this.bind = true
  }

  public execute(req, res, next) {
    this.logger.info('request:', req.method, req.path)
    next()
  }
}
