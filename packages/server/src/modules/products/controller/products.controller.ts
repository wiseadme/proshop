import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'

import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import { ProductDTO } from '@modules/products/dto/product.dto'

// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAttribute, IMetaTag, IOption, IProduct, IVariant } from '@proshop/types'
import { IProductsService } from '../types/service'

// Helpers
import { setMiddlewares } from '@common/helpers'

@injectable()
export class ProductsController extends BaseController implements IController {
    public path: string = '/api/v1/products'
    public router: Router = Router()

    constructor(
      @inject(TYPES.UTILS.ILogger) private logger: ILogger,
      @inject(TYPES.SERVICES.IProductsService) private service: IProductsService,
    ) {
        super()
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), expressAsyncHandler(this.createProduct.bind(this)))
        this.router.get('/', setMiddlewares({}), expressAsyncHandler(this.getProducts.bind(this)))
        this.router.patch('/', setMiddlewares({ dto: ProductDTO, roles: ['root'] }), expressAsyncHandler(this.updateProduct.bind(this)))
        this.router.delete('/', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.deleteProduct.bind(this)))
        this.router.patch('/attributes/add', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.addProductAttribute.bind(this)))
        this.router.patch('/variants/add', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.addProductVariant.bind(this)))
        this.router.patch('/variants/option/add', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.addProductVariantOption.bind(this)))
        this.router.patch('/attributes/delete', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.deleteProductAttribute.bind(this)))
        this.router.patch('/metatags/add', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.addProductMetaTag.bind(this)))
        this.router.patch('/metatags/update', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.updateProductMetaTags.bind(this)))
        this.router.patch('/metatags/delete', setMiddlewares({ roles: ['root'] }), expressAsyncHandler(this.deleteProductMetaTag.bind(this)))
    }

    async createProduct({ body, method }: Request<{}, {}, IProduct>, res: Response) {
        try {
            const product = await this.service.createProduct(body)

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
            const products = await this.service.getProducts(query)

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

    async updateProduct({ body, method }: Request<{}, {}, Partial<IProduct>>, res: Response) {

        try {
            const { updated } = await this.service.updateProduct(body)

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
            await this.service.deleteProduct(query.id)

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

    async addProductAttribute({ body, method }: Request<{}, {}, { productId: string, attribute: IAttribute }>, res: Response) {
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

    async deleteProductAttribute({ body, method }: Request<{}, {}, { productId: string, attributeId: string }>, res: Response) {
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

    async addProductMetaTag({ body, method }: Request<{}, {}, { productId: string, metaTag: IMetaTag }>, res: Response) {
        try {
            const product = await this.service.addMetaTag(body)

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

    async updateProductMetaTags({ body, method }: Request<{}, {}, { productId: string, metaTags: IMetaTag[] }>, res: Response) {
        try {
            const product = await this.service.updateMetaTags(body)

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

    async deleteProductMetaTag({ body, method }: Request<{}, {}, { productId: string, metaTagId: string }>, res: Response) {
        try {
            const product = await this.service.deleteMetaTag(body)

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

    async addProductVariant({ body, method }: Request<{}, {}, { productId: string, variant: IVariant }>, res: Response) {
        try {
            const product = await this.service.addVariant(body)

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

    async addProductVariantOption({ body, method }: Request<{}, {}, {productId: string, option: IOption}>, res: Response) {
        try {
            const product = await this.service.addVariantOption(body)

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
