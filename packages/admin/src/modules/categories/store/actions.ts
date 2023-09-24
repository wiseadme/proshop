import { useCategoryRepository } from '@modules/categories/repository/category.repository'
import { ICategory } from '@proshop/types'

const repository = useCategoryRepository()

export const actions = {
    async createCategory(category: ICategory) {
        try {
            const { data } = await repository.create(category)

            this.$patch((state) => state.categories.push(data.data))

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateCategory(updates) {
        try {
            const { data } = await repository.update(updates)

            this.$patch(state => {
                state.categories = state.categories.map((it) => it.id === data.data.id ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getCategories(params: Partial<ICategory> = {}) {
        try {
            const { data } = await repository.read(params)

            this.$patch((state) => {
                state.categories = data?.data
            })

            return data?.data
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
            const { data } = await repository.delete(id)

            this.$patch(state => {
                state.categories = state.categories.filter((ctg) => ctg.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
