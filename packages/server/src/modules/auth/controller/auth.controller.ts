import { Response, Request, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { IAuthService } from '@modules/auth/types/service'

@injectable()
export class AuthController extends BaseController implements IController {
  public path: string = '/v1/auth'
  public router: Router = Router()

  constructor(
    @inject(TYPES.SERVICES.IAuthService) private service: IAuthService
  ){
    super()
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/login', expressAsyncHandler(this.login.bind(this)))
  }

  async login({ body, method, url }: Request, res: Response){
    try {
      const data = await this.service.login(body)

      this.send({
        response: res,
        data,
        url: this.path,
        method
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url
      })
    }
  }

  create(){

  }
}
