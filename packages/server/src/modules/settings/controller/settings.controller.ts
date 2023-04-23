import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { TYPES } from '@common/schemes/di-types'

@injectable()
export class SettingsController extends BaseController implements IController {
  public path = '/v1/settings'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
  ) {
    super()
    this.initRoutes()
  }

  initRoutes() {

  }

  async create(req: Request, res: Response) {

  }

  async read(req: Request, res: Response) {

  }

  async update(req: Request, res: Response) {

  }

  async delete(req: Request, res: Response) {

  }
}
