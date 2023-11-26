import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/products/entity/product.entity'

// Types
import { ILogger } from '@/types/utils'
import { IProductsRepository } from '../types/repository'
import { IProductsService } from '../types/service'
import {
    IAsset,
    IAttribute,
    ICategory,
    IMetaTag,
    IOption,
    IProduct,
    IProductQuery,
    IRequestParams,
    IVariant,
} from '@proshop/types'
import { IProductGatewayService } from '@modules/products/gateway/gateway.service'
import { ServiceHelpers } from '@modules/products/helpers/service.helpers'

@injectable()
export class ProductsService extends ServiceHelpers implements IProductsService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IProductsRepository) private repository: IProductsRepository,
        @inject(TYPES.GATEWAYS.IProductGatewayService) private gateway: IProductGatewayService,
    ) {
        super()
    }

    async createProduct(product: IProduct) {
        const item = await this.repository.createProduct(Product.create(product)) as IProduct

        if (product.categories.length) {
            for await (const category of product.categories as string[]) {
                await this.gateway.category.updateCategory({ id: category, length: 1 })
            }
        }

        return item
    }

    async getProducts(query: IRequestParams<IProductQuery>) {
        const { id, url, category, name, page, count, desc, asc, sku } = query

        const data: { items: IProduct[], total: number } = {
            items: [],
            total: 1,
        }

        if (id) {
            data.items = [await this.repository.findById(id)]

            return data
        }

        if (name) {
            data.items = await this.repository.findByQueryString(name)
            data.total = data.items.length

            return data
        }

        if (url) {
            data.items = [await this.repository.findByUrl(url)]

            return data
        }

        if (sku) {
            data.items = [await this.repository.findBySKU(sku)]

            return data
        }

        if (category) {
            const [found] = await this.gateway.category.getCategories({ url: category })

            data.total = found.length
            data.items = await this.repository.findByCategory({ category, page, count, desc, asc })

            return data
        }

        data.items = await this.repository.find(query)
        /**
         * TODO нужно кэшировать значение total
         * чтоб не запрашивать категорию каждый
         * раз при запросе по категории
         */
        data.total = await this.repository.getDocumentsCount() as number

        return data
    }

    async updateProduct(updates: Partial<IProduct>) {
        if (updates.categories) {
            const product = await this.repository.findById(updates.id!)
            const currentCategories = product.categories?.map(ctg => ctg.id)
            /**
             * @description - Сохраняем текущие категории и апдейты категорий в мапу
             * для дальнейшего апдейта кол-ва товаров в категориях
             */
            const updateCategoriesMap = this.getCategoriesMap(updates.categories)
            const productCategoriesMap = this.getCategoriesMap(currentCategories)

            for await (const id of currentCategories as string[]) {
                if (id && !updateCategoriesMap[id]) {
                    await this.gateway.category.updateCategory({ id, length: -1 })
                }
            }

            for await (const id of updates.categories as string[]) {
                if (id && !productCategoriesMap[id]) {
                    await this.gateway.category.updateCategory({ id, length: 1 })
                }
            }
        }

        return await this.repository.updateProduct(Product.update(updates))
    }

    async deleteProduct(id: string) {
        const product = await this.repository.findById(id)
        const result = await this.repository.deleteProduct(id)

        /**
         * @description - Удаляем всю статику связанную с товаром
         */
        await this.gateway.asset.deleteFiles(id)
        /**
         * @description - Удаляем варианты товара
         */
        for await (const variant of product.variants as IVariant[]) {
            await this.gateway.option.deleteVariantOptions(variant.options as IOption[])
        }
        /**
         * @description - Удаляем товар из категории
         */
        for await (const category of product.categories as ICategory[]) {
            await Promise.all([
                this.gateway.category.updateCategory({ id: category.id, length: -1 }),
            ])
        }

        return result
    }

    async addAttribute(params: { productId: string, attribute: IAttribute }) {
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

    async deleteAttribute(params: { productId: string, attributeId: string }) {
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
}
