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
    IOption,
    IProduct, IProductParams,
    IProductQuery,
    IRequestParams,
    IVariant,
} from '@proshop/types'
import { IProductsGatewayService } from '@modules/products/gateway/gateway.service'
import { ServiceHelpers } from '@modules/products/helpers/service.helpers'
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
        const item = await this.repository.createProduct(Product.create(product)) as IProduct

        if (product.categories?.length) {
            for await (const category of product.categories!) {
                await this.gateway.category.updateCategory({ id: category, length: 1 })
            }
        }

        return item
    }

    async findById({ id }: Partial<IRequestParams<IProductQuery>>) {
        const item = await this.repository.findById(id!)

        return this.getResponseFormat([item], 1)
    }

    async findByName({ name }: Partial<IRequestParams<IProductQuery>>) {
        const items = await this.repository.findByQueryString(name!)

        return this.getResponseFormat(items, items.length)
    }

    async findByUrl({ url }: Partial<IRequestParams<IProductQuery>>) {
        const item = await this.repository.findByUrl(url!)

        return this.getResponseFormat([item], 1)
    }

    async findBySKU({ sku }: Partial<IRequestParams<IProductQuery>>) {
        const item = await this.repository.findBySKU(sku!)

        return this.getResponseFormat([item], 1)
    }

    async findByCategory({ category, page, count, desc, asc }: Partial<IRequestParams<IProductQuery>>) {
        const [found] = await this.gateway.category.getCategories({ url: category })
        const items = await this.repository.findByCategory({ category, page, count, desc, asc })

        return this.getResponseFormat(items, found.length)
    }

    async addAttribute(params: { id: string, attribute: IAttribute }) {
        return this.repository.addAttribute(params)
    }

    async addVariant(params: { variant: IVariant }) {
        return this.repository.addVariant(params)
    }

    async deleteVariant(params: { variant: IVariant }) {
        return this.repository.deleteVariant(params)
    }

    async addVariantOption(params: { option: IOption }) {
        return this.repository.addVariantOption(params)
    }

    async deleteVariantOption(params: { option: IOption }) {
        return this.repository.deleteVariantOption(params)
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

    async getProducts(query: IRequestParams<IProductQuery>) {
        if (query.id) return this.findById(query)
        if (query.name) return this.findByName(query)
        if (query.url) return this.findByUrl(query)
        if (query.sku) return this.findBySKU(query)
        if (query.category) return this.findByCategory(query)
        /**
         * TODO нужно кэшировать значение total
         * чтоб не запрашивать категорию каждый
         * раз при запросе по категории
         */
        return this.getResponseFormat(...await Promise.all([
            this.repository.find(query),
            this.repository.getDocumentsCount(),
        ]))
    }

    async updateProduct(updates: Partial<IProductParams>) {
        if (updates.categories) {
            const product = await this.repository.findById(updates.id!)
            const currentCategories = product.categories?.map(({ id }) => id)
            /**
             * @description - Сохраняем текущие категории и апдейты категорий в мапу
             * для дальнейшего апдейта кол-ва товаров в категориях
             */
            const updateCategoriesMap = this.getCategoriesMap(updates.categories)
            const productCategoriesMap = this.getCategoriesMap(currentCategories)

            for await (const id of currentCategories) {
                if (id && !updateCategoriesMap[id]) {
                    await this.gateway.category.updateCategory({ id, length: -1 })
                }
            }

            for await (const id of updates.categories) {
                if (id && !productCategoriesMap[id]) {
                    await this.gateway.category.updateCategory({ id, length: 1 })
                }
            }
        }

        return await this.repository.updateProduct(Product.update(updates))
    }

    async deleteProduct(id: string) {
        const { variants, categories } = await this.repository.findById(id)
        const result = await this.repository.deleteProduct(id)
        /**
         * @description - Удаляем всю статику связанную с товаром
         */
        await this.gateway.asset.deleteFiles(id)
        /**
         * @description - Удаляем варианты товара
         */
        for await (const { options } of variants as IVariant[]) {
            await this.gateway.option.deleteVariantOptions(options as IOption[])
        }
        /**
         * @description - Удаляем товар из категории
         */
        for await (const { id } of categories as ICategory[]) {
            await this.gateway.category.updateCategory({ id, length: -1 })
        }

        return result
    }
}
