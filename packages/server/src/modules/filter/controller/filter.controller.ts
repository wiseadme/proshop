import { BaseController } from '@common/controller/base.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFilterGroupService, IFilterItemService } from '@modules/filter/types/service'
import { IFilterGroup, IFilterItem } from '@proshop/types'
import { FILTERS_MODULE_PATH } from '@common/constants/paths'

@injectable()
export class FilterController extends BaseController implements IController {
    public path = FILTERS_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IFilterGroupService) private filterGroupService: IFilterGroupService,
        @inject(TYPES.SERVICES.IFilterItemService) private filterItemService: IFilterItemService,
    ) {
        super()
        this.initRoutes()
    }

    initRoutes() {
        this.router.post('/groups', this.createFilterGroup.bind(this))
        this.router.patch('/groups', this.updateFilterGroup.bind(this))
        this.router.get('/groups', this.getFilterGroups.bind(this))
        this.router.delete('/groups', this.deleteFilterGroup.bind(this))
        this.router.post('/items', this.createFilterItem.bind(this))
        this.router.post('/items/facets', this.getGroupFilterItems.bind(this))
        this.router.get('/items', this.getFilterItems.bind(this))
        this.router.patch('/items', this.updateFilterItem.bind(this))
        this.router.delete('/items', this.deleteFilterItem.bind(this))
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
            const data = await this.filterGroupService.read(request.query?.id)

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
            const data = await this.filterItemService.create(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getFilterItems(request: Request<{}, {}, {}, Partial<IFilterItem>>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.read(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async getGroupFilterItems(request: Request<{}, {}, {groupIds: string[]}>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.findByGroupIds(request.body.groupIds)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateFilterItem(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.update(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteFilterItem(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.filterItemService.delete(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
