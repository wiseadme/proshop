import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { GROUP_MODULE_PATH } from '@common/constants/paths'
import { IGroup } from '@proshop/types'
import { GROUP_IOC } from '@modules/group/di/di.types'
import { IGroupService } from '@modules/group/types/service'

@injectable()
export class GroupController extends BaseController implements IController {
    public path = GROUP_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(GROUP_IOC.IGroupService) private service: IGroupService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', this.createGroup.bind(this))
        this.router.get('/', this.getGroups.bind(this))
        this.router.delete('/', this.deleteGroup.bind(this))
        this.router.patch('/', this.updateGroup.bind(this))
    }

    async createGroup(request: Request<{}, {}, IGroup>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createGroup(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getGroups(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getGroups(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateGroup(request: Request<{}, {}, IGroup>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateGroup(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteGroup(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteGroup(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
