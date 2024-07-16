import {
    useCategoryRepository
} from '@modules/categories/composables/repository/use-category-repository'

import type { ICategory } from '@proshop-app/types'

const repository = useCategoryRepository()

export const actions = {
    async createCategory(category: ICategory) {
        try {
            const { data } = await repository.createCategory(category)

            this.$patch((state) => state.categories.push(data))

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateCategory(updates) {
        try {
            const { data } = await repository.updateCategory(updates)

            this.$patch(state => {
                state.categories = state.categories.map((it) => it.id === data.id ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getCategories(params: Partial<ICategory> = {}) {
        try {
            const { data } = await repository.getCategories(params)

            this.$patch((state) => {
                if (params.id) {
                    state.category = data
                } else {
                    state.categories = data
                }
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getCategory(id: string) {
        try {
            return await this.getCategories({ id })
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteCategory(id: string) {
        try {
            const { data } = await repository.deleteCategory(id)

            this.$patch(state => {
                state.categories = state.categories.filter((ctg) => ctg.id !== id)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
