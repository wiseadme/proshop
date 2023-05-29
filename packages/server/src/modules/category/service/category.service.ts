import { Document } from 'mongoose'
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
        const ctg = await this.repository.create(Category.create(category))

        if (category.parent) {
            const [parent] = await this.repository.read({ id: category.parent } as Partial<ICategory>)
            const children = [...parent!.children!, ctg._id]

            const $set = { _id: parent._id, children }

            await this.repository.update($set)
        }

        return ctg
    }

    async update(updates: Partial<Document & ICategory>): Promise<{ updated: Document & ICategory }> {
        const [category] = await this.repository.read({ _id: updates._id })

        updates = Category.update(updates)

        if (updates.parent) {
            if (category.parent) {
                const [prevParent] = await this.repository.read({ _id: category.parent } as Partial<ICategory>)

                // @ts-ignore
                const children = prevParent!.children!.filter((it: ICategory) => it._id.toString() !== updates._id)
                const set = { _id: prevParent._id, children }

                await this.repository.update(set)
            }

            const [currentParent] = await this.repository.read({ _id: updates.parent } as Partial<ICategory>)
            const $set = { children: [...currentParent!.children!, category!._id], _id: currentParent._id }

            await this.repository.update($set)
        }

        return this.repository.update(updates)
    }

    read(query: Partial<ICategory>) {
        return this.repository.read(query)
    }

    async delete(id: string): Promise<boolean> {
        const [category] = await this.repository.read({ _id: id })
        const res = await this.repository.delete(id)

        // Если удаляем категорию и если у категории есть
        // родитель, то удаляем его и в родителе
        if (category.parent) {
            const [parent] = await this.repository.read({ _id: category.parent } as Partial<ICategory>)

            // @ts-ignore
            const children = parent!.children!.filter((it: ICategory) => it._id.toString() !== category._id)
            const set = { _id: parent._id, children }

            await this.repository.update(set)
        }

        await this.events.emit(DELETE_CATEGORY_EVENT, id)

        return res
    }

    addListeners() {
        this.events.on(UPDATE_CATEGORY_EVENT, this.update.bind(this))
    }
}
