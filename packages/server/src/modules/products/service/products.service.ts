import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/products/entity/product.entity'

// Types
import { ILogger } from '@/types/utils'
import { IProductsRepository } from '../types/repository'
import { IProductsService } from '../types/service'
import {
    IAttribute,
    ICategory,
    IMetaTag,
    IProductParams,
    IProductQuery,
    IRequestParams,
} from '@proshop-app/types'
import { IProductsGatewayService } from '@modules/products/gateway/gateway.service'
import { ServiceHelpers, IResponseItems } from '@modules/products/helpers/service.helpers'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'

@injectable()
export class ProductsService extends ServiceHelpers implements IProductsService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(PRODUCTS_IOC.IProductsRepository) private repository: IProductsRepository,
        @inject(PRODUCTS_IOC.IProductsGatewayService) private gateway: IProductsGatewayService,
    ) {
        super()
    }

    async createProduct(product: IProductParams) {
        const item = await this.repository.createProduct(Product.create(product))

        if (product.categories?.length) {
            for await (const category of product.categories!) {
                await this.gateway.category.updateCategory({ id: category, increaseBy: 1 })
            }
        }

        return item
    }

    async findById(id: string): Promise<IResponseItems> {
        const item = await this.repository.findById(id!)

        return this.formatToResponse([item], 1)
    }

    async findByName(name: string): Promise<IResponseItems> {
        const items = await this.repository.findByQueryString(name!)

        return this.formatToResponse(items, items.length)
    }

    async findByUrl(url: string): Promise<IResponseItems> {
        const item = await this.repository.findByUrl(url!)

        return this.formatToResponse([item], 1)
    }

    async findBySKU(sku: string): Promise<IResponseItems> {
        const item = await this.repository.findBySKU(sku!)

        return this.formatToResponse([item], 1)
    }

    async findByCategory({
        category,
        page,
        count,
        desc,
        asc
    }: Partial<IRequestParams<IProductQuery>>): Promise<IResponseItems> {
        const [found] = await this.gateway.category.getCategories({ url: category })
        const items = await this.repository.findByCategory({ category, page, count, desc, asc })

        return this.formatToResponse(items, found.length)
    }

    async addAttribute(params: { id: string, attribute: IAttribute }) {
        return this.repository.addAttribute(params)
    }

    async deleteAttribute(params: { id: string, attributeId: string }) {
        return this.repository.deleteAttribute(params)
    }

    async addMetaTag(params: { productId: string, metaTag: IMetaTag }) {
        return this.repository.addMetaTag(params)
    }

    async updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }) {
        return this.repository.updateMetaTags(params)
    }

    async deleteMetaTag(params: { productId: string, metaTagId: string }) {
        return this.repository.deleteMetaTag(params)
    }

    async getProducts(query: IRequestParams<IProductQuery>): Promise<IResponseItems> {
        if (query.id) return this.findById(query.id)
        if (query.name) return this.findByName(query.name)
        if (query.url) return this.findByUrl(query.url)
        if (query.sku) return this.findBySKU(query.sku)
        if (query.category) return this.findByCategory(query)
        /**
         * TODO нужно кэшировать значение total
         * чтоб не запрашивать категорию каждый
         * раз при запросе по категории
         */
        return this.formatToResponse(...await Promise.all([
            this.repository.find(query),
            this.repository.getDocumentsCount(),
        ]))
    }

    async updateProductCategories(updates: Partial<IProductParams>) {
        const product = await this.repository.findById(updates.id!)
        const currentCategories = product.categories?.map(({ id }) => id)

        /**
         * @description - Сохраняем текущие категории и апдейты категорий в мапу
         * для дальнейшего апдейта кол-ва товаров в категориях
         */
        const newCategoriesMap = this.getCategoriesMap(updates.categories!)
        const currentCategoriesMap = this.getCategoriesMap(currentCategories)

        for await (const id of currentCategories) {
            if (id && !newCategoriesMap[id]) {
                await this.gateway.category.updateCategory({ id, reduceBy: 1 })
            }
        }

        for await (const id of updates.categories!) {
            if (id && !currentCategoriesMap[id]) {
                await this.gateway.category.updateCategory({ id, increaseBy: 1 })
            }
        }
    }

    async reduceProductQuantity({ id, reduceBy }: { id: string, reduceBy: number }) {
        const product = await this.repository.findById(id)

        if (product.quantity >= reduceBy) {
            return await this.updateProduct({ id, quantity: product.quantity - reduceBy })
        } else {
            return Promise.resolve({
                message: 'Quantity must be greater than reducer value',
                status: 500
            })
        }
    }

    async increaseProductQuantity({ id, increaseBy }: { id: string, increaseBy: number }) {

    }

    async updateProduct(updates: Partial<IProductParams>) {
        if (updates.categories) {
            await this.updateProductCategories(updates)
        }

        const product = await this.repository.updateProduct(Product.update(updates))

        if (product.groups.length > 0) {
            const options = await this.gateway.option.findOptions({
                productId: product.id
            })

            for await (const option of options) {
                await this.gateway.option.updateOption({
                    id: option.id,
                    productName: product.name,
                    image: product.image!,
                    isAvailable: Boolean(product.quantity),
                    url: product.url
                })
            }
        }

        return product
    }

    async deleteProduct(id: string) {
        const { categories } = await this.repository.findById(id)
        const result = await this.repository.deleteProduct(id)

        /**
         * @description - Удаляем всю статику связанную с товаром
         */
        await this.gateway.asset.deleteFiles(id)

        /**
         * @description - Удаляем товар из категории
         */
        for await (const { id } of categories as ICategory[]) {
            await this.gateway.category.updateCategory({ id, reduceBy: 1 })
        }

        return result
    }
}
