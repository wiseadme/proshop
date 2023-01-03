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
    this.router.get('/logout', expressAsyncHandler(this.logout.bind(this)))
    this.router.post('/create', expressAsyncHandler(this.create.bind(this)))
    this.router.get('/check', expressAsyncHandler(this.check.bind(this)))
    this.router.get('/refresh', expressAsyncHandler(this.refresh.bind(this)))
  }

  async login({ body, method, url }: Request, res: Response){
    try {
      const data = await this.service.loginUser(body, res)

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

  async logout({ cookies, method, url }: Request, res: Response){
    try {
      const data = await this.service.logoutUser(cookies, res)

      this.send({
        response: res,
        data,
        method,
        url: this.path + url
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }

  async create({ body, method, url, cookies }: Request, res: Response){
    try {
      const data = await this.service.createUser(body, cookies)

      this.send({
        response: res,
        data,
        method,
        url: this.path + url
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }

  async check({ method, url, cookies }: Request, res: Response){
    try {
      const data = await this.service.checkMe(cookies)

      this.send({
        response: res,
        data,
        method,
        url: this.path + url
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }

  async refresh({ method, url, cookies }: Request, res: Response){
    try {
      const data = await this.service.updateAccessToken(cookies, res)

      this.send({
        response: res,
        data,
        method,
        url: this.path + url
      })

    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }
}
