import { Request, Response, Router } from 'express'

import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'

import { BaseController } from '@common/controller/base.controller'

// Types
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { ICategory } from '@proshop/types'
import { ICategoryService } from '../types/service'

// Schemes
import { TYPES } from '@common/schemes/di-types'
import { Document } from 'mongoose'

@injectable()
export class CategoryController extends BaseController implements IController {
    public path = '/api/v1/category'
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.ICategoryService) private service: ICategoryService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', expressAsyncHandler(this.getCategories.bind(this)))
        this.router.post('/', expressAsyncHandler(this.createCategory.bind(this)))
        this.router.patch('/', expressAsyncHandler(this.updateCategory.bind(this)))
        this.router.delete('/', expressAsyncHandler(this.deleteCategory.bind(this)))
    }

    async createCategory({ body, method }: Request<{}, {}, ICategory>, res: Response) {
        try {
            const category = await this.service.createCategory(body)

            this.send({
                response: res,
                data: category,
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

    async updateCategory({ body, method }: Request<{}, {}, Partial<ICategory & Document>>, res: Response) {
        try {
            const { updated } = await this.service.updateCategory(body)

            this.send({
                response: res,
                data: updated,
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

    async getCategories({ query, method }: Request<{}, {}, {}, Partial<ICategory>>, res: Response) {
        try {
            const categories = await this.service.getCategories(query)

            this.send({
                response: res,
                data: categories,
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

    async deleteCategory({ query, method }: Request, res: Response) {
        try {
            await this.service.deleteCategory(query.id as string)

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
}

export default CategoryController
