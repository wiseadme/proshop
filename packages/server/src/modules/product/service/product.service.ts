import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/product/entity/product.entity'

// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IProductRepository } from '../types/repository'
import { IProductService } from '../types/service'
import { IProduct, IRequestParams } from '@proshop/types'
import { IEventBusService } from '@/types/services'
import { IProductGatewayService } from '@modules/product/gateway/gateway.service'

@injectable()
export class ProductService implements IProductService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IProductRepository) private repository: IProductRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
        @inject(TYPES.SERVICES.IProductGatewayService) private gateway: IProductGatewayService,
    ) {
    }

    async create(product: IProduct) {
        const item = await this.repository.create(Product.create(product)) as Document & IProduct

        if (product.categories) {
            for await (const category of product.categories) {
                /**
                 * @description - пердаем флаг length числом как true значение
                 * для апдейта кол-ва товаров в категории
                 */
                await this.gateway.category.update({ _id: category._id, length: 1 })
            }
        }

        return {
            items: [item],
            total: await this.repository.getDocumentsCount(),
        }
    }

    async read(query: IRequestParams<Partial<Omit<IProduct, 'categories'>>>) {
        const { _id, url, category } = query
        const hasSearchProductParams = _id || url

        const data = {
            items: await this.repository.read(query) as (Document & IProduct)[],
            total: 1,
        }

        /**
         * @description - если отсутствует параметры
         * конкретного товара то получаем кол - во
         * документов в total
         */
        if (!hasSearchProductParams) {
            /**
             * TODO нужно кэшировать значение total
             * чтоб не запрашивать категорию каждый
             * раз при запросе по категории
             */
            data.total = await this.repository.getDocumentsCount(category ? { category } : {}) as number
        }

        return data
    }

    async update(updates: Partial<Document & IProduct>) {
        if (updates.assets) {
            updates.assets.forEach(it => this.gateway.asset.updateFile(it))
            updates.image = updates.assets?.find(it => it.main)?.url || null
        }

        const categoriesMap = {}

        if (updates.categories) {
            const [product] = await this.repository.read(updates._id)
            /**
             * Сохраняем текущие категории в мапу
             * для дальнейшего апдейта кол-ва товаров в категориях
             */
            product.categories.forEach(it => categoriesMap[it._id] = it)
            updates.categories.forEach(it => categoriesMap[it._id] = it)
        }

        const { updated } = await this.repository.update(Product.update(updates))

        const categoryKeys = Object.keys(categoriesMap)

        if (categoryKeys.length) {
            for await (const key of categoryKeys) {
                /**
                 * @description - пердаем флаг length числом как true значение
                 * для апдейта кол-ва товаров в категории
                 */
                await this.gateway.category.update({ _id: key, length: 1 })
            }
        }

        return { updated }
    }

    async delete(id) {
        const [product] = await this.repository.read(id)
        const res = await this.repository.delete(id)

        for (const category of product.categories) {
            await Promise.all([
                this.gateway.category.update({ _id: category._id, length: 1 }),
                this.gateway.asset.deleteFiles(category._id),
            ])
        }

        return res
    }
}
