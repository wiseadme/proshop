import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import { ProductDTO } from '@modules/products/dto/product.dto'

// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAttribute, IMetaTag, IOption, IProduct, IProductParams, IVariant } from '@proshop/types'
import { IProductsService } from '../types/service'

// Helpers
import { setMiddlewares } from '@common/helpers'
import { PRODUCTS_MODULE_PATH } from '@common/constants/paths'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'

@injectable()
export class ProductsController extends BaseController implements IController {
    public path: string = PRODUCTS_MODULE_PATH
    public router: Router = Router()

    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(PRODUCTS_IOC.IProductsService) private service: IProductsService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), this.createProduct.bind(this))
        this.router.get('/', this.getProducts.bind(this))
        this.router.patch('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), this.updateProduct.bind(this))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), this.deleteProduct.bind(this))
        this.router.patch('/attributes/add', setMiddlewares({ roles: ['root'] }), this.addProductAttribute.bind(this))
        this.router.patch('/attributes/delete', setMiddlewares({ roles: ['root'] }), this.deleteProductAttribute.bind(this))
        this.router.patch('/metatags/add', setMiddlewares({ roles: ['root'] }), this.addProductMetaTag.bind(this))
        this.router.patch('/metatags/update', setMiddlewares({ roles: ['root'] }), this.updateProductMetaTags.bind(this))
        this.router.patch('/metatags/delete', setMiddlewares({ roles: ['root'] }), this.deleteProductMetaTag.bind(this))
    }

    async createProduct(request: Request<{}, {}, IProductParams>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.createProduct(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async getProducts(request: Request<{}, {}, {}, Partial<IProduct>>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.getProducts(request.query)

            // @ts-ignore
            this.send({ data, request, response })
        } catch (error) {
            // @ts-ignore
            this.error({ error, request, next })
        }
    }

    async updateProduct(request: Request<{}, {}, Partial<IProductParams>>, response: Response, next: NextFunction) {

        try {
            const data = await this.service.updateProduct(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteProduct(request: Request<{}, {}, {}, { id: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteProduct(request.query.id)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async addProductAttribute(request: Request<{}, {}, { id: string, attribute: IAttribute }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.addAttribute(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteProductAttribute(request: Request<{}, {}, { id: string, attributeId: string }>, response: Response, next: NextFunction,) {
        try {
            const data = await this.service.deleteAttribute(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async addProductMetaTag(request: Request<{}, {}, { productId: string, metaTag: IMetaTag }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.addMetaTag(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async updateProductMetaTags(request: Request<{}, {}, { productId: string, metaTags: IMetaTag[] }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.updateMetaTags(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }

    async deleteProductMetaTag(request: Request<{}, {}, { productId: string, metaTagId: string }>, response: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteMetaTag(request.body)

            this.send({ data, request, response })
        } catch (error) {
            this.error({ error, request, next })
        }
    }
}
