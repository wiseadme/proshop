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
            for await (const category of product.categories) {
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
        const hasSearchProductParams = _id || url || category

        const data = {
            items: await this.repository.read(query) as (Document & IProduct)[],
            total: 1,
        }

        if (category) {
            const [found] = await this.gateway.category.read({ url: category })
            data.total = found.length
        }

        /**
         * @description - если отсутствуют параметры
         * конкретного товара то получаем кол - во
         * документов в total
         */
        if (!hasSearchProductParams) {

            /**
             * TODO нужно кэшировать значение total
             * чтоб не запрашивать категорию каждый
             * раз при запросе по категории
             */
            data.total = await this.repository.getDocumentsCount() as number
        }

        return data
    }

    async update(updates: Partial<Document & IProduct>) {
        if (updates.assets) {
            updates.assets.forEach(it => this.gateway.asset.updateFile(it))
            updates.image = updates.assets?.find(it => it.main)?.url || null
        }

        if (updates.categories) {
            const [product] = await this.repository.read({ _id: updates._id })
            /**
             * @description - Сохраняем текущие категории и апдейты категорий в мапу
             * для дальнейшего апдейта кол-ва товаров в категориях
             */
            const updateCategoriesMap = this.getCategoriesMap(updates.categories)
            const productCategoriesMap = this.getCategoriesMap(product.categories)

            for await (const { _id } of product.categories) {
                if (_id && !updateCategoriesMap[_id]) {
                    await this.gateway.category.update({ _id, length: -1 })
                }
            }

            for await (const { _id } of updates.categories) {
                if (_id && !productCategoriesMap[_id]) {
                    await this.gateway.category.update({ _id, length: 1 })
                }
            }
        }

        return await this.repository.update(Product.update(updates))
    }

    async delete(id) {
        const [product] = await this.repository.read(id)
        const result = await this.repository.delete(id)

        /**
         * @description - Удаляем всю статику связанную с товаром
         */
        await this.gateway.asset.deleteFiles(product._id)
        /**
         * @description - Удаляем товар из категории
         */
        for await (const category of product.categories) {
            await Promise.all([
                this.gateway.category.update({ _id: category._id, length: -1 }),
                // this.gateway.asset.deleteFiles(category._id),
            ])
        }

        return result
    }
}
