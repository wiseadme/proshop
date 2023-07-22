import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFilterGroupService } from '../types/service'
import { IFilterGroup, IFilterItem } from '@proshop/types'

@injectable()
export class FilterController extends BaseController implements IController {
    public path = '/api/v1/filter'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IFilterGroupService) private service: IFilterGroupService,
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
    }

    async createFilterGroup({ body, method }: Request<{}, {}, IFilterGroup>, res: Response) {
        try {
            const filterGroup = await this.service.create(body)

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
            const filterGroups = await this.service.read(query?.id)

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
            const { updated } = await this.service.update(body)

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
            await this.service.delete(query.id)

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
            // const filterGroup = await this.service.create(body)
            //
            // this.send({
            //     response: res,
            //     data: filterGroup,
            //     url: this.path,
            //     method,
            // })
        } catch (err) {
            return this.error({
                error: err,
                url: this.path,
                method,
            })
        }
    }
}
