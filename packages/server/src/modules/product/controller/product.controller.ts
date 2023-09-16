import { query, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'

import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import { ProductDTO } from '@modules/product/dto/product.dto'

// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAttribute, IProduct } from '@proshop/types'
import { IProductService } from '../types/service'

// Helpers
import { setMiddlewares } from '@common/helpers'

@injectable()
export class ProductController extends BaseController implements IController {
    public path: string = '/api/v1/product'
    public router: Router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.SERVICES.IProductService) private service: IProductService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), expressAsyncHandler(this.createProduct.bind(this)))
        this.router.get('/', setMiddlewares({}), expressAsyncHandler(this.getProducts.bind(this)))
        this.router.patch('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), expressAsyncHandler(this.updateProduct.bind(this)))
        this.router.patch('/attribute/add', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.addProductAttribute.bind(this)))
        this.router.patch('/attribute/delete', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.deleteProductAttribute.bind(this)))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.deleteProduct.bind(this)))
    }

    async createProduct({ body, method }: Request<{}, {}, IProduct>, res: Response) {
        try {
            const product = await this.service.create(body)

            this.send({
                response: res,
                data: product,
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

    async getProducts({ query, method }: Request<{}, {}, {}, Partial<IProduct>>, res: Response) {
        try {
            const products = await this.service.read(query)

            this.send({
                response: res,
                data: products,
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

    async updateProduct({ body, method }: Request<{}, {}, Partial<IProduct & Document>>, res: Response) {

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

    async deleteProduct({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response) {
        try {
            await this.service.delete(query.id)

            this.send({
                response: res,
                data: true,
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

    async addProductAttribute ({ body, method }: Request<{}, {}, { productId: string, attribute: IAttribute }>, res: Response) {
        try {
            const product = await this.service.addAttribute(body)

            this.send({
                response: res,
                data: product,
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


    async deleteProductAttribute ({ body, method }: Request<{}, {}, { productId: string, attributeId: string }>, res: Response) {
        try {
            const product = await this.service.deleteAttribute(body)

            this.send({
                response: res,
                data: product,
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
}
