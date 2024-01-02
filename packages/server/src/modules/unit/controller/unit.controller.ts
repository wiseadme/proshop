import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'
// Types
import { NextFunction, Request, Response, Router } from 'express'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IUnit } from '@proshop/types'
import { IUnitService } from '@modules/unit/types/service'
import { UNITS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'

@injectable()
export class UnitController extends BaseController implements IController {
    path = UNITS_MODULE_PATH
    router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IUnitService) private service: IUnitService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/', setMiddlewares({ roles: ['root'] }), this.createUnit.bind(this))
        this.router.get('/', this.getUnits.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateUnit.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteUnit.bind(this))
    }

    async createUnit(request: Request<{}, {}, IUnit>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getUnits(request: Request<{}, {}, {}, Partial<IUnit>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.read(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateUnit(request: Request<{}, {}, Partial<IUnit>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteUnit(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
