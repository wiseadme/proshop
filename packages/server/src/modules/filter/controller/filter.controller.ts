import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFilterGroupService, IFilterItemService } from '@modules/filter/types/service'
import { IFilterGroup, IFilterItem } from '@proshop-app/types'
import { FILTERS_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { FILTER_IOC } from '@modules/filter/di/di.types'

@injectable()
export class FilterController extends BaseController implements IController {
    public path = FILTERS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(FILTER_IOC.IFilterGroupService) private filterGroupService: IFilterGroupService,
        @inject(FILTER_IOC.IFilterItemService) private filterItemService: IFilterItemService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/groups', setMiddlewares({ roles: ['root'] }), this.createFilterGroup.bind(this))
        this.router.patch('/groups', setMiddlewares({ roles: ['root'] }), this.updateFilterGroup.bind(this))
        this.router.delete('/groups', setMiddlewares({ roles: ['root'] }), this.deleteFilterGroup.bind(this))
        this.router.post('/items', setMiddlewares({ roles: ['root'] }), this.createFilterItem.bind(this))
        this.router.patch('/items', setMiddlewares({ roles: ['root'] }), this.updateFilterItem.bind(this))
        this.router.delete('/items', setMiddlewares({ roles: ['root'] }), this.deleteFilterItem.bind(this))
        this.router.post('/items/facets', this.getGroupFilterItems.bind(this))
        this.router.get('/groups', this.getFilterGroups.bind(this))
        this.router.get('/items', this.getFilterItems.bind(this))
    }

    async createFilterGroup(request: Request<{}, {}, IFilterGroup>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterGroupService.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getFilterGroups(request: Request<{}, {}, {}, { id?: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterGroupService.read(request.query)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateFilterGroup(request: Request<{}, {}, IFilterGroup>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterGroupService.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteFilterGroup(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterGroupService.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async createFilterItem(request: Request<{}, {}, IFilterItem>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.createFilterItem(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getFilterItems(request: Request<{}, {}, {}, Partial<IFilterItem>>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.getFilterItems(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async getGroupFilterItems(request: Request<{}, {}, {ids: string[]}>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.getFilterItemsByGroupIds(request.body.ids)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateFilterItem(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.updateFilterItem(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteFilterItem(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.deleteFilterItem(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
