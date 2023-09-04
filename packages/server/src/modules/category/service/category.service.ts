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
import { DELETE_CATEGORY_EVENT, UPDATE_CATEGORY_EVENT } from '@common/constants/events'

@injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.ICategoryRepository) private repository: ICategoryRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
        this.addListeners()
    }

    async create(category: ICategory) {
        return await this.repository.create(Category.create(category))
    }

    async update(updates: Partial<ICategory>): Promise<{ updated: ICategory }> {
        const [category] = await this.repository.read({ id: updates.id })

        updates = Category.update(updates)

        if (updates.length) {
            updates.length = category.length + updates.length
        }

        return this.repository.update(updates)
    }

    async read(query: Partial<ICategory>) {
        return this.repository.read(query)
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id)

        await this.events.emit(DELETE_CATEGORY_EVENT, id)

        return result
    }

    addListeners() {
        this.events.on(UPDATE_CATEGORY_EVENT, this.update.bind(this))
    }
}
