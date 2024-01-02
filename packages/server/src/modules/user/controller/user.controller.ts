import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { IUserService } from '@modules/user/types/service'
import { USER_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'

@injectable()
export class UserController extends BaseController implements IController {
    public path: string = USER_MODULE_PATH
    public router: Router = Router()

    constructor(
      @inject(TYPES.SERVICES.IUserService) private service: IUserService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/login', this.login.bind(this))
        this.router.get('/logout', this.logout.bind(this))
        this.router.post('/create', setMiddlewares({ roles: ['root'] }), this.create.bind(this))
        this.router.get('/whoami', this.whoami.bind(this))
        this.router.get('/refresh', this.refresh.bind(this))
        this.router.get('/', this.getUsers.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteUser.bind(this))
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.login(request.body, response)

            this.send({ data, response, request })
        } catch (error) {
            this.error({ request, error, next })
        }
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.logout(request.cookies, response)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, response, request })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getUsers(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async whoami(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.whoami(request.cookies)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.service.refresh(request.cookies, response)

            this.send({ data, request, response })

        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteUser(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteUser(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
