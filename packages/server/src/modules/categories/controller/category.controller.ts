import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '@common/controller/base.controller'

// Types
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { ICategory } from '@proshop/types'
import { ICategoryService } from '@modules/categories/types/service'

// Schemes
import { TYPES } from '@common/schemes/di-types'
import { CATEGORIES_MODULE_PATH } from '@common/constants/paths'
import { setMiddlewares } from '@common/helpers'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'

@injectable()
export class CategoryController extends BaseController implements IController {
    public path = CATEGORIES_MODULE_PATH
    public router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CATEGORY_IOC.ICategoryService) private service: ICategoryService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.getCategories.bind(this))
        this.router.post('/', setMiddlewares({ roles: ['root'] }), this.createCategory.bind(this))
        this.router.patch('/', setMiddlewares({ roles: ['root'] }), this.updateCategory.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteCategory.bind(this))
    }

    async createCategory(request: Request<{}, {}, ICategory>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createCategory(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateCategory(request: Request<{}, {}, Partial<ICategory>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateCategory(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getCategories(request: Request<{}, {}, {}, Partial<ICategory>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getCategories(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async deleteCategory(request: Request<{}, {}, {}, {id: string}>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteCategory(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
