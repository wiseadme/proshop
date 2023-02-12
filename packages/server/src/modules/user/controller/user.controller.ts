import { Response, Request, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { IUserService } from '@modules/user/types/service'

@injectable()
export class UserController extends BaseController implements IController {
  public path: string = '/v1/user'
  public router: Router = Router()

  constructor(
    @inject(TYPES.SERVICES.IUserService) private service: IUserService
  ) {
    super()
    this.initRoutes()
  }

  initRoutes() {
    this.router.post('/login', expressAsyncHandler(this.login.bind(this)))
    this.router.get('/logout', expressAsyncHandler(this.logout.bind(this)))
    this.router.post('/create', expressAsyncHandler(this.create.bind(this)))
    this.router.get('/whoami', expressAsyncHandler(this.whoami.bind(this)))
    this.router.get('/refresh', expressAsyncHandler(this.refresh.bind(this)))
    this.router.get('/', expressAsyncHandler(this.getUsers.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteUser.bind(this)))
  }

  async login({ body, method, url }: Request, res: Response) {
    try {
      const data = await this.service.login(body, res)

      this.send({
        response: res,
        data,
        url: this.path + url,
        method
      })
    } catch (error) {
      return this.error({
        method,
        error,
        url: this.path + url
      })
    }
  }

  async logout({ cookies, method, url }: Request, res: Response) {
    try {
      const data = await this.service.logout(cookies, res)

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

  async create({ body, method, url, cookies }: Request, res: Response) {
    try {
      const data = await this.service.create(body)

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

  async getUsers({ body, method, url, cookies }: Request, res: Response) {
    try {
      const data = await this.service.getUsers(body)

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

  async whoami({ method, url, cookies }: Request, res: Response) {
    try {
      const data = await this.service.whoami(cookies)

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

  async refresh({ method, url, cookies }: Request, res: Response) {
    try {
      const data = await this.service.refresh(cookies, res)

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

  async deleteUser({ query, method, url }: Request<{}, {}, {}, { id: string }>, res: Response) {
    try {
      const data = await this.service.deleteUser(query.id)

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
