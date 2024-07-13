import { inject, injectable } from 'inversify'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '@common/schemes/di-types'

// Types
import { ICategory } from '@proshop/types'
import { ICategoryService } from '../types/service'
import { ICategoryRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'
import { ILogger } from '@/types/utils'

// Constants
import { DELETE_CATEGORY_EVENT } from '@common/constants/events'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'

@injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(CATEGORY_IOC.ICategoryRepository) private repository: ICategoryRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
    }

    async createCategory(category: ICategory) {
        return this.repository.createCategory(Category.create(category))
    }

    async updateCategory(updates: Partial<ICategory> & { reduceBy?: number, increaseBy?: number }): Promise<ICategory> {
        const [category] = await this.repository.getCategories({ id: updates.id })

        updates = Category.update(updates)

        /**
         * @description - свойство length в объекте обновлений
         * является значением кол-ва позиций товаров в категории
         */
        if (updates.reduceBy) {
            updates.length = category.length - updates.reduceBy
        }

        if (updates.increaseBy) {
            updates.length = category.length + updates.increaseBy
        }

        return this.repository.updateCategory(updates)
    }

    async getCategories(query: Partial<ICategory>) {
        return this.repository.getCategories(query)
    }

    async deleteCategory(id: string): Promise<boolean> {
        const result = await this.repository.deleteCategory(id)

        await this.events.emit(DELETE_CATEGORY_EVENT, id)

        return result
    }
}
