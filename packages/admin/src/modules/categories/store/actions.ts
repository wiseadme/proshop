import { useCategoryRepository } from '@modules/categories/repository/category.repository'
import { ICategory } from '@proshop/types'

const categoryRepository = useCategoryRepository()

export const actions = {
    async create(category: ICategory) {
        try {
            const { data } = await categoryRepository.create(category)

            this.$patch((state) => state.categories.push(data.data))

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates) {
        try {
            const { data } = await categoryRepository.update(updates)

            this.$patch(state => {
                state.categories = state.categories.map((it) => it.id === data.data.id ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params = {}) {
        try {
            const { data } = await categoryRepository.read(params)

            this.$patch(state => {
                state.categories = data?.data
            })

            return data?.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id: string) {
        try {
            const { data } = await categoryRepository.delete(id)

            this.$patch(state => {
                state.categories = state.categories.filter(ctg => ctg.id !== id)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
