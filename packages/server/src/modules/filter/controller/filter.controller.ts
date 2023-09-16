import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFilterGroupService, IFilterItemService } from '../types/service'
import { IFilterGroup, IFilterItem } from '@proshop/types'

@injectable()
export class FilterController extends BaseController implements IController {
    public path = '/api/v1/filter'
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
        this.router.post('/groups', expressAsyncHandler(this.createFilterGroup.bind(this)))
        this.router.patch('/groups', expressAsyncHandler(this.updateFilterGroup.bind(this)))
        this.router.get('/groups', expressAsyncHandler(this.getFilterGroups.bind(this)))
        this.router.delete('/groups', expressAsyncHandler(this.deleteFilterGroup.bind(this)))
        this.router.post('/items', expressAsyncHandler(this.createFilterItem.bind(this)))
        this.router.get('/items', expressAsyncHandler(this.getFilterItems.bind(this)))
        this.router.delete('/items', expressAsyncHandler(this.deleteFilterItem.bind(this)))
    }

    async createFilterGroup({ body, method }: Request<{}, {}, IFilterGroup>, res: Response) {
        try {
            const filterGroup = await this.filterGroupService.create(body)

            this.send({
                response: res,
                data: filterGroup,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async getFilterGroups({ query, method }: Request<{}, {}, {}, { id?: string }>, res: Response) {
        try {
            const filterGroups = await this.filterGroupService.read(query?.id)

            this.send({
                response: res,
                data: filterGroups,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async updateFilterGroup({ body, method }: Request<{}, {}, IFilterGroup & Document>, res: Response) {
        try {
            const { updated } = await this.filterGroupService.update(body)

            this.send({
                response: res,
                data: updated,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteFilterGroup({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
        try {
            await this.filterGroupService.delete(query.id)

            this.send({
                response: res,
                data: null,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async createFilterItem({ body, method }: Request<{}, {}, IFilterItem>, res: Response) {
        try {
            const filterItem = await this.filterItemService.create(body)

            this.send({
                response: res,
                data: filterItem,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async getFilterItems({ query, method }: Request<{}, {}, {}, Partial<IFilterItem> & { id?: string }>, res: Response) {
        try {
            const filterItems = await this.filterItemService.read(query)

            this.send({
                response: res,
                data: filterItems,
                url: this.path,
                method,
            })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }

    async deleteFilterItem({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
        try {
            await this.filterItemService.delete(query.id)

            this.send({
                response: res,
                data: true,
                url: this.path,
                method,
            })
        } catch (err: any) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }
}
