import { Router, Request, Response } from 'express'
import { injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'

@injectable()
export class CurrencyController extends BaseController implements IController {
  public path = '/v1/currency'
  public router = Router()

  constructor() {
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