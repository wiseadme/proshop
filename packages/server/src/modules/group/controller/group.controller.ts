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
    }

    async createGroup(request: Request<{}, {}, IGroup>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getGroup(request: Request<{}, {}, {}, Partial<IGroup>>, response: Response, next: NextFunction) {
        // try {
        //     const data = await this.service.read(request.query)
        //
        //     // @ts-ignore
        //     this.send({ data, request, response })
        // } catch (error) {
        //     // @ts-ignore
        //     this.error({ error, request, next })
        // }
    }

    async updateGroup(request: Request<{}, {}, IGroup>, response: Response, next: NextFunction) {
        // try {
        //     const data = await this.service.update(request.body)
        //
        //     this.send({ data, request, response })
        // } catch (error) {
        //     this.error({ error, request, next })
        // }
    }

    async deleteGroup(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        // try {
        //     const data = await this.service.delete(request.query.id)
        //
        //     this.send({ data, request, response })
        // } catch (error) {
        //     this.error({ error, request, next })
        // }
    }
}
