import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/product/entity/product.entity'

// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IProductRepository } from '../types/repository'
import { IProductService } from '../types/service'
import { ICategory, IProduct, IProductQuery, IRequestParams } from '@proshop/types'
import { IEventBusService } from '@/types/services'
import { IProductGatewayService } from '@modules/product/gateway/gateway.service'
import { ServiceHelpers } from '@modules/product/helpers/service.helpers'

@injectable()
export class ProductService extends ServiceHelpers implements IProductService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IProductRepository) private repository: IProductRepository,
        @inject(TYPES.SERVICES.IProductGatewayService) private gateway: IProductGatewayService,
    ) {
        super()
    }

    async create(product: IProduct) {
        const item = await this.repository.create(Product.create(product)) as IProduct

        if (product.categories.length) {
            for await (const category of product.categories as string[]) {
                await this.gateway.category.update({ id: category, length: 1 })
            }
        }

        return {
            items: [item],
            total: await this.repository.getDocumentsCount(),
        }
    }

    async read(query: IRequestParams<IProductQuery>) {
        const { id, url, category, name, page, count, desc, asc } = query

        const data: { items: IProduct[], total: number } = {
            items: [],
            total: 1,
        }

        if (id) {
            const product = await this.repository.findById(id)
            data.items = [product]

            return data
        }

        if (name) {
            data.items = await this.repository.findByQueryString(name)
            data.total = data.items.length

            return data
        }

        if (url) {
            const product = await this.repository.findByUrl(url)
            data.items = [product]

            return data
        }

        if (category) {
            const [found] = await this.gateway.category.read({ url: category })

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

    async update(updates: Partial<Document & IProduct>) {
        if (updates.assets) {
            updates.assets.forEach(it => this.gateway.asset.updateFile(it))
            updates.image = updates.assets?.find(it => it.main)?.url || null
        }

        if (updates.categories) {
            const product = await this.repository.findById(updates.id)
            const currentCategories = product.categories?.map(ctg => ctg.id)
            /**
             * @description - Сохраняем текущие категории и апдейты категорий в мапу
             * для дальнейшего апдейта кол-ва товаров в категориях
             */
            const updateCategoriesMap = this.getCategoriesMap(updates.categories)
            const productCategoriesMap = this.getCategoriesMap(currentCategories)

            for await (const id of currentCategories as string[]) {
                if (id && !updateCategoriesMap[id]) {
                    await this.gateway.category.update({ id, length: -1 })
                }
            }

            for await (const id of updates.categories as string[]) {
                if (id && !productCategoriesMap[id]) {
                    await this.gateway.category.update({ id, length: 1 })
                }
            }
        }

        return await this.repository.update(Product.update(updates))
    }

    async delete(id) {
        const product = await this.repository.findById(id)
        const result = await this.repository.delete(id)

        /**
         * @description - Удаляем всю статику связанную с товаром
         */
        await this.gateway.asset.deleteFiles(product.id)
        /**
         * @description - Удаляем товар из категории
         */
        for await (const category of product.categories as ICategory[]) {
            await Promise.all([
                this.gateway.category.update({ id: category.id, length: -1 }),
                // this.gateway.asset.deleteFiles(category._id),
            ])
        }

        return result
    }
}
