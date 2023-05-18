import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/product/entity/product.entity'

// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IProductRepository } from '../types/repository'
import { IProductService } from '../types/service'
import { IProduct, IRequestParams } from '@ecommerce-platform/types'
import { IEventBusService } from '@/types/services'

// Constants
import { DELETE_PRODUCT_EVENT, UPDATE_ASSETS_EVENT, UPDATE_CATEGORY_EVENT } from '@common/constants/events'

@injectable()
export class ProductService implements IProductService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IProductRepository) private repository: IProductRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    async create(product: IProduct) {
        const item = await this.repository.create(Product.create(product)) as Document & IProduct

        if (product.categories) {
            for await (const category of product.categories) {
                await this.events.emit(
                    UPDATE_CATEGORY_EVENT,
                    { _id: category._id, length: true },
                    true,
                )
            }
        }

        return {
            items: [item],
            total: await this.repository.getDocumentsCount(),
        }
    }

    async read(query: IRequestParams<Partial<IProduct>>) {
        let items = await this.repository.read(query) as (Document & IProduct)[]
        let total = 0

        if (query._id) {
            return { items, total }
        }

        if (query.length) {
            total = await this.repository.getDocumentsCount() as number
        }

        return {
            items,
            total,
        }
    }

    async update(updates: Partial<Document & IProduct>) {
        if (updates.assets) {
            updates.assets.forEach(it => this.events.emit(UPDATE_ASSETS_EVENT, it))
            updates.image = updates.assets?.find(it => it.main)?.url || null
        }

        let product, categories

        if (updates.categories) {
            product = await this.repository.read(updates._id)
            categories = product[0].categories
        }

        const { updated } = await this.repository.update(Product.update(updates))

        if (categories) {
            /* TODO - необходимо оптимизировать так как есть повторные апдейт категории здесь */
            if (updates.categories?.length) {
                categories = categories.concat((updated as any).categories)
            }

            for (const category of categories) {
                await this.events.emit(
                    UPDATE_CATEGORY_EVENT,
                    { _id: category._id, length: true },
                    true,
                )
            }
        }

        return { updated }
    }

    async delete(id) {
        const [product] = await this.repository.read(id)

        const res = await this.repository.delete(id)

        for (const category of product.categories) {
            await this.events.emit(UPDATE_CATEGORY_EVENT, {
                _id: category._id,
                length: true,
            })
        }

        await this.events.emit(DELETE_PRODUCT_EVENT, id)

        return res
    }
}
